# Technology Stack Decision Record

Ratings are the team's engineering judgement for a **4-person, 3-day, AI-assisted build** (1 = poor, 5 = excellent). Weights reflect what matters most for this hackathon: a working, believable prototype first, then resume value. Re-check free-tier limits and library versions yourself before relying on them.

Criteria: **Speed** (time to a working demo), **Vibe-coding fit** (how reliably AI tools generate and fix it), **Ops** (deployment simplicity), **Resume** (value as a portfolio skill), **Risk** (5 = low risk of breaking in front of judges).

## 1. Backend framework

| Option | Speed | Vibe fit | Ops | Resume | Risk | Verdict |
|---|---|---|---|---|---|---|
| **FastAPI (Python)** | 5 | 5 | 4 | 5 | 4 | **Chosen.** Same language as the ML work, typed contracts via Pydantic, automatic `/docs` page |
| Flask | 4 | 4 | 4 | 3 | 4 | Fine, but no built-in validation or schema docs |
| Django | 2 | 3 | 3 | 4 | 3 | Too heavy for a stateless API |
| Node/Express | 3 | 4 | 4 | 4 | 3 | Splits the codebase from the Python ML/NLP work |

## 2. Detection approach

| Option | Speed | Vibe fit | Explainability | Resume | Risk | Verdict |
|---|---|---|---|---|---|---|
| **Rules + lexicons now, TF-IDF model measured in L2** | 5 | 5 | 5 | 4 | 5 | **Chosen.** Testable in hours, every verdict is explainable, ML is added only if the ablation shows gain |
| Multilingual transformer | 2 | 3 | 2 | 5 | 2 | Needs real multilingual scam data we do not have; heavy to host free |
| LLM-only classification | 4 | 5 | 2 | 2 | 2 | Non-deterministic, privacy and hallucination risks, API limits can break a demo |

The LLM is kept as an optional *explainer* only, fed with structured findings.

## 3. Frontend

| Option | Speed | Vibe fit | Ops | Resume | Risk | Verdict |
|---|---|---|---|---|---|---|
| **Static HTML/JS served by the API (now)** | 5 | 5 | 5 | 2 | 5 | **Chosen for Level 1.** One deploy, no CORS, no build step |
| **React + Vite + Tailwind (Level 2 upgrade)** | 3 | 5 | 3 | 5 | 3 | Add only after the core is stable; deploy separately or build into `static/` |
| Streamlit | 5 | 4 | 4 | 2 | 4 | Fast but looks generic and teaches less web engineering |
| Next.js | 3 | 5 | 3 | 5 | 3 | Adds a second runtime next to Python for little gain |

## 4. Data storage

| Option | Verdict |
|---|---|
| **None in Level 1** | **Chosen.** Stateless means nothing to leak, nothing to migrate, nothing to fail |
| SQLite (Level 2, opt-in feedback only) | Zero setup; enough for a prototype |
| PostgreSQL | Only if multiple instances or real history features are needed; unnecessary now |

## 5. OCR (Level 2)

| Option | Notes | Verdict |
|---|---|---|
| Tesseract (`pytesseract`) | Free, local, works offline; needs the system package and language data for Telugu/Hindi, so hosting needs a Docker image or a host that allows `apt` installs | **Preferred** for privacy |
| EasyOCR | Easy Python install, supports many languages, but pulls in heavy ML dependencies that can exceed free-tier memory | Only if hosting allows it |
| Cloud vision API | Fastest to build, but sends the user's screenshot to a third party | Only with explicit user consent |

Quality on real WhatsApp screenshots (Telugu especially) must be tested before promising it.

## 6. LLM provider (optional explainer)

Gemini (you already have access through your subscription/free tier) or any other provider; the choice is a configuration detail because the explainer contract is provider-independent (see LLD section 8). Confirm current model names, quotas and data-use terms before use. Never send raw private messages without consent; send only structured findings.

## 7. Hosting

| Option | Notes | Verdict |
|---|---|---|
| **Single web service (e.g. Render free tier) running FastAPI + static UI** | One URL, simplest. Free instances can sleep and cold-start, so open the app before the demo | **Chosen** (`render.yaml` provided; verify current terms) |
| Vercel (UI) + separate API host | Two deployments and CORS; useful once React is added | Level 2 option |
| Hugging Face Spaces / Railway / Fly | Reasonable alternatives if limits change | Backup |

## 8. Quality tooling

pytest, GitHub Actions CI (tests + evaluation run), a labelled evaluation set. These cost little and are what separates a demo from an engineered project.

## 9. AI-assisted development setup

- `AGENTS.md` / `CLAUDE.md` give every AI tool the same rules and file ownership.
- Contract-first: `docs/API_CONTRACT.md` and `schemas.py` are edited together.
- Each person works on their own branch and owns their folders; tests must pass before a pull request.
- See `VIBE_CODING_PROMPTS.md` for starting prompts.

## 10. Decision summary

FastAPI + Pydantic, rule-and-lexicon engine, offline URL analyser, optional scikit-learn model measured by ablation, static UI now and React later, no database in Level 1, one free-tier web service, pytest + CI. The guiding principle: **ship a small thing that works and can be proven, then add the impressive parts in order of risk.**

