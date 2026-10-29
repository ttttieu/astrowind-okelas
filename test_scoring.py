#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Direct test of scoring logic."""
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.path.insert(0, 'api')

from _assessment.workflow_engine import LocalWorkflowEngine

engine = LocalWorkflowEngine()
try:
    config = engine.get_question_config('erp_readiness')
    print(f"[OK] Config loaded: {len(config['questions'])} questions")
    dims = set(q.get('dimension') for q in config['questions'] if q.get('dimension'))
    print(f"[OK] Dimensions: {dims}")

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

    result = engine.run_assessment_intake('erp_readiness', answers)
    print(f"\n[SUCCESS] Results:")
    print(f"  Level: {result['level']}")
    print(f"  Label: {result['label']}")
    print(f"  Archetype: {result['archetype']}")
    print(f"  Critical Flags: {result['critical_flags']}")
    print(f"  Dim Scores: {result['dimension_scores']}")
    print(f"  Overall Avg: {result['overall_average']}")

except Exception as e:
    print(f"\n[ERROR]: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
