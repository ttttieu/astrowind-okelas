"""
LocalWorkflowEngine — bộ diễn giải (interpreter) cho
workflow-definitions/assessment_intake_workflow.json.

Implement đầy đủ scoring logic per PRD:
- Dimension scores (per 6 chiều)
- Critical Flags (F1-F5) - caps overall level
- Foundation ceiling logic (D1, D2, D5)
- Archetypes classification (6 business profiles)
- Context-aware language (Q0 effect)
"""

from __future__ import annotations

import json
import statistics
import uuid
from pathlib import Path
from typing import Any

BASE_DIR = Path(__file__).parent.parent
CONFIG_DIR = BASE_DIR / "config"
WORKFLOW_DEF_PATH = BASE_DIR / "workflow-definitions" / "assessment_intake_workflow.json"

UNCERTAIN_THRESHOLD = 2


class ValidationError(Exception):
    pass


class LocalWorkflowEngine:
    """Thực thi assessment workflow theo PRD v2.0."""

    def __init__(self) -> None:
        self.workflow_def: dict[str, Any] | None = None
        self._question_config_cache: dict[str, dict[str, Any]] = {}

    def _load_question_config(self, assessment_id: str, language: str = "vi") -> dict[str, Any]:
        cache_key = f"{assessment_id}_{language}"
        if cache_key in self._question_config_cache:
            return self._question_config_cache[cache_key]

        filename_map = {
            "erp_readiness": "questions_erp",
            "ai_readiness": "questions_ai",
            "km_maturity": "questions_km",
            "digitalization_level": "questions_dig",
        }
        base_filename = filename_map.get(assessment_id)
        if not base_filename:
            raise ValidationError(f"assessment_id không hợp lệ: {assessment_id}")

        filename = f"{base_filename}_en.json" if language == "en" else f"{base_filename}.json"
        path = CONFIG_DIR / filename
        if not path.exists():
            raise FileNotFoundError(f"Question config file not found: {path}")

        try:
            content = path.read_text(encoding="utf-8")
            config = json.loads(content)
        except json.JSONDecodeError as e:
            raise ValidationError(f"Invalid JSON in {filename}: {e}") from e

        self._question_config_cache[cache_key] = config
        return config

    def get_question_config(self, assessment_id: str, language: str = "vi") -> dict[str, Any]:
        return self._load_question_config(assessment_id, language)

    def _validate_submission(
        self, config: dict[str, Any], answers: list[dict[str, Any]]
    ) -> None:
        answered_ids = {a["question_id"] for a in answers}
        required_scored_ids = {
            q["id"] for q in config["questions"] if q.get("scored", False)
        }
        missing = required_scored_ids - answered_ids
        if missing:
            raise ValidationError(f"Thiếu câu trả lời: {sorted(missing)}")

    def _compute_scores(
        self, config: dict[str, Any], answers: list[dict[str, Any]]
    ) -> tuple[dict[str, float], dict[str, float], list[str], float | None]:
        """
        Tính dimension scores, level per dimension, và overall average.

        Returns:
            (dimension_scores, dimension_levels, uncertain_dims, overall_avg)
        """
        answers_by_id = {a["question_id"]: a for a in answers}
        question_by_id = {q["id"]: q for q in config["questions"]}

        dimension_raw_scores: dict[str, list[int]] = {}
        uncertain_dimensions: list[str] = []

        for q in config["questions"]:
            if not q.get("scored", False):
                continue
            ans = answers_by_id.get(q["id"])
            if ans is None:
                continue

            selected_key = ans.get("selected_key")
            options = q.get("options", [])
            if not options:
                continue
            option = next(
                (o for o in options if o["key"] == selected_key), None
            )
            if option is None:
                raise ValidationError(
                    f"Invalid key '{selected_key}' cho câu {q['id']}"
                )

            dimension = q.get("dimension")
            if not dimension:
                continue

            if option.get("flag") == "uncertain" or option.get("score") is None:
                uncertain_dimensions.append(dimension)
                continue

            dimension_raw_scores.setdefault(dimension, []).append(option["score"])

        # Tính dimension scores (trung bình per dimension)
        dimension_scores = {
            dim: round(statistics.mean(scores), 2)
            for dim, scores in dimension_raw_scores.items()
        }

        # Tính level per dimension (từ config["levels"])
        dimension_levels = {}
        for dim, score in dimension_scores.items():
            for level_def in config.get("levels", []):
                if level_def["min"] <= score <= level_def["max"]:
                    dimension_levels[dim] = level_def["level"]
                    break

        overall_average = (
            round(statistics.mean(dimension_scores.values()), 2)
            if dimension_scores
            else None
        )

        return dimension_scores, dimension_levels, uncertain_dimensions, overall_average

    def _classify_level(
        self,
        config: dict[str, Any],
        overall_average: float | None,
        uncertain_dimensions: list[str],
    ) -> tuple[int | None, str | None, str | None, str | None]:
        """Phân loại level chung từ overall_average."""
        if len(uncertain_dimensions) >= UNCERTAIN_THRESHOLD or overall_average is None:
            return (
                None,
                None,
                None,
                "Chưa đủ dữ liệu để đánh giá đầy đủ.",
            )

        for level_def in config.get("levels", []):
            if level_def["min"] <= overall_average <= level_def["max"]:
                return (
                    level_def["level"],
                    level_def["label"],
                    level_def["description"],
                    None,
                )

        return None, None, None, "Không thể phân loại level."

    def _detect_critical_flags(
        self,
        config: dict[str, Any],
        answers: list[dict[str, Any]],
        dimension_levels: dict[str, int],
    ) -> tuple[list[str], int | None]:
        """
        Detect Critical Flags (F1-F5) theo PRD mục 5.2.

        Returns:
            (flags_list, max_level_cap)
            max_level_cap: mức tối đa cho phép (None = không cap)
        """
        answers_by_id = {a["question_id"]: a for a in answers}
        flags = []
        max_cap = None

        # Helper: lấy score của câu hỏi
        def get_question_score(q_id: str) -> int | None:
            ans = answers_by_id.get(q_id)
            if not ans:
                return None
            key = ans.get("selected_key")
            if not key:
                return None
            q = next((q for q in config["questions"] if q["id"] == q_id), None)
            if not q:
                return None
            options = q.get("options", [])
            if not options:
                return None
            opt = next((o for o in options if o["key"] == key), None)
            return opt.get("score") if opt else None

        # F1: Tri thức nằm trong đầu người (Q2=0 OR Q5=0)
        q2_score = get_question_score("Q2-PROCESS-ENFORCEMENT")
        q5_score = get_question_score("Q5-BOM-ROUTING")
        if q2_score == 1 or q5_score == 1:
            flags.append("F1")
            max_cap = 3 if max_cap is None else min(max_cap, 3)

        # F2: Không có phiên bản số liệu (Q3=0 OR Q4=0)
        q3_score = get_question_score("Q3-DATA-MASTER")
        q4_score = get_question_score("Q4-DATA-ALIGNMENT")
        if q3_score == 1 or q4_score == 1:
            flags.append("F2")
            max_cap = 3 if max_cap is None else min(max_cap, 3)

        # F3: ERP bị xem là dự án IT (Q9=0)
        q9_score = get_question_score("Q9-LEADERSHIP")
        if q9_score == 1:
            flags.append("F3")
            max_cap = 3 if max_cap is None else min(max_cap, 3)

        # F4: Phạm vi mở, sửa phần mềm (Q8=0 OR Q8=1)
        q8_score = get_question_score("Q8-SCOPE")
        if q8_score in [1, 2]:
            flags.append("F4")
            max_cap = 3 if max_cap is None else min(max_cap, 3)

        # F5: Chưa có định nghĩa thành công (Q7=0)
        q7_score = get_question_score("Q7-OBJECTIVES")
        if q7_score == 1:
            flags.append("F5")
            max_cap = 3 if max_cap is None else min(max_cap, 3)

        return flags, max_cap

    def _apply_ceiling_logic(
        self,
        base_level: int | None,
        dimension_levels: dict[str, int],
        critical_flags: list[str],
        uncertain_count: int,
    ) -> int | None:
        """
        Áp dụng ceiling logic per PRD mục 6:

        1. Mức cơ sở từ overall_average
        2. Trần nền tảng: D1, D2, D5 ở mức 1 → max L2
        3. Trần flag: 1+ flag → max L3
        4. Sàn rủi ro: 2+ foundation ở L1 → overall = L1; 3+ flags → L1
        """
        if base_level is None:
            return None

        final_level = base_level

        # Trần nền tảng
        foundation_dims = {"process_existence", "data_foundation", "people_change"}
        foundation_at_l1 = sum(
            1 for dim in foundation_dims if dimension_levels.get(dim) == 1
        )

        if foundation_at_l1 >= 2:
            return 1
        if foundation_at_l1 == 1:
            final_level = min(final_level, 2)

        # Trần flag
        if critical_flags and len(critical_flags) >= 3:
            return 1
        if critical_flags:
            final_level = min(final_level, 3)

        # Trần uncertain
        if uncertain_count >= 3:
            pass  # Chỉ gắn nhãn "sơ bộ", không cap level

        return max(1, final_level)

    def _classify_archetype(
        self,
        dimension_scores: dict[str, float],
        dimension_levels: dict[str, int],
        answers_by_id: dict[str, dict[str, Any]],
    ) -> str:
        """
        Classify doanh nghiệp vào 6 hồ sơ (archetypes) per PRD mục 7.

        Hồ sơ 1: Ready to launch (all >= L3, no flags)
        Hồ sơ 2: High commitment, no foundation (D5>=2, base<1.5)
        Hồ sơ 3: Runs on great people (Q2<=1, D1<1.75)
        Hồ sơ 4: Many versions of truth (D2<1.5)
        Hồ sơ 5: Good foundation, missing leadership (base>=1.75, D5<1.75 or D6<1.75)
        Hồ sơ 6: Needs comprehensive foundation (others)
        """
        # Helper: lấy score
        def get_score(q_id: str) -> int | None:
            ans = answers_by_id.get(q_id, {})
            key = ans.get("selected_key")
            return None if key is None else ord(key) - ord("A") + 1

        base = statistics.mean(dimension_scores.values()) if dimension_scores else 0
        d1 = dimension_scores.get("process_existence", 0)
        d2 = dimension_scores.get("data_foundation", 0)
        d5 = dimension_scores.get("people_change", 0)
        d6 = dimension_scores.get("governance_ownership", 0)

        q2_score = get_score("Q2-PROCESS-ENFORCEMENT")

        # Hồ sơ 1
        if all(lvl >= 3 for lvl in dimension_levels.values()):
            return "archetype_1_ready_controlled"

        # Hồ sơ 2
        if d5 >= 2.0 and base < 1.5:
            return "archetype_2_high_commitment_no_foundation"

        # Hồ sơ 3
        if (q2_score or 0) <= 1 and d1 < 1.75:
            return "archetype_3_runs_on_people"

        # Hồ sơ 4
        if d2 < 1.5:
            return "archetype_4_many_versions_truth"

        # Hồ sơ 5
        if base >= 1.75 and (d5 < 1.75 or d6 < 1.75):
            return "archetype_5_no_pilot"

        # Hồ sơ 6
        return "archetype_6_needs_foundation"

    def _apply_context_language(
        self, level: int | None, label: str | None, description: str | None, answers: list[dict[str, Any]]
    ) -> tuple[str | None, str | None]:
        """
        Áp dụng ngôn ngữ theo Q0 (giai đoạn) per PRD mục 6.

        Q0=A,B (Trước ERP): "Chưa nên khởi động"
        Q0=C (Trong ERP): "Dự án đang có rủi ro"
        Q0=D,E (Sau ERP): "ERP đang chạy trên nền chưa vững"
        """
        if level is None or label is None:
            return label, description

        # Find Q0 answer
        q0_answer = next((a for a in answers if a["question_id"] == "Q0-CONTEXT"), None)
        q0_key = q0_answer.get("selected_key") if q0_answer else None

        # Map Q0 to context stage
        context_map = {
            "A": "before",
            "B": "before",
            "C": "during",
            "D": "after",
            "E": "after",
        }
        context = context_map.get(q0_key, "before")

        # Remap labels theo context
        labels_by_context = {
            "before": {
                1: "Chưa nên khởi động ERP",
                2: "Cần giai đoạn chuẩn bị có cấu trúc",
                3: "Sẵn sàng có điều kiện",
                4: "Sẵn sàng",
            },
            "during": {
                1: "Dự án đang có rủi ro cao",
                2: "Cần xử lý các khoảng trống",
                3: "Có thể go-live nếu kiểm soát",
                4: "Nền tốt, tập trung vào adoption",
            },
            "after": {
                1: "ERP đang chạy trên nền chưa vững",
                2: "Khoảng cách áp dụng lớn",
                3: "Đã áp dụng một phần",
                4: "Sẵn sàng khai thác sâu",
            },
        }

        new_label = labels_by_context.get(context, {}).get(level, label)
        return new_label, description

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

    def run_assessment_intake(
        self, assessment_id: str, answers: list[dict[str, Any]]
    ) -> dict[str, Any]:
        """Thực thi đầy đủ workflow per PRD."""
        config = self._load_question_config(assessment_id)
        self._validate_submission(config, answers)

        # Compute scores
        dimension_scores, dimension_levels, uncertain_dimensions, overall_average = (
            self._compute_scores(config, answers)
        )

        # Classify base level
        base_level, base_label, base_description, insufficient_msg = self._classify_level(
            config, overall_average, uncertain_dimensions
        )

        # Detect critical flags
        answers_by_id = {a["question_id"]: a for a in answers}
        critical_flags, flag_cap = self._detect_critical_flags(
            config, answers, dimension_levels
        )

        # Apply ceiling logic
        final_level = self._apply_ceiling_logic(
            base_level, dimension_levels, critical_flags, len(uncertain_dimensions)
        )

        # Apply cap from flags
        if flag_cap and final_level:
            final_level = min(final_level, flag_cap)

        # Apply context-aware language
        final_label, final_description = self._apply_context_language(
            final_level, base_label, base_description, answers
        )

        # Classify archetype
        archetype = self._classify_archetype(
            dimension_scores, dimension_levels, answers_by_id
        )

        # Detect straight-lining
        straight_lining_flags = self._detect_straight_lining(config, answers)

        # Combine all flags
        all_flags = critical_flags + straight_lining_flags
        if uncertain_dimensions:
            all_flags.append(f"uncertain:{len(uncertain_dimensions)}")
        if len(uncertain_dimensions) >= 3:
            all_flags.append("low_confidence")

        # Reflection
        reflection_answers = [
            a.get("open_text") for a in answers if a.get("open_text")
        ]

        submission_id = f"sub_{uuid.uuid4().hex[:12]}"

        return {
            "submission_id": submission_id,
            "level": final_level,
            "label": final_label,
            "description": final_description,
            "insufficient_data_message": insufficient_msg,
            "flags": all_flags,
            "critical_flags": critical_flags,
            "dimension_scores": dimension_scores,
            "dimension_levels": dimension_levels,
            "overall_average": overall_average,
            "archetype": archetype,
            "reflection_text_raw": reflection_answers,
        }
