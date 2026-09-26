"""
okelas_client.py — lớp adapter DUY NHẤT nơi backend của website nói chuyện
với OKELAS Core.

Nguyên tắc kiến trúc (bắt buộc đọc trước khi sửa):

  Website backend KHÔNG được chứa logic tính điểm/level/flag của riêng nó.
  Toàn bộ logic đó sống trong workflow-definitions/assessment_intake_workflow.json
  và được THỰC THI BỞI OKELAS CORE — cùng một workflow, dù chạy trên instance
  nội bộ ("OKELAS of OKELAS") hay trên instance on-prem của khách hàng.

  Lớp OkelasCoreClient dưới đây định nghĩa MỘT interface duy nhất:
  submit_assessment_intake(...). Có 2 cách triển khai:

  1. HttpOkelasCoreClient — dùng trong production. Gọi thật vào OKELAS Core
     API (của instance "OKELAS of OKELAS"). Endpoint/contract cụ thể (path,
     auth, payload envelope) hiện ĐANG LÀ GIẢ ĐỊNH (xem TODO bên dưới) vì
     tài liệu API thật của OKELAS Core chưa được cung cấp cho phiên làm việc
     này — cần thay bằng contract thật trước khi deploy.

  2. LocalSimulatorClient — dùng khi chưa nối được OKELAS Core thật (local
     dev, demo, staging chưa có instance). Nó không phát minh logic riêng —
     nó gọi LocalWorkflowEngine, vốn chỉ diễn giải ĐÚNG file
     assessment_intake_workflow.json. Khi OKELAS Core thật đã sẵn sàng, chỉ
     cần đổi biến môi trường OKELAS_CORE_BASE_URL để chuyển sang
     HttpOkelasCoreClient mà không cần sửa code ở main.py.
"""

from __future__ import annotations

import os
from abc import ABC, abstractmethod
from typing import Any

import httpx

try:
    # Vercel Python Runtime
    from workflow_engine import LocalWorkflowEngine, ValidationError  # noqa: F401
    from submission_store import store_submission
except ImportError:
    # Local dev / relative imports
    from .workflow_engine import LocalWorkflowEngine, ValidationError  # noqa: F401
    from .submission_store import store_submission


class OkelasCoreClient(ABC):
    """Interface duy nhất mà main.py được phép gọi."""

    @abstractmethod
    async def submit_assessment_intake(
        self,
        assessment_id: str,
        respondent: dict[str, Any],
        answers: list[dict[str, Any]],
        submitted_at: str,
        elapsed_seconds: float | None,
    ) -> dict[str, Any]:
        """Trả về dict khớp shape của WorkflowExecutionResult (models.py)."""
        raise NotImplementedError


class HttpOkelasCoreClient(OkelasCoreClient):
    """Triển khai production — gọi thật vào OKELAS Core.

    TODO (bắt buộc xác nhận trước khi deploy — chưa có tài liệu API OKELAS
    Core thật trong phiên làm việc này):
      - Path chính xác của endpoint trigger workflow (giả định REST theo mô
        hình Process/Workflow/Event của 01_Context; nếu OKELAS Core dùng
        Frappe/DocType-style API như ERPNext thì path và envelope sẽ khác,
        ví dụ /api/method/okelas.workflow.trigger).
      - Cơ chế xác thực (giả định Bearer token qua OKELAS_CORE_API_KEY).
      - Envelope JSON chính xác OKELAS Core mong đợi khi trigger một workflow
        theo event_type (ở đây giả định {"event_type", "payload"}).
    """

    def __init__(self) -> None:
        self.base_url = os.environ["OKELAS_CORE_BASE_URL"].rstrip("/")
        self.api_key = os.environ["OKELAS_CORE_API_KEY"]
        self._client = httpx.AsyncClient(
            base_url=self.base_url,
            headers={"Authorization": f"Bearer {self.api_key}"},
            timeout=15.0,
        )

    async def submit_assessment_intake(
        self,
        assessment_id: str,
        respondent: dict[str, Any],
        answers: list[dict[str, Any]],
        submitted_at: str,
        elapsed_seconds: float | None,
    ) -> dict[str, Any]:
        # Envelope này chỉ FORWARD dữ liệu thô + trigger workflow đã định
        # nghĩa sẵn trong OKELAS Core (workflow_id="assessment_intake").
        # Không tính toán gì ở đây.
        payload = {
            "event_type": "assessment.submission.received",
            "workflow_id": "assessment_intake",
            "source": "public_website_widget",
            "data": {
                "assessment_id": assessment_id,
                "respondent": respondent,
                "answers": answers,
                "submitted_at": submitted_at,
                "elapsed_seconds": elapsed_seconds,
            },
        }
        response = await self._client.post("/api/v1/workflows/trigger", json=payload)
        response.raise_for_status()
        # Giả định OKELAS Core trả về đồng bộ kết quả workflow (level, label,
        # description, flags, submission_id...). Nếu OKELAS Core xử lý bất
        # đồng bộ (queue), cần đổi sang mô hình polling/webhook thay vì
        # response trực tiếp — cần xác nhận theo kiến trúc thật.
        return response.json()

    async def aclose(self) -> None:
        await self._client.aclose()


class LocalSimulatorClient(OkelasCoreClient):
    """Dev/demo fallback — diễn giải ĐÚNG workflow JSON cục bộ, không thêm
    logic riêng. Dùng khi chưa có OKELAS_CORE_BASE_URL trong môi trường."""

    def __init__(self) -> None:
        self._engine = LocalWorkflowEngine()

    async def submit_assessment_intake(
        self,
        assessment_id: str,
        respondent: dict[str, Any],
        answers: list[dict[str, Any]],
        submitted_at: str,
        elapsed_seconds: float | None,
    ) -> dict[str, Any]:
        # Chạy đồng bộ, trong tiến trình — chỉ phù hợp cho dev/demo.
        result = self._engine.run_assessment_intake(assessment_id, answers)
        # Persist the submission for Vercel Functions (stateless)
        store_submission(result["submission_id"], result)
        return result

    def get_question_config(self, assessment_id: str) -> dict[str, Any]:
        return self._engine.get_question_config(assessment_id)


def build_okelas_client() -> OkelasCoreClient:
    """Factory — chọn implementation dựa trên biến môi trường.

    Production: đặt OKELAS_CORE_BASE_URL + OKELAS_CORE_API_KEY trỏ vào
    instance 'OKELAS of OKELAS' -> dùng HttpOkelasCoreClient.
    Local/demo: không đặt -> dùng LocalSimulatorClient.
    """
    if os.environ.get("OKELAS_CORE_BASE_URL"):
        return HttpOkelasCoreClient()
    return LocalSimulatorClient()
