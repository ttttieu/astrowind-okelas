"""
Vercel Python Runtime entrypoint.

Vercel auto-detects api/index.py and looks for a variable named `app` (ASGI).
"""

import sys
import os
from pathlib import Path

api_dir = str(Path(__file__).parent.absolute())
if api_dir not in sys.path:
    sys.path.insert(0, api_dir)

try:
    # Try relative import first (for Vercel package context)
    from .assessment import app
except ImportError:
    try:
        # Try absolute import (for direct Python execution)
        from assessment import app
    except ImportError as e:
        # Create fallback app if import fails
        from fastapi import FastAPI
        app = FastAPI()

        @app.get("/")
        @app.get("/api")
        @app.get("/api/health")
        async def error():
            return {"error": str(e), "sys_path": sys.path}

__all__ = ["app"]
