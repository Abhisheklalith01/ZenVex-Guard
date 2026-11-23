# Roles and Error-Free Merge Guide

Today is Sunday 22 Nov 2026. Level 1 is listed as due Wed 25 Nov, 11:59 PM IST (confirm on the form). **Real code freeze: Tue 24 Nov, 6 PM.** Use Wednesday only as a buffer.

Golden rules (read aloud once as a team):
1. **Each person edits only their own files.** That is what prevents merge conflicts.
2. **Nobody pushes to `main`.** Everything goes through a pull request.
3. **Run the tests before every push:** `cd backend && python -m pytest -q`.
4. **Never use `git push --force`.**
5. **Merge `main` into your branch every morning and before every pull request.**
6. If something breaks, tell the team in the chat *before* trying risky git commands.

---

## Part A. The four roles

### Person 1: Tech Lead, backend, deployment

**Owns:** `backend/app/main.py`, `schemas.py`, `config.py`, `engine/analyzer.py`, `engine/urls.py`, `.github/`, `render.yaml`, `requirements*.txt`
**Merges all pull requests.**

| When | Tasks | Done when |
|---|---|---|
| **Sun (tonight)** | 1. Create the GitHub repo and push the scaffold (Part B-1). 2. Invite P2, P3, P4 as collaborators. 3. Turn on branch protection if available (Part B-1). 4. Deploy to a free host using `render.yaml`. 5. Put the live URL in `README.md` and send it to the team. 6. Create the four branches' instructions in the chat. | Live URL opens and `/health` returns ok; all three teammates can push a branch |
| **Mon** | 1. Verify the official-domain list in `engine/urls.py` against the official websites; add only domains you have verified. 2. Add edge-case tests for URLs (IP hosts, `co.in`, long links). 3. Restrict CORS to the real origin if the UI moves. 4. Review and merge PRs at least twice (noon, 8 PM). | Tests green on `main`; deployed app redeployed after each merge |
| **Tue** | 1. Final merge window 3:00 to 5:30 PM. 2. **6 PM freeze:** only bug-fix PRs after this. 3. Tag the release (`git tag v0.1-level1 && git push origin v0.1-level1`). 4. Check the deployed app end to end. | Tag exists; deployed app matches `main` |

**You must be able to explain:** the pipeline in `analyzer.py`, why URLs are never fetched, how the API validates input, and how deployment works.

### Person 2: Frontend

**Owns:** `backend/app/static/` (all UI files)

