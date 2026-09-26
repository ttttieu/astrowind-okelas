# OKELAS Assessment API — Vercel Deployment Guide

## Overview

The OKELAS Assessment module has been refactored for Vercel deployment. It follows Vercel's Python Runtime conventions:

- **FastAPI backend** deployed as serverless functions in `/api`
- **Frontend widget** served as static asset in `/public`
- **Config & workflows** stored in `/api/config` and `/api/workflow-definitions`
- **Async request handling** for Vercel Functions

## Project Structure After Refactoring

```
okelas-com/
├── api/
│   ├── __init__.py
│   ├── assessment.py              # FastAPI app (entry point: exports `app`)
│   ├── config/                    # Question configs (JSON)
│   │   ├── questions_ai.json
│   │   ├── questions_dig.json
│   │   ├── questions_erp.json
│   │   └── questions_km.json
│   ├── workflow-definitions/      # Workflow definitions
│   │   └── assessment_intake_workflow.json
│   └── _assessment/               # Backend package
│       ├── __init__.py
│       ├── models.py              # Pydantic schemas
│       ├── workflow_engine.py     # Workflow interpreter
│       ├── okelas_client.py       # OKELAS Core adapter
│       └── submission_store.py    # Temporary submission storage
├── public/
│   └── assessment-widget.html     # Self-contained widget
├── requirements.txt               # Python dependencies (Vercel reads this)
├── vercel.json                    # Vercel config (includes Python 3.11)
├── package.json                   # Node.js dependencies (Astro)
└── ... (rest of Astro project)
```

## Architecture Principles

1. **No scoring logic in backend/frontend** — all logic lives in `workflow-definitions/assessment_intake_workflow.json`
2. **LocalSimulatorClient as fallback** — when OKELAS_CORE_BASE_URL is not set, uses local workflow engine
3. **HttpOkelasCoreClient for production** — when OKELAS_CORE_BASE_URL and OKELAS_CORE_API_KEY are set, calls real OKELAS Core
4. **Stateless design** — submissions are stored in submission_store.py (in-memory for dev; upgrade to Vercel KV for production)

## Environment Variables

### Required for Production

```bash
OKELAS_CORE_BASE_URL=https://okelas-internal.example.com
OKELAS_CORE_API_KEY=sk_xxxxx
```

Set these in Vercel Dashboard → Settings → Environment Variables.

### Optional

```bash
DEBUG=1  # Enable debug logging
```

## Deployment to Vercel

### Prerequisites

- Vercel account connected to GitHub
- This repository pushed to GitHub

### Steps

1. **Import project to Vercel**
   ```
   vercel link
   # or connect via Vercel Dashboard → Add Project → Import Git Repository
   ```

2. **Verify build settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `.` (default)
   - Vercel should auto-detect Node.js + Python runtimes

3. **Set environment variables** (if using real OKELAS Core)
   - Dashboard → Settings → Environment Variables
   - Add `OKELAS_CORE_BASE_URL` and `OKELAS_CORE_API_KEY`
   - Redeploy after adding variables

4. **Deploy**
   ```
   vercel deploy --prod
   # or push to main branch if connected to GitHub
   ```

### Verification

After deployment, test the API:

```bash
# Get questions
curl https://<your-vercel-url>.vercel.app/api/assessment/erp_readiness/questions

# Submit assessment
curl -X POST https://<your-vercel-url>.vercel.app/api/assessment/submit \
  -H "Content-Type: application/json" \
  -d '{
    "assessment_id": "erp_readiness",
    "respondent": {},
    "answers": [
      {"question_id": "ERP-1", "selected_key": "B"},
      ...
    ]
  }'

# Health check
curl https://<your-vercel-url>.vercel.app/health
```

## Local Development

### Backend Development

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run FastAPI directly
cd api
python -m uvicorn assessment:app --reload --port 8000

# Or test without a server
python
>>> from api._assessment.workflow_engine import LocalWorkflowEngine
>>> engine = LocalWorkflowEngine()
>>> result = engine.run_assessment_intake("erp_readiness", [...answers...])
```

### Frontend Widget Development

1. Serve widget locally:
   ```bash
   # Option A: Python built-in server
   cd public
   python3 -m http.server 9000
   
   # Option B: Node.js
   npx http-server public -p 9000
   ```

2. Open `http://localhost:9000/assessment-widget.html`

3. If backend is on different port, edit `API_BASE` in widget:
   ```javascript
   var API_BASE = "http://localhost:8000/api";
   ```

