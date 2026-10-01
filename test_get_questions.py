#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import httpx
import json

async def test_get_questions():
    try:
        async with httpx.AsyncClient() as client:
            print(f"[TEST] Getting questions from http://localhost:8000/api/assessment/erp_readiness/questions")
            response = await client.get(
                "http://localhost:8000/api/assessment/erp_readiness/questions",
                timeout=10.0
            )
            print(f"[TEST] Status: {response.status_code}")

            if response.status_code == 200:
                result = response.json()
                print(f"[SUCCESS] Questions loaded:")
                print(f"  Assessment ID: {result['assessment_id']}")
                print(f"  Title: {result['title']}")
                print(f"  Questions: {len(result['questions'])}")
                for q in result['questions']:
                    print(f"    - {q['id']}: {q['text'][:50]}...")
            else:
                print(f"[ERROR] Status {response.status_code}")
                print(f"[ERROR] Response: {response.text}")

    except Exception as e:
        print(f"[ERROR]: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    import asyncio
    asyncio.run(test_get_questions())
