# Vibe-Coding Prompts

Paste the matching prompt at the start of a session with Claude, Gemini (Antigravity) or any tool. Always add: *"Read AGENTS.md and the files you will touch first. Run the tests after each change and show me the result."* Review every diff before committing.

## Habits that keep AI-written code reliable

1. Give the tool the contract (`API_CONTRACT.md`, `schemas.py`) before asking for changes.
2. Ask for the **test first**, then the code.
3. One small task per prompt; run `python -m pytest -q` after each.
4. If a test fails, paste the exact error back; do not say "it doesn't work".
5. Never let a tool change files outside your ownership area.
6. Ask it to explain what it changed, in your own words afterwards (ownership verification).

## Person 1: backend and deployment

> You are helping on ZenVex Guard (read AGENTS.md). I own `main.py`, `schemas.py`, `engine/analyzer.py`, `engine/urls.py`. Task: [e.g. replace the multi-part-suffix approximation in `registered_domain` with the Public Suffix List via the `tldextract` package, offline mode only, so no network call is made]. Keep the URL analyser fully offline. Add tests in `tests/test_engine.py` first, including edge cases (`co.in`, `gov.in`, IP hosts), then implement, then run pytest.

> Add a simple per-IP rate limit to the API (for example 30 requests per minute) without logging request bodies. Show the change to `main.py` only, and add a test.

## Person 2: frontend

> Read AGENTS.md and `docs/API_CONTRACT.md`. I own `backend/app/static/index.html`. Task: [e.g. improve the mobile layout and add a "copy report" button that copies a plain-text summary]. Rules: no `innerHTML` with user or API text, keep light/dark support, keep keyboard focus visible, no external libraries or fonts. Test at 360px wide.

> (Level 2) Create a React + Vite + Tailwind app in `frontend/` that calls the same `/api/v1` endpoints and reproduces the report view, including highlighted spans and the EN/TE toggle. Proxy `/api` to the backend in dev.

## Person 3: detection and ML

> Read `docs/LLD.md` sections 3 and 6. I own `engine/lexicon.py`, `engine/rules.py`, `engine/risk.py`, `ml/`. Task: add Romanised Telugu and Hindi patterns for [scam type]. For every pattern add (a) a scam example test and (b) a genuine-message test showing it does not fire on legitimate text. Do not widen `[^.!?।\n]{0,N}` windows. Run the evaluation script and show before/after.

> Using `scripts/evaluate.py` and `data/` files I provide, train the baseline with `python -m app.ml.train_baseline`, then evaluate rules-only, ML-only and rules+ML on the held-out set. Report precision, recall, F1 and false-positive rate for each. Do not tune on the held-out set.

## Person 4: data, QA, docs

> I am building a labelled evaluation CSV with columns `id,text,label,language,category,source`. Help me write 40 realistic GENUINE messages (bank alerts, OTPs, delivery updates, bill reminders, marketing offers) in English, Telugu, Romanised Telugu, Hindi and Romanised Hindi. They must contain no real names, numbers or account details, and the source column must say "synthetic". Include hard cases that contain words like urgent, cashback or KYC.

> Review `docs/` against the code. List every statement in HLD, LLD or the README that no longer matches the code, with the file and line to fix.

## Native-language review prompt (use with a human reviewer, not instead of one)

> Here are Telugu/Hindi strings from `playbooks.py` and `lexicon.py`. For each, tell me if the wording is natural and correct, and suggest a better alternative if not. Flag anything a native speaker would find odd. I will have a native speaker confirm.

## Level 2 starters

> Add a `POST /api/v1/scan/image` endpoint: accept a PNG/JPEG up to 5 MB, validate the file type, run OCR (Tesseract with English, Telugu and Hindi if installed) and pass the text to `analyze_text`. Do not store the image. Return the OCR text in the response so the user can correct it. Add tests with a small synthetic image.

> Add an opt-in `POST /api/v1/feedback` endpoint storing only `{scan_id, correct: bool, language, band}` in SQLite, never the message text, with a deletion endpoint. Update the contract first.

