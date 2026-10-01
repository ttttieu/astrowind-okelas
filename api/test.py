"""
Minimal test function - no dependencies, should always work on Vercel.
Test with: /api/test
"""

def handler(request):
    return {
        "message": "Vercel Python functions are working!",
        "path": request.path if hasattr(request, 'path') else "unknown"
    }
