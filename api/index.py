"""
Vercel Python Runtime entrypoint.

Vercel auto-detects api/index.py and looks for a variable named `app` (ASGI).
This file re-exports the FastAPI app from assessment.py.
"""

from assessment import app

__all__ = ["app"]
