"""
Vercel Python Runtime entrypoint.

Vercel auto-detects api/index.py and looks for a variable named `app` (ASGI).
This file re-exports the FastAPI app from assessment.py.
"""

import sys
import traceback

app = None
error_msg = None

try:
    # Try absolute import (Vercel Python Runtime)
    print("[index.py] Trying absolute import: from api.assessment import app")
    from api.assessment import app
    print("[index.py] SUCCESS: absolute import worked")
except Exception as e:
    print(f"[index.py] Absolute import failed: {type(e).__name__}: {e}")
    traceback.print_exc()
    try:
        # Fallback to relative import (local development)
        print("[index.py] Trying relative import: from .assessment import app")
        from .assessment import app
        print("[index.py] SUCCESS: relative import worked")
    except Exception as e2:
        print(f"[index.py] Relative import failed: {type(e2).__name__}: {e2}")
        traceback.print_exc()
        try:
            # Last resort - direct import
            print("[index.py] Trying direct import: from assessment import app")
            from assessment import app
            print("[index.py] SUCCESS: direct import worked")
        except Exception as e3:
            print(f"[index.py] Direct import failed: {type(e3).__name__}: {e3}")
            traceback.print_exc()
            error_msg = f"All import strategies failed: {e3}"

if app is None:
    print(f"[index.py] FATAL: app is None! Error: {error_msg}")
    # Create a minimal fallback app to prevent Vercel from crashing
    from fastapi import FastAPI
    app = FastAPI()
    @app.get("/health")
    async def health():
        return {"error": error_msg or "Failed to import assessment module"}

__all__ = ["app"]
