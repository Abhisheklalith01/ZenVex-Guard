# ZenVex Guard
**Tagline:** Detect. Analyse. Protect.  
**Category:** AI-Powered Multilingual Scam & Digital Threat Intelligence Platform  

ZenVex Guard is a cybersecurity threat intelligence platform engineered to identify deceptive messages, malicious URLs, and emerging digital financial fraud patterns across Indian messaging channels (SMS, WhatsApp, Telegram, Email, Social Media).

---

## What It Does

1. **Multilingual Script & Transliteration Detection**: Identifies language structure across English, Telugu (తెలుగు), Hindi (हिंदी), Romanised Telugu, Romanised Hindi, and code-mixed phrasing.
2. **12-Point Heuristic Rule Engine**: Detects high-risk urgency hooks, credential requests, account blocks, utility threats, and remote access solicitations with exact offset character highlighting.
3. **14-Point Offline URL Defense**: Inspects suspicious hyperlinks, brand impersonation, punycode lookalikes, raw IP hosts, and high-risk TLDs (.xyz, .top, .cfd) without opening the link or generating network traffic.
4. **9 Specialized Indian Scam Playbooks**: Correlates threat signals with named playbooks including Digital Arrest, Remote APK theft, UPI QR Collect fraud, SEBI-unregistered trading fraud, and Postal redelivery phishing.
5. **Explainable Threat Dossier**: Synthesizes a structured investigation report with evidence scores, cognitive manipulation breakdown, safety recommendations, and 1930 Cybercrime Helpline guidance.
6. **Stateless Privacy by Design**: Zero message persistence. User inputs are processed in-memory and discarded immediately upon verdict generation.

---

## Technical Architecture

```
User Input (SMS / WhatsApp / Email / URL)
  ↓
React 18 + Vite + TypeScript + Tailwind CSS Frontend
  ↓
FastAPI API Gateway (Stateless)
  ↓
┌────────────────────────────────────────────────────────┐
│ Language Processing & Script Transliteration           │
│ 12-Point Heuristic Rule Engine                         │
│ 14-Point Offline URL Structural Isolation              │
│ 9 Indian Threat Playbook Correlator                    │
│ Calibrated Evidence Scoring & Explanation Engine       │
└────────────────────────────────────────────────────────┘
  ↓
Structured Threat Dossier & Safety Protocol (En/Te)
```

---

## Directory Structure

```
zenvex-guard/
├── backend/
│   ├── app/
│   │   ├── engine/       # Rule engine, offline URL parser, playbooks, risk scoring
│   │   ├── ml/           # ML baseline scorer (TF-IDF + Logistic Regression)
│   │   ├── static/       # Fallback static UI assets
│   │   ├── config.py     # Central configuration & helplines
│   │   ├── main.py       # FastAPI application & endpoints
│   │   └── schemas.py    # Pydantic request/response schemas
│   ├── tests/            # Pytest test suite (22 unit tests)
│   └── requirements.txt  # FastAPI, Uvicorn, Pydantic, Scikit-learn
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar, Landing, Dashboard, Scanner, URL, Dossier, Library
│   │   ├── services/     # API integration & error handling
│   │   ├── types/        # TypeScript interfaces
│   │   ├── App.tsx       # Main router & application controller
│   │   └── main.tsx      # React root
│   ├── dist/             # Production build served by FastAPI
│   ├── package.json
│   └── vite.config.ts
└── docs/                 # HLD, LLD, API Contract, Test & Privacy plans
```

---

## Quick Start & Execution

### 1. Backend Server (FastAPI)

```bash
cd backend
python -m pip install -r requirements.txt
python -m pytest tests/              # Run test suite (22 passed)
uvicorn app.main:app --reload        # Starts at http://127.0.0.1:8000
```

*Interactive API documentation is accessible at `http://127.0.0.1:8000/docs`.*

### 2. Frontend Development Server (Vite)

```bash
cd frontend
npm install
npm run dev                          # Starts at http://localhost:5173
```

### 3. Production Deployment Mode

The compiled React frontend is located in `frontend/dist`. When you run the FastAPI backend, it automatically serves the complete production React application directly at:
```
http://127.0.0.1:8000
```

---

## API Endpoints

- `POST /api/v1/scan/text`: Analyze message content (SMS, WhatsApp, Email, Code-mixed text).
- `POST /api/v1/scan/url`: Offline structural evaluation of suspicious links.
- `GET /api/v1/examples`: Retrieve preset demonstration scenarios.
- `GET /api/v1/playbooks`: List comprehensive details of 9 Indian scam categories.
- `GET /api/v1/stats`: Telemetry and command centre threat statistics.
- `GET /health`: Service health and platform version.

---

## Emergency Reporting & Legal Guidance

ZenVex Guard is an advisory digital intelligence tool designed to raise security awareness. It does not replace official financial institutions or law enforcement agencies.

- **National Cybercrime Reporting Helpline:** `1930`
- **National Cybercrime Reporting Portal:** [cybercrime.gov.in](https://cybercrime.gov.in)
- **Suspected Fraud Reporting (DoT):** Chakshu on [sancharsaathi.gov.in](https://sancharsaathi.gov.in)

---

## License

MIT License. Designed and engineered for Hackathon 2026.
