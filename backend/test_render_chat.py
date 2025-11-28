import requests
import json

url = "https://exportsarathi-backend.onrender.com/api/chat/message"
payload = {
    "message": "Hello, are you working?",
    "session_id": "test_render_session"
}
headers = {
    "Content-Type": "application/json"
}

try:
    print(f"Testing {url}...")
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
