#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.path.insert(0, 'api')

from _assessment.workflow_engine import LocalWorkflowEngine
from _assessment.models import PublicAssessmentResult

engine = LocalWorkflowEngine()
answers = [
    {"question_id": "Q0-CONTEXT", "selected_key": "A"},
    {"question_id": "Q1-PROCESS-EXISTENCE", "selected_key": "B"},
    {"question_id": "Q2-PROCESS-ENFORCEMENT", "selected_key": "B"},
    {"question_id": "Q3-DATA-MASTER", "selected_key": "C"},
    {"question_id": "Q4-DATA-ALIGNMENT", "selected_key": "C"},
    {"question_id": "Q5-BOM-ROUTING", "selected_key": "B"},
    {"question_id": "Q6-COSTING", "selected_key": "C"},
    {"question_id": "Q7-OBJECTIVES", "selected_key": "C"},
    {"question_id": "Q8-SCOPE", "selected_key": "C"},
    {"question_id": "Q9-LEADERSHIP", "selected_key": "C"},
    {"question_id": "Q10-CHANGE-HISTORY", "selected_key": "C"},
    {"question_id": "Q11-GOVERNANCE", "selected_key": "C"},
]

try:
    result = engine.run_assessment_intake('erp_readiness', answers)
    print(f"[OK] Workflow result: level={result['level']}")

    public_result = PublicAssessmentResult(
        assessment_id='erp_readiness',
        level=result['level'],
        label=result['label'],
        description=result['description'],
        insufficient_data_message=result['insufficient_data_message'],
        submission_id=result['submission_id'],
        archetype=result.get('archetype'),
        critical_flags=result.get('critical_flags', []),
        dimension_scores=result.get('dimension_scores', {}),
        flags=result.get('flags', [])
    )
    print(f"[OK] PublicAssessmentResult created successfully")
    json_str = public_result.model_dump_json()
    print(f"[OK] Response JSON ({len(json_str)} chars):")
    print(json_str[:300])
except Exception as e:
    import traceback
    print(f"[ERROR]: {e}")
    traceback.print_exc()
