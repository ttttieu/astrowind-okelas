#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Quick test to verify assessment API refactoring works.
Tests behavior against TEST_LOG.md expectations.
"""

import sys
import json
from pathlib import Path

# Add api to sys.path
sys.path.insert(0, str(Path(__file__).parent / "api"))

from _assessment.workflow_engine import LocalWorkflowEngine, ValidationError

def main():
    engine = LocalWorkflowEngine()

    print("\n=== Testing Refactored Assessment API ===\n")

    # Test 1: Load question configs
    print("TEST 1: Load question configs")
    for assessment_id in ["erp_readiness", "ai_readiness", "km_maturity", "digitalization_level"]:
        try:
            config = engine.get_question_config(assessment_id)
            num_questions = len(config["questions"])
            print(f"  [OK] {assessment_id}: {num_questions} questions")
        except Exception as e:
            print(f"  [FAIL] {assessment_id}: {str(e)[:60]}")
            return 1

    # Test 2: ERP readiness assessment with correct answer format
    print("\nTEST 2: ERP readiness assessment")
    erp_answers = [
        {"question_id": "ERP-1", "selected_key": "B"},
        {"question_id": "ERP-2", "selected_key": "C"},
        {"question_id": "ERP-3", "selected_key": "C"},
        {"question_id": "ERP-4", "selected_key": "B"},
        {"question_id": "ERP-5", "selected_key": "B"},
        {"question_id": "ERP-6", "selected_key": "C"},
        {"question_id": "ERP-7", "selected_key": "B"},
        {"question_id": "ERP-8", "selected_key": "C"},
    ]
    try:
        result = engine.run_assessment_intake("erp_readiness", erp_answers)
        print(f"  [OK] Level={result['level']}, submission_id={result['submission_id']}")
        assert result['submission_id'] is not None
        assert result['level'] is not None
    except Exception as e:
        print(f"  [FAIL] {str(e)[:60]}")
        return 1

    # Test 3: AI readiness with straight-lining detection
    print("\nTEST 3: AI readiness - straight-lining detection")
    ai_answers = [
        {"question_id": "AI-1", "selected_key": "D"},
        {"question_id": "AI-2", "selected_key": "D"},
        {"question_id": "AI-3", "selected_key": "D"},
        {"question_id": "AI-4", "selected_key": "D"},
        {"question_id": "AI-5", "selected_key": "D"},
        {"question_id": "AI-6", "selected_key": "D"},
    ]
    try:
        result = engine.run_assessment_intake("ai_readiness", ai_answers)
        has_flag = "straight_lining_high" in result.get("flags", [])
        print(f"  [OK] Level={result['level']}, straight_lining_detected={has_flag}")
        assert has_flag, "Should detect straight-lining"
    except Exception as e:
        print(f"  [FAIL] {str(e)[:60]}")
        return 1

    # Test 4: Uncertain answers handling
    print("\nTEST 4: KM maturity - uncertain answers")
    km_answers = [
        {"question_id": "KM-1", "selected_key": "B"},
        {"question_id": "KM-2", "selected_key": "E"},  # Uncertain
        {"question_id": "KM-3", "selected_key": "E"},  # Uncertain
        {"question_id": "KM-4", "selected_key": "B"},
        {"question_id": "KM-5", "selected_key": "B"},
        {"question_id": "KM-6", "selected_key": "C"},
    ]
    try:
        result = engine.run_assessment_intake("km_maturity", km_answers)
        has_insufficient = result['insufficient_data_message'] is not None
        print(f"  [OK] Level={result['level']}, has_insufficient_message={has_insufficient}")
        # With 2+ uncertain, level should be None
        if len([a for a in km_answers if a['selected_key'] == 'E']) >= 2:
            assert result['level'] is None, "Level should be None with >= 2 uncertain answers"
    except Exception as e:
        print(f"  [FAIL] {str(e)[:60]}")
        return 1

    # Test 5: Invalid assessment ID
    print("\nTEST 5: Invalid assessment ID")
    try:
        engine.get_question_config("invalid_assessment")
        print(f"  [FAIL] Should have raised ValidationError")
        return 1
    except ValidationError:
        print(f"  [OK] Correctly raises ValidationError for invalid ID")

    # Test 6: Missing required answers
    print("\nTEST 6: Missing required answers")
    incomplete = [
        {"question_id": "DIG-1", "selected_key": "A"},
    ]
    try:
        engine.run_assessment_intake("digitalization_level", incomplete)
        print(f"  [FAIL] Should have raised ValidationError")
        return 1
    except ValidationError as e:
        print(f"  [OK] Correctly raises ValidationError for incomplete submission")

    print("\n=== All Tests Passed ===\n")
    return 0

if __name__ == "__main__":
    sys.exit(main())
