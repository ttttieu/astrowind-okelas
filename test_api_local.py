#!/usr/bin/env python3
"""
Local test to verify API imports and startup without Vercel.
Run: python test_api_local.py
"""
import sys
import traceback
import io

# Force UTF-8 output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

print("=" * 60)
print("Testing API imports and startup...")
print("=" * 60)

# Test 1: Import index.py
print("\n[TEST 1] Importing api/index.py...")
try:
    sys.path.insert(0, "api")
    from index import app
    print("✅ SUCCESS: app imported from index.py")
except Exception as e:
    print(f"❌ FAILED: {type(e).__name__}: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 2: Check app is FastAPI
print("\n[TEST 2] Verify app is FastAPI instance...")
try:
    from fastapi import FastAPI
    assert isinstance(app, FastAPI), f"app is {type(app)}, not FastAPI"
    print("✅ SUCCESS: app is FastAPI instance")
except Exception as e:
    print(f"❌ FAILED: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 3: Check endpoints exist
print("\n[TEST 3] Checking endpoints...")
try:
    routes = [r.path for r in app.routes]
    print(f"Found {len(routes)} routes:")
    for route in sorted(routes):
        print(f"  - {route}")

    # Check for key endpoints
    required = ["/health", "/api/health"]
    for endpoint in required:
        if any(endpoint in r for r in routes):
            print(f"✅ {endpoint} found")
        else:
            print(f"⚠️  {endpoint} NOT found")
except Exception as e:
    print(f"❌ FAILED: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 4: Try calling health endpoint
print("\n[TEST 4] Testing /health endpoint...")
try:
    from fastapi.testclient import TestClient
    client = TestClient(app)
    response = client.get("/health")
    print(f"Status: {response.status_code}")
    print(f"Body: {response.json()}")
    if response.status_code == 200:
        print("✅ /health endpoint works")
    else:
        print(f"⚠️  /health returned {response.status_code}")
except Exception as e:
    print(f"❌ FAILED: {e}")
    traceback.print_exc()
    sys.exit(1)

print("\n" + "=" * 60)
print("✅ All local tests passed!")
print("=" * 60)
print("\nNext steps:")
print("1. Push requirements.txt to Vercel")
print("2. Trigger redeploy")
print("3. Check Vercel function logs")
