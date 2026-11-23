# ZenVex Guard
**Tagline:** Detect. Analyse. Protect.  
**Category:** AI-Powered Multilingual Scam & Digital Threat Intelligence Platform  

ZenVex Guard is a cybersecurity threat intelligence platform engineered to identify deceptive messages, malicious URLs, and emerging digital financial fraud patterns across Indian messaging channels (SMS, WhatsApp, Telegram, Email, Social Media).

---

## Modular Documentation for Developers & AI Agents

Each subsystem has a dedicated developer manual so autonomous agents and engineers can inspect the architecture, understand the contracts, and write code independently:

| Guide | Location | Scope & Purpose |
|---|---|---|
| **Root Master Manual** | [`README.md`](./README.md) | Platform overview, quick start, system architecture, and change log |
| **Backend Developer Guide** | [`backend/README.md`](./backend/README.md) | 12-indicator rules, 14-check URL parser, playbooks, scoring formulas, ML models & API endpoints |
| **Frontend Developer Guide** | [`frontend/README.md`](./frontend/README.md) | React 18, component hierarchy, Recharts dashboards, API client, types, and styling tokens |
| **Agents Rulebook** | [`AGENTS.md`](./AGENTS.md) | Hard safety rules, stateless constraints, and cross-module permissions |
| **API Contract** | [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) | Endpoint specifications, JSON request/response bodies, and HTTP status codes |
| **High-Level Design** | [`docs/HLD.md`](./docs/HLD.md) | System components, sequence flows, threat models, and architectural boundaries |
| **Low-Level Design** | [`docs/LLD.md`](./docs/LLD.md) | Detailed algorithmic specifications, regex design, and regex offset rules |

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

## Changelog & Transformation from Legacy Base

| Area | Legacy Starter State | ZenVex Guard Enhanced State |
|---|---|---|
| **Branding** | ScamLens / ScamLens 2.0 placeholder branding | Completely rebranded as **ZenVex Guard** (Detect. Analyse. Protect.) with zero legacy references |
| **Frontend UI** | Single static HTML page (`index.html`, 12 KB) | Full-featured React 18 + TypeScript + Vite + Tailwind CSS dashboard with glassmorphism visual style |
| **Visualizations** | No charts or timeline graphics | Real-time Recharts `AreaChart` throughput timeline & `BarChart` threat category breakdowns |
| **URL Intelligence** | Coupled only with text scan form | Standalone dedicated URL Intelligence console with air-gapped sandbox badge and structural diagnostics |
| **Scam Library** | Hardcoded playbooks without UI viewer | Interactive searchable Scam Intelligence Library covering all 9 Indian playbooks with 1-click test buttons |
| **Protection Centre**| Minimal static bullet points | Interactive Emergency Response Switcher (Deducted Money, Shared Creds, Clicked APK) + 4 Defense Hygiene cards |
| **Investigation Dossier**| Basic text dump | Multi-tab dossier with interactive character span highlighting, cognitive manipulation analysis, and JSON export |
| **Backend APIs** | Only `/scan/text`, `/scan/url`, `/examples` | Added `/api/v1/playbooks`, `/api/v1/stats`, CORS support, and automatic SPA client routing |

---

## Directory Structure

```
zenvex-guard/
├── backend/                  # See backend/README.md for developer details
│   ├── app/
│   │   ├── engine/           # Rule engine, offline URL parser, playbooks, risk scoring
│   │   ├── ml/               # ML baseline scorer (TF-IDF + Logistic Regression)
│   │   ├── static/           # Fallback static UI assets
│   │   ├── config.py         # Central configuration & helplines
│   │   ├── main.py           # FastAPI application & endpoints
│   │   └── schemas.py        # Pydantic request/response schemas
│   ├── tests/                # Pytest test suite (22 unit tests)
│   ├── requirements.txt      # FastAPI, Uvicorn, Pydantic, Scikit-learn
│   └── README.md             # Dedicated Backend Developer Guide
├── frontend/                 # See frontend/README.md for developer details
│   ├── src/
│   │   ├── components/       # Navbar, Landing, Dashboard, Scanner, URL, Dossier, Library
│   │   ├── services/         # API integration & error handling
│   │   ├── types/            # TypeScript interfaces
│   │   ├── App.tsx           # Main router & application controller
│   │   └── main.tsx          # React root
│   ├── dist/                 # Production build served by FastAPI
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md             # Dedicated Frontend Developer Guide
├── docs/                     # HLD, LLD, API Contract, Test & Privacy plans
├── start_zenvex_guard.bat    # 1-Click launcher for both API and React Dashboard
├── run_backend.bat           # 1-Click backend launcher
├── run_frontend.bat          # 1-Click Vite dev launcher
└── push_to_github.bat        # 1-Click GitHub publisher
```

---

## Quick Start & Execution

### 1. One-Click Launch (Recommended)
Double-click **`start_zenvex_guard.bat`** in the project root.  
Open your browser to: **`http://127.0.0.1:8000`**

### 2. Manual Development Mode
```bash
# Terminal 1: Backend API
cd backend
python -m pip install -r requirements.txt
python -m pytest tests/              # 22 tests pass
uvicorn app.main:app --reload        # Starts at http://127.0.0.1:8000

# Terminal 2: Frontend Dev Server (Vite)
cd frontend
npm install
npm run dev                          # Starts at http://localhost:5173
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
