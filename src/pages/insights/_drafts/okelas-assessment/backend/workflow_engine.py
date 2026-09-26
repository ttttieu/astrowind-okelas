"""
LocalWorkflowEngine — bộ diễn giải (interpreter) cho
workflow-definitions/assessment_intake_workflow.json.

QUAN TRỌNG — đọc trước khi chỉnh sửa file này:

Đây KHÔNG phải là "hệ thống phân tích riêng cho website/nội bộ". Đây là một
bản triển khai tham chiếu (reference implementation) của ĐÚNG workflow JSON đã
định nghĩa, dùng để:

  1. Chạy demo/test cục bộ khi chưa nối được với instance OKELAS Core thật.
  2. Làm tài liệu sống (executable spec) cho đúng những gì workflow JSON mô tả,
     để đội build OKELAS Core có thể đối chiếu khi triển khai workflow này
     bằng chính engine của OKELAS.

Trong môi trường production, class này KHÔNG được dùng — thay vào đó
`HttpOkelasCoreClient` (xem okelas_client.py) gọi thẳng vào OKELAS Core (chạy
trên instance "OKELAS of OKELAS" nội bộ), nơi thực thi workflow này bằng
chính engine sản phẩm — giống hệt cách một instance on-prem của khách hàng sẽ
thực thi. Điều này đảm bảo: KHÔNG có logic phân tích nào tồn tại riêng ở
website mà không tồn tại trên môi trường khách hàng.

Toàn bộ logic tính điểm/level/flag chỉ đọc từ 2 nguồn dữ liệu (không hardcode
theo từng assessment_id):
  - config/questions_<id>.json  (dimension, claim_type, score, levels)
  - workflow-definitions/assessment_intake_workflow.json (các bước xử lý)
"""

from __future__ import annotations

import json
import statistics
import uuid
from pathlib import Path
from typing import Any

CONFIG_DIR = Path(__file__).parent.parent / "config"
WORKFLOW_DEF_PATH = (
    Path(__file__).parent.parent
    / "workflow-definitions"
    / "assessment_intake_workflow.json"
)

UNCERTAIN_THRESHOLD = 2  # >= ngưỡng này -> không tính level (05_Question_Sets §6.2)


class ValidationError(Exception):
    pass