### Full Stack Local Testing

1. **Terminal 1: Backend**
   ```bash
   cd api && python -m uvicorn assessment:app --reload --port 8000
   ```

2. **Terminal 2: Frontend**
   ```bash
   cd public && python3 -m http.server 9000
   ```

3. **Browser**: Open `http://localhost:9000/assessment-widget.html`

## Testing

Run the test suite to verify refactoring:

```bash
python test_assessment_refactor.py
```

This tests:
- JSON syntax validation
- Question config loading
- LocalWorkflowEngine scoring logic
- Straight-lining detection
- Uncertain answer handling
- Error handling

## File Changes from Original

### Moved (no logic changes)
- `backend/main.py` → `api/assessment.py`
- `backend/models.py` → `api/_assessment/models.py`
- `backend/workflow_engine.py` → `api/_assessment/workflow_engine.py`
- `backend/okelas_client.py` → `api/_assessment/okelas_client.py`
- `frontend/assessment-widget.html` → `public/assessment-widget.html`
- Config & workflow files → `api/config/` and `api/workflow-definitions/`

### Added
- `api/_assessment/submission_store.py` — Simple in-memory submission storage for Vercel Functions (stateless)
- `api/__init__.py` and `api/_assessment/__init__.py` — Package markers
- `requirements.txt` — Python dependencies for Vercel
- `test_assessment_refactor.py` — Test suite

### Modified
- `api/_assessment/workflow_engine.py` — Updated config paths for new directory structure
- `api/_assessment/okelas_client.py` — Integrated submission_store for persistence
- `vercel.json` — Added Python 3.11 configuration

## Migration Path

### From Local to Vercel

1. ✅ Files are already in correct structure
2. ✅ requirements.txt already created
3. ✅ vercel.json already updated
4. ✅ Tests confirm behavior hasn't changed
5. Deploy to Vercel (see "Deployment to Vercel" section)

### From LocalSimulatorClient to HttpOkelasCoreClient

When OKELAS Core is ready:

1. Set environment variables on Vercel:
   - `OKELAS_CORE_BASE_URL`
   - `OKELAS_CORE_API_KEY`

2. Redeploy (no code changes needed)
   - `build_okelas_client()` factory will automatically switch to HttpOkelasCoreClient

## Known Limitations

### LocalSimulatorClient Persistence

Currently, submissions stored in `submission_store.py` are only in-memory. For production:

**Option A: Upgrade to Vercel KV**
```python
# Future enhancement in submission_store.py
from vercel_kv import kv

async def store_submission(submission_id: str, result: dict) -> None:
    await kv.set(f"submission:{submission_id}", json.dumps(result), ex=86400)
```

**Option B: Log to external service**
```python
# Stream to Datadog, CloudWatch, etc.
import logging
logger = logging.getLogger(__name__)
```

### OKELAS Core API Contract

The `HttpOkelasCoreClient` assumes:
- Endpoint: `POST /api/v1/workflows/trigger`
- Auth: Bearer token via `Authorization` header
- Payload: `{event_type, workflow_id, source, data}`
- Response: Synchronous result with `{level, label, description, flags, submission_id, ...}`

If OKELAS Core API differs, update `api/_assessment/okelas_client.py` and redeploy.

## Troubleshooting

### Build fails with "Python not found"
- Verify `requirements.txt` exists in root
- Ensure Python dependencies are listed correctly
- Vercel should auto-detect and use Python 3.11

### API returns 404 for assessment questions
- Verify config files exist in `api/config/`
- Check `assessment_id` parameter matches filename (e.g., `erp_readiness` → `questions_erp.json`)
- Review workflow_engine.py mapping logic

### CORS errors on frontend
- Widget should handle CORS automatically (Vercel adds CORS headers)
- If issues persist, check `CORSMiddleware` in `api/assessment.py`
- Update `allow_origins` to match your domain

### LocalSimulatorClient vs HttpOkelasCoreClient confusion
- If `OKELAS_CORE_BASE_URL` env var is NOT set: uses LocalSimulatorClient
- If set: uses HttpOkelasCoreClient
- This is automatic via `build_okelas_client()` factory

## Next Steps

1. ✅ Refactoring complete and tested
2. Deploy to Vercel (see "Deployment to Vercel" section)
3. Wire up real OKELAS Core when API is ready
4. Upgrade submission persistence to Vercel KV or database
5. Integrate widget into main okelas.com website
