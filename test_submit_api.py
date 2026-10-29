#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Test the submit API endpoint directly."""
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.path.insert(0, 'api')

import asyncio
import json
from datetime import datetime
from _assessment.models import AssessmentSubmission, RespondentInfo, AnswerItem
from _assessment.okelas_client import build_okelas_client

async def test_submit():
    respondent = RespondentInfo(
        org_name="Test Company",
        role="CEO",
        contact="test@example.com"
    )

    answers = [
        AnswerItem(question_id="Q0-CONTEXT", selected_key="A"),
        AnswerItem(question_id="Q1-PROCESS-EXISTENCE", selected_key="B"),
        AnswerItem(question_id="Q2-PROCESS-ENFORCEMENT", selected_key="B"),
        AnswerItem(question_id="Q3-DATA-MASTER", selected_key="C"),
        AnswerItem(question_id="Q4-DATA-ALIGNMENT", selected_key="C"),
        AnswerItem(question_id="Q5-BOM-ROUTING", selected_key="B"),
        AnswerItem(question_id="Q6-COSTING", selected_key="C"),
        AnswerItem(question_id="Q7-OBJECTIVES", selected_key="C"),
        AnswerItem(question_id="Q8-SCOPE", selected_key="C"),
        AnswerItem(question_id="Q9-LEADERSHIP", selected_key="C"),
        AnswerItem(question_id="Q10-CHANGE-HISTORY", selected_key="C"),
        AnswerItem(question_id="Q11-GOVERNANCE", selected_key="C"),
    ]

    submission = AssessmentSubmission(
        assessment_id="erp_readiness",
        respondent=respondent,
        answers=answers,
        submitted_at=datetime.utcnow(),
        elapsed_seconds=120.5,
    )

    try:
        print(f"[TEST] Building client...")
        client = build_okelas_client()
        print(f"[TEST] Client type: {type(client).__name__}")

        print(f"[TEST] Calling submit_assessment_intake...")
        result = await client.submit_assessment_intake(
            assessment_id=submission.assessment_id,
            respondent=submission.respondent.model_dump(),
            answers=[a.model_dump() for a in submission.answers],
            submitted_at=submission.submitted_at.isoformat(),
            elapsed_seconds=submission.elapsed_seconds,
        )

        print(f"[SUCCESS] Result received:")
        print(json.dumps(result, indent=2, ensure_ascii=False))

    except Exception as e:
        print(f"[ERROR]: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(test_submit())
