#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Test the HTTP API endpoint."""
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import httpx
import json
from datetime import datetime

async def test_submit_http():
    payload = {
        "assessment_id": "erp_readiness",
        "respondent": {
            "org_name": "Test Company",
            "role": "CEO",
            "contact": "test@example.com"
        },
        "answers": [
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
        ],
        "submitted_at": datetime.utcnow().isoformat() + "Z",
        "elapsed_seconds": 120.5,
    }

    try:
        async with httpx.AsyncClient() as client:
            print(f"[TEST] Posting to http://localhost:8000/api/assessment/submit")
            response = await client.post(
                "http://localhost:8000/api/assessment/submit",
                json=payload,
                timeout=10.0
            )
            print(f"[TEST] Status: {response.status_code}")

            if response.status_code == 200:
                result = response.json()
                print(f"[SUCCESS] Result:")
                print(json.dumps(result, indent=2, ensure_ascii=False))
            else:
                print(f"[ERROR] Status {response.status_code}")
                print(f"[ERROR] Response text: {response.text}")

    except Exception as e:
        print(f"[ERROR]: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    import asyncio
    asyncio.run(test_submit_http())
