"""
Vercel Python Runtime entrypoint.

Vercel auto-detects api/index.py and looks for a variable named `app` (ASGI).
This file re-exports the FastAPI app from assessment.py.
"""

import sys
import os
import traceback
from pathlib import Path

# Debug environment
api_dir = Path(__file__).parent
print(f"[index.py] api_dir: {api_dir}")
print(f"[index.py] sys.path[0]: {sys.path[0]}")
print(f"[index.py] cwd: {os.getcwd()}")

# Ensure api directory is in path
if str(api_dir) not in sys.path:
    sys.path.insert(0, str(api_dir))
    print(f"[index.py] Added to sys.path: {api_dir}")

app = None
error_msg = None

try:
    print("[index.py] Attempting: from .assessment import app")
    from .assessment import app
    print("[index.py] ✓ Relative import successful")
except ImportError as e:
    print(f"[index.py] ✗ Relative import failed: {e}")
    traceback.print_exc()

    try:
        print("[index.py] Attempting: from assessment import app")
        from assessment import app
        print("[index.py] ✓ Direct import successful")
    except ImportError as e2:
        print(f"[index.py] ✗ Direct import failed: {e2}")
        traceback.print_exc()
        error_msg = str(e2)
except Exception as e:
    print(f"[index.py] ✗ Unexpected error: {type(e).__name__}: {e}")
    traceback.print_exc()
    error_msg = f"{type(e).__name__}: {e}"

if app is None:
    print(f"[index.py] FATAL: Failed to load app. Creating error handler.")
    print(f"[index.py] Error message: {error_msg}")

    from fastapi import FastAPI
    from fastapi.responses import JSONResponse

    app = FastAPI()

    @app.get("/health")
    @app.get("/api/health")
    async def health():
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": error_msg or "Failed to import assessment module",
                "debug": {
                    "api_dir": str(api_dir),
                    "cwd": os.getcwd(),
                    "sys_path": sys.path[:3]
                }
            }
        )

    @app.get("/api/assessment/{assessment_id}/questions")
    @app.post("/api/assessment/submit")
    @app.post("/api/assessment/contact")
    async def error_handler(request):
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": error_msg or "Assessment module not loaded"}
        )
else:
    print(f"[index.py] ✓ App successfully loaded: {type(app).__name__}")

__all__ = ["app"]
