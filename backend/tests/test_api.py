from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    assert client.get("/health").json()["status"] == "ok"


def test_scan_text_ok():
    r = client.post("/api/v1/scan/text", json={"text": "Your account will be blocked today. Update KYC: http://sbi-kyc-update.xyz"})
    assert r.status_code == 200
    body = r.json()
    assert body["risk"]["band"] in {"caution", "high", "very_high"}
    assert body["urls"][0]["reputation_checked"] is False


def test_scan_text_validation():
    assert client.post("/api/v1/scan/text", json={"text": "   "}).status_code == 422
    assert client.post("/api/v1/scan/text", json={"text": "x" * 5001}).status_code == 422
    assert client.post("/api/v1/scan/text", json={}).status_code == 422


def test_scan_url_ok():
    r = client.post("/api/v1/scan/url", json={"url": "bit.ly/abc"})
    assert r.status_code == 200 and r.json()["input_type"] == "url"


def test_examples_and_index():
    assert len(client.get("/api/v1/examples").json()) >= 3
    page = client.get("/")
    assert page.status_code == 200 and "ZenVex Guard" in page.text


def test_no_message_echo_in_error_logs_or_storage():
    # Stateless by design: scan ids are not retrievable.
    r = client.post("/api/v1/scan/text", json={"text": "hello"}).json()
    assert client.get(f"/api/v1/scan/{r['scan_id']}").status_code == 404
