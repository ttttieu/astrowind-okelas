"""
OKELAS Assessment API — backend cho okelas.com/assessment.

Vai trò của file này CHỈ LÀ orchestration:
  1. Serve config câu hỏi cho frontend.
  2. Nhận submission, validate hình dạng dữ liệu (không validate "đúng/sai"
     nội dung — đây là self-assessment, không phải bài kiểm tra).
  3. Chống spam cơ bản (honeypot field).
  4. Gọi OkelasCoreClient.submit_assessment_intake(...) — nơi DUY NHẤT chứa
     logic tính điểm/level/flag (chạy trên OKELAS Core, dùng chung với
     on-prem khách hàng).
  5. Map kết quả trả về thành PublicAssessmentResult để hiển thị ngay cho
     người dùng trên website.

Không được thêm bất kỳ phép tính điểm/level nào trực tiếp trong file này.
"""

from __future__ import annotations

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

try:
    # Vercel Python Runtime (api/ is a package)
    from _assessment.models import (
        AssessmentSubmission,
        PublicAssessmentResult,
        PublicResultRelatedLink,
    )
    from _assessment.okelas_client import ValidationError, build_okelas_client
except ImportError:
    # Fallback for relative imports (local dev with specific PYTHONPATH)
    from ._assessment.models import (
        AssessmentSubmission,
        PublicAssessmentResult,
        PublicResultRelatedLink,
    )
    from ._assessment.okelas_client import ValidationError, build_okelas_client

app = FastAPI(
    title="OKELAS Assessment API",
    description=(
        "Public assessment intake cho okelas.com. Logic tính điểm/level sống "
        "trong workflow-definitions/assessment_intake_workflow.json, thực thi "
        "bởi OKELAS Core — file này chỉ orchestration."
    ),
    version="1.0.0",
)

# Giới hạn origin thật khi deploy — để rộng ở đây cho môi trường dev.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://okelas.com", "https://www.okelas.com", "*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

okelas_client = build_okelas_client()

# Bài viết liên quan theo assessment — tham chiếu 03_Pillar_Map §5
# "Mapping bài viết → assessment". Slug là placeholder, cập nhật khi có
# đường dẫn thật trên website.
RELATED_LINKS: dict[str, list[PublicResultRelatedLink]] = {
    "erp_readiness": [
        PublicResultRelatedLink(
            title="Doanh nghiệp bạn đã thực sự sẵn sàng triển khai ERP chưa?",
            url="/knowledge/erp-readiness-danh-gia-ban-dau",
        ),
        PublicResultRelatedLink(
            title="Quy trình chưa chuẩn hoá — rủi ro lớn nhất trước khi triển khai ERP",
            url="/knowledge/quy-trinh-chua-chuan-hoa-rui-ro-erp",
        ),
    ],
    "ai_readiness": [
        PublicResultRelatedLink(
            title="AI giúp nhân viên viết nhanh hơn, nhưng doanh nghiệp có xử lý được nhiều hơn không?",
            url="/knowledge/ai-nang-suat-vs-organizational-intelligence",
        ),
        PublicResultRelatedLink(
            title="AI readiness: 6 điều kiện để AI thực sự có ích trong vận hành",
            url="/knowledge/ai-readiness-6-dieu-kien",
        ),
    ],
    "km_maturity": [
        PublicResultRelatedLink(
            title="Khi nhân sự chủ chốt nghỉ việc, họ mang đi thứ gì?",
            url="/knowledge/nhan-su-nghi-viec-mang-di-tri-thuc",
        ),
        PublicResultRelatedLink(
            title="SOP có nhưng không được thực thi — tại sao?",
            url="/knowledge/sop-khong-duoc-thuc-thi",
        ),
    ],
    "digitalization_level": [
        PublicResultRelatedLink(
            title="Doanh nghiệp của bạn đang ở giai đoạn số hóa nào?",
            url="/knowledge/doanh-nghiep-dang-o-giai-doan-so-hoa-nao",
        ),
        PublicResultRelatedLink(
            title="Paperless không phải chuyển đổi số — đây là sự khác biệt",
            url="/knowledge/paperless-khong-phai-chuyen-doi-so",
        ),
    ],
}


@app.get("/api/assessment/{assessment_id}/questions")
async def get_questions(assessment_id: str) -> dict:
    """Trả về config câu hỏi cho frontend render (title, intro, questions).

    Không trả về bảng 'levels' — người dùng không cần biết ngưỡng điểm khi
    đang trả lời, tránh việc họ chọn đáp án để "đạt mức cao" thay vì phản
    ánh đúng thực tế (giữ đúng tinh thần giảm overclaim ở 05_Question_Sets §1).
    """
    try:
        if hasattr(okelas_client, "get_question_config"):
            config = okelas_client.get_question_config(assessment_id)  # type: ignore[attr-defined]
        else:
            # HttpOkelasCoreClient trong production nên có endpoint riêng để
            # lấy config câu hỏi từ OKELAS Core; đây là fallback đọc file cục bộ.
            try:
                from _assessment.workflow_engine import LocalWorkflowEngine
            except ImportError:
                from ._assessment.workflow_engine import LocalWorkflowEngine

            config = LocalWorkflowEngine().get_question_config(assessment_id)
    except ValidationError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

    return {
        "assessment_id": config["assessment_id"],
        "title": config["title"],
        "intro": config["intro"],
        "questions": [
            {
                "id": q["id"],
                "text": q["text"],
                "type": q.get("type", "single_select"),
                "options": [
                    {"key": o["key"], "text": o["text"]}
                    for o in q.get("options", [])
                ],
            }
            for q in config["questions"]
        ],
    }


@app.post("/api/assessment/submit", response_model=PublicAssessmentResult)
async def submit_assessment(submission: AssessmentSubmission) -> PublicAssessmentResult:
    # Chống spam cơ bản: honeypot field phải rỗng.
    if submission.honeypot:
        raise HTTPException(status_code=400, detail="Invalid submission")

    respondent_dict = submission.respondent.model_dump()
    answers_dict = [a.model_dump() for a in submission.answers]

    try:
        result = await okelas_client.submit_assessment_intake(
            assessment_id=submission.assessment_id,
            respondent=respondent_dict,
            answers=answers_dict,
            submitted_at=submission.submitted_at.isoformat(),
            elapsed_seconds=submission.elapsed_seconds,
        )
    except ValidationError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    return PublicAssessmentResult(
        assessment_id=submission.assessment_id,
        level=result.get("level"),
        label=result.get("label"),
        description=result.get("description"),
        insufficient_data_message=result.get("insufficient_data_message"),
        related_links=RELATED_LINKS.get(submission.assessment_id, []),
        submission_id=result["submission_id"],
    )


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
