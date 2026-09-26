"""
Data models cho OKELAS Assessment API.

Nguyên tắc: các model này chỉ mô tả HÌNH DẠNG dữ liệu (schema), không chứa
logic tính điểm/level. Toàn bộ logic đó nằm trong
workflow-definitions/assessment_intake_workflow.json và được thực thi bởi
OKELAS Core (qua okelas_client.py) — không được nhân bản ở đây.
"""

from __future__ import annotations

from datetime import datetime
from typing import Optional, Literal

from pydantic import BaseModel, Field, field_validator

AssessmentId = Literal[
    "erp_readiness",
    "ai_readiness",
    "km_maturity",
    "digitalization_level",
]


class RespondentInfo(BaseModel):
    org_name: Optional[str] = None
    role: Optional[str] = None
    contact: Optional[str] = None  # chỉ thu thập nếu người dùng chủ động để lại


class AnswerItem(BaseModel):
    question_id: str
    selected_key: Optional[str] = None  # "A" | "B" | "C" | "D" | "E" | None (open_text)
    open_text: Optional[str] = None

    @field_validator("selected_key")
    @classmethod
    def validate_key(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in {"A", "B", "C", "D", "E"}:
            raise ValueError(f"selected_key không hợp lệ: {v}")
        return v


class AssessmentSubmission(BaseModel):
    """Payload website gửi lên backend sau khi người dùng hoàn thành form."""

    assessment_id: AssessmentId
    respondent: RespondentInfo = Field(default_factory=RespondentInfo)
    answers: list[AnswerItem]
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    elapsed_seconds: Optional[float] = None
    honeypot: Optional[str] = None  # anti-spam field, phải rỗng nếu là người thật


class PublicResultRelatedLink(BaseModel):
    title: str
    url: str


class PublicAssessmentResult(BaseModel):
    """Những gì hiển thị NGAY cho người dùng trên website sau khi submit.

    Toàn bộ nội dung (level/label/description) được lấy nguyên văn từ output
    của workflow_intake — backend KHÔNG tự sinh thêm câu chữ, KHÔNG tự diễn
    giải, đúng nguyên tắc 'no additional analysis' đã thống nhất.
    """

    assessment_id: AssessmentId
    level: Optional[int]  # None nếu chưa đủ dữ liệu (>= 2 câu "Không chắc")
    label: Optional[str]
    description: Optional[str]
    insufficient_data_message: Optional[str] = None
    related_links: list[PublicResultRelatedLink] = Field(default_factory=list)
    submission_id: str  # id của Evidence record đã tạo trên OKELAS Core


class WorkflowExecutionResult(BaseModel):
    """Kết quả trả về từ OKELAS Core (qua okelas_client) sau khi chạy
    workflow assessment_intake — dùng nội bộ, backend chuyển đổi thành
    PublicAssessmentResult trước khi trả cho website."""

    submission_id: str
    level: Optional[int]
    label: Optional[str]
    description: Optional[str]
    insufficient_data_message: Optional[str] = None
    flags: list[str] = Field(default_factory=list)
    dimension_scores: dict[str, float] = Field(default_factory=dict)
    overall_average: Optional[float] = None
