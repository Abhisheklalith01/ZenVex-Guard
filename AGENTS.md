# AGENTS.md – context for AI coding tools (Claude, Gemini/Antigravity, Cursor, etc.)

Read this file first. It applies to every AI tool used on this repo.

## Project
ZenVex Guard: AI-Powered Multilingual Scam & Threat Intelligence Platform (Detect. Analyse. Protect.).
FastAPI backend in `backend/`, modern React frontend in `frontend/` (production bundle in `frontend/dist/`).
Docs in `docs/`. Start with `docs/HLD.md`, `docs/LLD.md`, `docs/API_CONTRACT.md`.

## Hard rules (do not break)
1. **Never fetch a user-supplied URL.** The URL analyser is offline by design (no HTTP, no DNS).
2. **Never store or log message text.** The API is stateless.
3. **Never output "safe".** Verdicts say "no flags found" and `reputation_checked` is false.
4. **Explanations come only from detected findings.** No invented lookups or evidence.
5. **Keep false-positive tests passing** (genuine OTP, bank alert, delivery messages stay "low").
6. **API changes go through `docs/API_CONTRACT.md` and `backend/app/schemas.py` together.**
7. Telugu/Hindi strings are drafts; mark anything new as "needs native review".
8. In the UI, insert user text with `textContent`/text nodes only (no `innerHTML`).

## Ownership (edit only your area; ask the owner for cross-area changes)
- Person 1 (lead/backend): `backend/app/main.py`, `schemas.py`, `engine/analyzer.py`, `engine/urls.py`, deployment, CI
- Person 2 (frontend): `backend/app/static/` (later `frontend/`)
- Person 3 (detection/ML): `engine/lexicon.py`, `engine/rules.py`, `engine/risk.py`, `ml/`
- Person 4 (data/QA/docs): `backend/data/`, `backend/tests/`, `scripts/`, `docs/`

## Commands
```
cd backend
pip install -r requirements-dev.txt
python -m pytest -q
python scripts/evaluate.py
uvicorn app.main:app --reload
```
Run tests before every commit. Small pull requests; one branch per person; only Person 1 merges to `main`.