class LocalWorkflowEngine:
    """Diễn giải workflow_intake JSON. Không chứa logic ẩn ngoài file JSON."""

    def __init__(self) -> None:
        self.workflow_def: dict[str, Any] = json.loads(
            WORKFLOW_DEF_PATH.read_text(encoding="utf-8")
        )
        self._question_config_cache: dict[str, dict[str, Any]] = {}

    # -- config loading -----------------------------------------------------

    def _load_question_config(self, assessment_id: str) -> dict[str, Any]:
        if assessment_id in self._question_config_cache:
            return self._question_config_cache[assessment_id]

        filename_map = {
            "erp_readiness": "questions_erp.json",
            "ai_readiness": "questions_ai.json",
            "km_maturity": "questions_km.json",
            "digitalization_level": "questions_dig.json",
        }
        filename = filename_map.get(assessment_id)
        if not filename:
            raise ValidationError(f"assessment_id không hợp lệ: {assessment_id}")

        path = CONFIG_DIR / filename
        config = json.loads(path.read_text(encoding="utf-8"))
        self._question_config_cache[assessment_id] = config
        return config

    def get_question_config(self, assessment_id: str) -> dict[str, Any]:
        """Public accessor — dùng bởi endpoint GET /questions."""
        return self._load_question_config(assessment_id)

    # -- step: validate_submission -------------------------------------------

    def _validate_submission(
        self, config: dict[str, Any], answers: list[dict[str, Any]]
    ) -> None:
        answered_ids = {a["question_id"] for a in answers}
        required_scored_ids = {
            q["id"] for q in config["questions"] if q.get("scored", False)
        }
        missing = required_scored_ids - answered_ids
        if missing:
            raise ValidationError(
                f"Thiếu câu trả lời bắt buộc: {sorted(missing)}"
            )

    # -- step: compute_dimension_scores + overall_average --------------------

    def _compute_scores(
        self, config: dict[str, Any], answers: list[dict[str, Any]]
    ) -> tuple[dict[str, float], list[str], float | None]:
        answers_by_id = {a["question_id"]: a for a in answers}
        question_by_id = {q["id"]: q for q in config["questions"]}

        dimension_raw_scores: dict[str, list[int]] = {}
        uncertain_dimensions: list[str] = []

        for q in config["questions"]:
            if not q.get("scored", False):
                continue
            ans = answers_by_id.get(q["id"])
            if ans is None:
                continue  # đã chặn ở validate_submission, phòng hờ

            selected_key = ans.get("selected_key")
            option = next(
                (o for o in q["options"] if o["key"] == selected_key), None
            )
            if option is None:
                raise ValidationError(
                    f"selected_key '{selected_key}' không tồn tại trong câu {q['id']}"
                )

            dimension = q["dimension"]
            if option.get("flag") == "uncertain" or option.get("score") is None:
                uncertain_dimensions.append(dimension)
                continue

            dimension_raw_scores.setdefault(dimension, []).append(option["score"])

        dimension_scores = {
            dim: round(statistics.mean(scores), 2)
            for dim, scores in dimension_raw_scores.items()
        }

        overall_average = (
            round(statistics.mean(dimension_scores.values()), 2)
            if dimension_scores
            else None
        )

        return dimension_scores, uncertain_dimensions, overall_average

    # -- step: classify_level -------------------------------------------------

    def _classify_level(
        self,
        config: dict[str, Any],
        overall_average: float | None,
        uncertain_dimensions: list[str],
    ) -> tuple[int | None, str | None, str | None, str | None]:
        if len(uncertain_dimensions) >= UNCERTAIN_THRESHOLD or overall_average is None:
            return (
                None,
                None,
                None,
                "Chưa đủ dữ liệu để đánh giá đầy đủ — khuyến nghị người phụ "
                "trách vận hành trực tiếp cùng thực hiện.",
            )

        for level_def in config["levels"]:
            if level_def["min"] <= overall_average <= level_def["max"]:
                return (
                    level_def["level"],
                    level_def["label"],
                    level_def["description"],
                    None,
                )

        # Không khớp ngưỡng nào (không nên xảy ra nếu config đúng)
        return None, None, None, "Không thể phân loại level từ điểm hiện có."

    # -- step: detect_straight_lining_flag ------------------------------------

    def _detect_straight_lining(
        self, config: dict[str, Any], answers: list[dict[str, Any]]
    ) -> list[str]:
        answers_by_id = {a["question_id"]: a for a in answers}
        scored_keys = [
            answers_by_id[q["id"]].get("selected_key")
            for q in config["questions"]
            if q.get("scored", False) and q["id"] in answers_by_id
        ]
        flags: list[str] = []
        if scored_keys and all(k == "D" for k in scored_keys):
            flags.append("straight_lining_high")
        if scored_keys and all(k == "A" for k in scored_keys):
            flags.append("straight_lining_low")
        return flags

    # -- orchestration: chạy toàn bộ workflow ---------------------------------

    def run_assessment_intake(
        self, assessment_id: str, answers: list[dict[str, Any]]
    ) -> dict[str, Any]:
        """Thực thi các bước trong assessment_intake_workflow.json, THEO ĐÚNG
        THỨ TỰ đã khai báo. Không thêm bước nào ngoài file JSON."""

        config = self._load_question_config(assessment_id)

        self._validate_submission(config, answers)

        dimension_scores, uncertain_dimensions, overall_average = (
            self._compute_scores(config, answers)
        )

        level, label, description, insufficient_msg = self._classify_level(
            config, overall_average, uncertain_dimensions
        )

        flags = self._detect_straight_lining_flag_wrapper(config, answers)
        if uncertain_dimensions:
            flags.append(f"uncertain_dimensions:{len(uncertain_dimensions)}")

        # detect_contradiction_signal: chỉ đính kèm open_text nguyên văn,
        # KHÔNG diễn giải — đúng explicit_non_scope trong workflow JSON.
        reflection_answers = [
            a.get("open_text")
            for a in answers
            if a.get("open_text")
        ]

        submission_id = f"sub_{uuid.uuid4().hex[:12]}"

        return {
            "submission_id": submission_id,
            "level": level,
            "label": label,
            "description": description,
            "insufficient_data_message": insufficient_msg,
            "flags": flags,
            "dimension_scores": dimension_scores,
            "overall_average": overall_average,
            "reflection_text_raw": reflection_answers,  # cho consultant xem, không xử lý ở đây
        }

    def _detect_straight_lining_flag_wrapper(
        self, config: dict[str, Any], answers: list[dict[str, Any]]
    ) -> list[str]:
        return self._detect_straight_lining(config, answers)
