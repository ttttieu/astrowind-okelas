"""
Persistence layer for assessment submissions on Vercel Functions.

Vercel Functions are stateless, so submissions from LocalSimulatorClient
need to be persisted somewhere. This module provides a simple in-memory
store with optional write-through to logging (production should use
Vercel KV, Postgres, or similar).
"""

from __future__ import annotations

import json
import os
from datetime import datetime
from typing import Any

# Simple in-memory store for submissions (for demo/local)
_submission_store: dict[str, dict[str, Any]] = {}


def store_submission(submission_id: str, result: dict[str, Any]) -> None:
    """Store a submission result (when using LocalSimulatorClient on Vercel)."""
    _submission_store[submission_id] = {
        "result": result,
        "stored_at": datetime.utcnow().isoformat(),
    }

    # Log to stderr for debugging (visible in Vercel logs)
    if os.environ.get("DEBUG"):
        print(
            f"[SubmissionStore] Stored {submission_id}",
            file=__import__("sys").stderr,
        )


def get_submission(submission_id: str) -> dict[str, Any] | None:
    """Retrieve a stored submission result."""
    return _submission_store.get(submission_id)


def list_submissions() -> list[str]:
    """List all stored submission IDs."""
    return list(_submission_store.keys())