| When | Tasks | Done when |
|---|---|---|
| **Sun** | Run the app locally; open it on a real phone (same Wi-Fi: `uvicorn app.main:app --host 0.0.0.0` then use the laptop's IP, or use the live URL). Write down every UI problem. | A list of issues in the team chat |
| **Mon** | 1. Fix layout on a 360px-wide screen. 2. Check Telugu text displays correctly on Android and Windows. 3. Improve empty, loading and error states. 4. Keep keyboard focus visible. 5. Take 4 screenshots for the README (fake KYC, genuine OTP, link-only, Telugu). | Screenshots in `docs/img/`; no layout break on mobile |
| **Tue** | Fix bugs only after 6 PM. Rehearse the demo order with P4. | Demo flow works twice in a row on the live URL |

**Rules:** never use `innerHTML` with user or API text (use `textContent`); no external fonts or libraries; keep light and dark mode working. If you need a new field from the API, ask P1 to change `schemas.py` and `docs/API_CONTRACT.md` first.

**You must be able to explain:** how the report is rendered safely, how highlighted spans are drawn, how the English/Telugu toggle works.

### Person 3: Detection and ML

**Owns:** `engine/lexicon.py`, `engine/rules.py`, `engine/risk.py`, `engine/playbooks.py`, `engine/explain.py`, `engine/language.py`, `app/ml/`

| When | Tasks | Done when |
|---|---|---|
| **Sun** | Read `docs/LLD.md` sections 3 to 7. List scam patterns that are missing per language. Ask a Telugu speaker (teammate or family) to review every Telugu string in `lexicon.py` and `playbooks.py`. | A written list of gaps; first native-review notes |
| **Mon** | 1. Add patterns, **each with two tests**: a scam example that must fire and a genuine message that must not. 2. Review weights using the **dev set** only (never the held-out set). 3. If P4 has enough data, train the baseline: `python -m app.ml.train_baseline --data data/train.csv`. | New tests green; `python scripts/evaluate.py --data data/dev_set.csv` run and recorded |
| **Tue** | Morning: ML ablation (rules only, ML only, both) on the held-out set, or skip and keep ML off. Update `docs/LLD.md` if weights or patterns changed. Fixes only after 6 PM. | Result written into `docs/EVALUATION_RESULTS.md` (with P4) |

**Rules:** do not widen the `[^.!?।\n]{0,N}` windows; never let a pattern match across sentences; keep the false-positive tests passing.

**You must be able to explain:** how an indicator fires, the credential-request guards, the risk formula, and what the ML baseline does.

### Person 4: Data, QA, documentation, submission

**Owns:** `backend/data/`, `backend/tests/`, `backend/scripts/`, `docs/`, `README.md`

| When | Tasks | Done when |
|---|---|---|
| **Sun** | 1. Submit the registration using `docs/REGISTRATION_SUBMISSION.md` (after P1 gives the repo link). 2. Create `backend/data/dev_set.csv` and `backend/data/heldout_set.csv` with the header `id,text,label,language,category,source`. 3. Write the first 20 genuine messages. | Registration submitted; both CSV files exist |
| **Mon** | 1. Reach about 100 to 150 labelled messages, at least 25 per language group and 40 genuine ones, including hard cases (urgent, cashback, KYC wording in genuine messages). 2. **Freeze the held-out set by Mon night:** after that, nobody edits it. 3. Ask a second person to re-label 20 rows and compare. 4. Add test cases for any bug the team finds. | Held-out set frozen; baseline numbers recorded |
| **Tue** | 1. Run `python scripts/evaluate.py --data data/heldout_set.csv` and write the results into `docs/EVALUATION_RESULTS.md` with honest limitations. 2. Fill in `docs/AI_USAGE_DISCLOSURE.md` with the whole team. 3. Add live URL, screenshots and demo video to the README. 4. Record the 3-minute demo video. 5. Submit the final form by evening; re-check on Wednesday morning. | Submission confirmation saved (screenshot) |

**Rules:** only synthetic, public or permitted messages; remove all real names, numbers and account details; never paste real OTPs, PINs or card numbers anywhere.

**You must be able to explain:** where the data came from, how metrics were computed, why the starter results are not an accuracy claim.

### Everyone

- Run the app locally and pass the tests before Mon morning.
- Join a 15-minute check-in: Sun 9 PM, Mon 9 AM and 8 PM, Tue 9 AM and 5:30 PM.
- Review at least one other person's pull request each day (read the diff; say what you understood).
- Be able to explain the whole pipeline in two minutes (ownership verification).

---

## Part B. How to merge without errors

### B-1. One-time setup (Person 1, tonight)

1. Create an empty repository on GitHub named `ZenVex Guard` (do **not** add a README or licence there).
2. On your computer, unzip the project, open a terminal in the `ZenVex Guard` folder, then:
```
git init -b main
git add .
git commit -m "Initial ZenVex Guard scaffold"
git remote add origin https://github.com/<user-or-org>/ZenVex Guard.git
git push -u origin main
```
(If `git init -b main` fails on an old Git version: `git init`, then `git branch -M main`.)
3. GitHub: Settings, Collaborators, add the three teammates.
4. GitHub: Settings, Branches (or Rules), add a rule for `main`: require a pull request, require the `test` status check to pass. If your plan does not allow this on a private repo, make the repo public or just follow the rules by agreement.
5. Settings, General, Pull Requests: allow **merge commits** (this keeps each person's commit history, which helps ownership verification).
6. If asked for a password, use a GitHub personal access token or sign in via GitHub Desktop or `gh auth login`.

### B-2. One-time setup (each teammate)

```
git clone https://github.com/<user-or-org>/ZenVex Guard.git
cd ZenVex Guard
git checkout -b p2-frontend        # p3-detection, p4-data-docs, p1-backend
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
python -m pytest -q                # must show: 22 passed
```
Commit your first change only after tests pass.

### B-3. The daily loop (everyone)

**Morning, and before every pull request:**
```
git checkout main
git pull origin main
git checkout <your-branch>
git merge main
```
If Git reports a conflict, go to B-5. Otherwise continue.

**While working:** save small commits often.
```
git status
git add <the specific files you changed>
git commit -m "area: what changed"
```
Use specific file names with `git add` instead of `git add .` so you never commit something by accident. Example messages: `rules: add Hindi KYC patterns`, `ui: fix mobile layout`, `data: add 30 genuine messages`.

**To submit your work:**
```
cd backend && python -m pytest -q && cd ..
git push -u origin <your-branch>     # first time; afterwards just: git push
```
Then on GitHub: **Pull requests, New pull request**, base `main`, compare your branch. Write two sentences: what changed and how you tested it. Tag P1 as reviewer.

**Person 1 merges:** wait for the green check, read the diff, click **Create a merge commit**. Then tell the team: "main updated". Everyone runs the "morning" block again.

### B-4. Merge order when several pull requests are waiting

1. P3 (detection engine), because other parts test against it
2. P1 (API and URL analyser)
3. P2 (UI)
4. P4 (data, tests, docs)

Merge `main` into the next branch after each merge and re-run the tests before merging the next one.

### B-5. When Git says "CONFLICT"

Conflicts mean two people edited the same file. Stay calm; nothing is lost.
```
git status                      # lists files marked "both modified"
```
1. Open each listed file. Find the markers: `<<<<<<<`, `=======`, `>>>>>>>`.
2. Keep the correct content (ask the other person if unsure), and **delete the three marker lines**.
3. Then:
```
git add <fixed-file>
git commit                      # completes the merge; accept the default message
cd backend && python -m pytest -q
```
To undo and start over: `git merge --abort`.

### B-6. Shared-file protocol (the only way to avoid conflicts on shared things)

| Change needed | Who edits | Process |
|---|---|---|
| New or changed API field | P1 | Edit `schemas.py` **and** `docs/API_CONTRACT.md` in the same commit; post in chat; P2 then updates the UI, P4 updates tests |
| New lexicon pattern | P3 only | Others send the pattern in chat |
| New test | P4 (or P3 next to their own fix) | Put it in `tests/`; do not edit someone else's test file without telling them |
| Docs wording | P4 | Others send comments in chat or as PR comments |
| `requirements.txt` | P1 only | Ask P1; then everyone re-runs `pip install -r requirements-dev.txt` |

### B-7. Common errors and fixes

| Error or symptom | Cause | Fix |
|---|---|---|
| `! [rejected] ... (non-fast-forward)` or "fetch first" | Remote has newer commits | `git pull origin <your-branch>`, then `git push`. Never force-push |
| `ModuleNotFoundError: No module named 'app'` | Wrong folder | `cd backend` and run commands from there |
| `No module named 'fastapi'` or `'pytest'` | Virtual environment not active or not installed | Activate `.venv`, then `pip install -r requirements-dev.txt` |
| Tests pass on your laptop, fail in CI | CI uses a clean Linux machine (case-sensitive file names, forward slashes) | Check file-name capitalisation and paths; read the CI log |
| `fatal: not a git repository` | Terminal is not inside the project | `cd` into `ZenVex Guard` |
| `Permission denied` / authentication failed on push | GitHub login | Use a personal access token, GitHub Desktop, or `gh auth login` |
| Telugu/Hindi text shows as `???` or boxes | File not saved as UTF-8 or font missing | Save as UTF-8 in your editor; the evaluation script already forces UTF-8 output |
| `warning: LF will be replaced by CRLF` | Windows line endings | Harmless; `.gitattributes` handles it |
| Committed to the wrong branch (not pushed yet) | Forgot to switch | `git branch my-fix` (saves your commit), then `git checkout main`, `git reset --hard origin/main`, `git checkout my-fix`. Ask P1 first if unsure |
| An AI tool edited files you do not own | Tool wandered | `git restore <file>` to discard those changes before committing |
| Pushed something to `main` by mistake | Skipped the rule | Tell P1; P1 runs `git revert <commit>`; do not force-push |
| Secret or key committed | `.env` or key in a file | Treat it as leaked: change the key immediately, then tell P1 |
| Deploy fails on the host | Wrong root or start command | Root directory `backend`; build `pip install -r requirements.txt`; start `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| App works locally but the live site is slow the first time | Free instance was asleep | Open the live URL a few minutes before the demo |

### B-8. Final merge checklist (Tue 5:30 PM, P1 runs it)

- [ ] All open pull requests merged or closed on purpose
- [ ] `git checkout main && git pull origin main`
- [ ] `cd backend && python -m pytest -q` shows all tests passing
- [ ] `python scripts/evaluate.py` runs without errors
- [ ] CI is green on the latest `main` commit
- [ ] Live URL redeployed from `main` and tested on a phone
- [ ] README has the live URL, demo video and screenshots
- [ ] `docs/AI_USAGE_DISCLOSURE.md` filled in; no `[brackets]` left anywhere (`grep -rn "\[Team\|\[add\|\[Name\|\[link\|\[URL\|\[username" docs README.md` to look)
- [ ] Tag created: `git tag v0.1-level1 && git push origin v0.1-level1`
- [ ] Repository is public (or organisers have access); link pasted into the form

