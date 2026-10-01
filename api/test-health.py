"""Minimal test function to verify Python serverless works on Vercel."""

def handler(request):
    return {"status": "ok", "message": "Test function works"}
