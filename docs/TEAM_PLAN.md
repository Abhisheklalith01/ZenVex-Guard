# Team Plan (4 people) and Schedule

Dates: today is **Sunday 22 Nov 2026**. The Level 1 listing gave **Wednesday 25 Nov, 11:59 PM IST** as the deadline. Confirm this on the registration page. Treat **Tuesday 24 Nov, 6 PM** as the real code freeze and use Wednesday only as a buffer.

## Roles

| Person | Role | Owns | Level 1 deliverables |
|---|---|---|---|
| 1 | Tech lead, backend, deployment | `main.py`, `schemas.py`, `engine/analyzer.py`, `engine/urls.py`, CI, hosting | Repo and branch rules, live URL, URL analyser improvements, merges |
| 2 | Frontend | `static/` (later `frontend/`) | Polished UI, mobile check, Telugu display check, demo flow |
| 3 | Detection and ML | `lexicon.py`, `rules.py`, `risk.py`, `ml/` | Better lexicons per language, weight review against the dev set, TF-IDF baseline and ablation |
| 4 | Data, QA, documentation | `data/`, `tests/`, `scripts/`, `docs/` | Held-out evaluation set, test cases, native-language review, README, demo video, submission |

Everyone: understand the full pipeline (ownership verification), review each other's pull requests, and run the app locally.

## Schedule

**Sun 22 Nov (today)**
- Submit the registration (project description from `docs/PROJECT_PROPOSAL.md`).
- Person 1: create the GitHub repo, push this scaffold, add the other three as collaborators, protect `main`, deploy to a free host, share the live URL.
- Everyone: clone, create a venv, run tests and the app locally (`README.md` quick start). Fix anything that breaks.
- Person 4: start the held-out evaluation set. Person 3: list missing scam patterns per language. Person 2: review the UI on a phone.

**Mon 23 Nov**
- P3: extend lexicons (new patterns come with a test and a false-positive check). P1: URL analyser edge cases, official-domain list verified against official sources. P2: UI polish, error states, EN/TE toggle. P4: reach the first 100 labelled messages, record baseline metrics.
- Evening: integration check on the deployed URL; fix the top 3 issues.

**Tue 24 Nov**
- Morning: P3 runs the ML ablation if there is enough data; keep ML off if it does not help. P4 records `docs/EVALUATION_RESULTS.md`.
- Afternoon: README final, architecture diagram check, AI disclosure filled in, demo video (3 minutes or less), screenshots.
- **6 PM: code freeze** (only fixes). Evening: submit.

**Wed 25 Nov**
- Buffer. Re-check the deployed link and the submission form. Submit by noon at the latest.

## Git workflow

```
git init -b main
git add .
git commit -m "Initial ZenVex Guard scaffold"
git remote add origin https://github.com/<user-or-org>/ZenVex Guard.git
git push -u origin main
```
- One branch per person: `p1-backend`, `p2-frontend`, `p3-detection`, `p4-data-docs`. Small pull requests; Person 1 merges.
- Commit messages: `area: what changed` (for example `rules: add Hindi KYC patterns`).
- Merge at least twice a day. Never push directly to `main` after tonight.
- CI must be green before merging.

## Local setup

```
cd backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
python -m pytest -q
uvicorn app.main:app --reload    # open http://127.0.0.1:8000
```

## Deployment checklist (Person 1)

1. Connect the GitHub repo to the host; use `render.yaml` or set root directory `backend`, build `pip install -r requirements.txt`, start `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
2. Check `/health`, `/docs` and `/` on the live URL.
3. Add the live URL to the README and the submission.
4. Free instances may sleep: open the app a few minutes before judging.

## Definition of done (Level 1)

- [ ] Live URL works on a phone
- [ ] Scan text and link, report shows risk, evidence, links, actions (EN/TE)
- [ ] Genuine OTP/bank/delivery examples show low risk
- [ ] 22+ tests green in CI; evaluation recorded with its limitations
- [ ] README, HLD, LLD, API contract, privacy and AI disclosure complete
- [ ] Demo video recorded
- [ ] Every member can explain their module

## Cut list if time runs out (cut in this order)

1. ML ablation (keep rules only)
2. Extra Telugu/Hindi lexicon expansion
3. UI polish beyond the working flow

Never cut: tests, the false-positive examples, the live URL, the honesty wording.

## Level 2 (48 hours, on campus) preparation

Decide in advance who does what: OCR (P1 + P3), React or UI upgrade (P2), expanded evaluation and published metrics (P4), challenge-specific enhancement (whole team after the brief). Bring laptops with the repo cloned and a working local environment.

