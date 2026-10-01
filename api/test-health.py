"""Minimal test function to verify Python serverless works on Vercel."""

def handler(request):
    """Vercel's native Python handler format."""
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": '{"status": "ok", "message": "Python handler works"}'
    }
