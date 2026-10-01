"""
Vercel Python Runtime entrypoint.

Vercel auto-detects api/index.py and looks for a variable named `app` (ASGI).
"""

import sys
import os
from pathlib import Path

# Ensure api directory is in path for imports
api_dir = str(Path(__file__).parent.absolute())
if api_dir not in sys.path:
    sys.path.insert(0, api_dir)

print(f"[index.py] sys.path[0]={sys.path[0]}")
print(f"[index.py] __file__={__file__}")

try:
    # Try relative import first (for package context)
    print("[index.py] Attempting relative import: from .assessment import app")
    from .assessment import app
    print("[index.py] SUCCESS: relative import worked")
except ImportError as e1:
    print(f"[index.py] Relative import failed: {e1}")
    try:
        # Try absolute import (for direct execution)
        print("[index.py] Attempting absolute import: from assessment import app")
        from assessment import app
        print("[index.py] SUCCESS: absolute import worked")
    except ImportError as e2:
        print(f"[index.py] Absolute import also failed: {e2}")
        import traceback
        traceback.print_exc()

        # Create fallback app if import fails
        from fastapi import FastAPI
        app = FastAPI()

        @app.get("/")
        @app.get("/api")
        @app.get("/api/health")
        async def error():
            return {
                "error": "Import failed",
                "details": str(e2),
                "sys_path": sys.path,
                "cwd": os.getcwd()
            }

__all__ = ["app"]
