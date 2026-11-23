# Registration Submission: copy-paste pack

Everything the HackWithAditya registration "Project" step is likely to ask for. I do not know the exact field names or character limits, so each item has a **short**, **standard** and (where useful) **long** version. Paste the one that fits the limit. Replace every `[bracket]` before submitting.

---

## 1. Project title

**ZenVex Guard: Multilingual Scam Intelligence for Indian Users**

Short: **ZenVex Guard**

## 2. Theme

**Cybersecurity, FinTech & Digital Trust**

## 3. One-line pitch (about 35 words)

Paste a suspicious SMS, WhatsApp message or link in English, Telugu or Hindi, and ZenVex Guard shows what scam it resembles, the evidence behind the verdict, and safe next steps, without storing your message or opening the link.

## 4. Abstract

### Short (about 55 words)

ZenVex Guard is an explainable scam-analysis assistant for Indian users. It checks a pasted message or link in English, Telugu, Hindi or a mix, shows the exact warning phrases, tests links without opening them, names the scam type, and gives safe actions in English and Telugu. It stores nothing and never calls anything "safe".

### Standard (about 190 words)

Online scams in India arrive through ordinary messages: fake KYC and account-block alerts, UPI collect requests, delivery-fee links, job and investment offers, prize notices and "digital arrest" threats. Most users cannot tell these from genuine bank alerts, and existing tools either give a bare spam label or collect reports after the damage is done.

ZenVex Guard is a user-side analysis assistant. The user pastes a message or link in English, Telugu, Hindi or a mix. The system detects the language, finds twelve scam indicators and shows the exact phrases that triggered them, checks links with fourteen offline structural tests without ever opening them, and combines the evidence into a risk band. It then matches one of nine Indian scam playbooks and gives specific safe actions in English and Telugu, with the 1930 helpline and the cybercrime portal for people who have already lost money.

It never calls a message or link "safe", stores nothing, and is evaluated with precision, recall and false-positive tests on genuine bank, OTP and delivery messages. The Level 1 prototype (FastAPI backend, rule engine, web interface, automated tests) is working. Screenshot OCR and a measured machine-learning comparison are planned for the 48-hour round.

## 5. Problem statement

### Short (about 50 words)

People receive convincing fake KYC, UPI, delivery, job, investment and "digital arrest" messages but cannot tell which part is suspicious or what to do next. Spam filters give a label without a reason, and reporting channels act after the fact. Users, especially in regional languages, need an explained verdict before they click or pay.

### Standard (about 140 words)

Scam messages in India are written to look like genuine bank, courier, government or employer communication, often in a mix of English and a regional language. A typical user who receives "your account will be blocked today, update KYC at this link" has no easy way to judge it. Even when they feel uneasy, they do not know which part is suspicious or what to do next, and genuine bank alerts can look just as urgent.

Existing tools cover only part of the gap. A spam filter returns a label without a reason. Reporting channels such as Chakshu on the Sanchar Saathi portal collect reports about suspected fraud but are not interactive tools that explain a specific message, in the user's own language, before they act.

The problem we solve: give an ordinary user an **explained, evidence-based, language-aware verdict with safe next steps, before** they click, pay or share an OTP.

## 6. Target users

**Primary**
- Everyday smartphone users who receive SMS and WhatsApp messages, especially Telugu- and Hindi-speaking users who are more comfortable in their own language than in English.
- First-time and low-confidence digital payment users, including older family members, who are easy targets for KYC, OTP and UPI collect-request scams.

**Secondary**
- Students and young professionals targeted by fake job, task-earning and investment offers.
- Small shopkeepers and sellers who accept UPI and receive fake payment or refund messages.
- Family members who are asked "is this message real?" by relatives and want a quick, explained answer.

**Potential institutional users (future)**
- Banks, colleges, NGOs and community cyber-awareness programmes that could use the tool, its scam playbooks and its evaluation approach in awareness sessions.

**What they need from us:** a plain-language reason (not just a label), the matched phrases highlighted in their own message, advice in Telugu, a clear "this is not proof" honesty, and the helpline to call if money is already lost.

## 7. GitHub repository

**URL:** `https://github.com/[username-or-org]/ZenVex Guard`  ← replace with the real link

Suggested repository description (about 140 characters):
`Explainable multilingual scam analysis for Indian users: text and link checks, evidence highlighting, Telugu/Hindi support, privacy-first.`

Suggested topics: `scam-detection`, `phishing`, `cybersecurity`, `fastapi`, `nlp`, `telugu`, `hindi`, `fintech`, `explainable-ai`, `hackathon`

**Before you paste the link, check**
- [ ] Repository is **public** (or the organisers' account has access)
- [ ] `README.md` is on the front page with the live URL filled in
- [ ] `docs/` folder is pushed (all `.md` files)
- [ ] No `.env`, API keys or real personal data committed
- [ ] The green CI check shows on the latest commit
- [ ] The live prototype link opens on a phone

**Live prototype:** `https://[your-app].onrender.com` (or your host's URL)
**Demo video:** `[link]`

## 8. Project documents

Link each file on GitHub using this pattern (replace `<user>`):
`https://github.com/<user>/ZenVex Guard/blob/main/docs/<FILE>.md`

| Document | File | What it contains |
|---|---|---|
| Project proposal | `docs/PROJECT_PROPOSAL.md` | Full proposal: problem, solution, differentiators, status, plan |
| High-level design | `docs/HLD.md` | Scope, architecture diagrams, data flow, deployment, risks |
| Low-level design | `docs/LLD.md` | Every module, algorithms, weights, flags, limits |
| API contract | `docs/API_CONTRACT.md` | Endpoints, request/response shapes, errors |
| Technology decisions | `docs/TECH_STACK_DECISION.md` | Stack options compared with reasons |
| Test and evaluation plan | `docs/TEST_AND_EVALUATION_PLAN.md` | Tests, metrics, held-out set plan |
| Evaluation results | `docs/EVALUATION_RESULTS.md` | Latest run with honest caveats |
| Privacy and safety | `docs/PRIVACY_AND_SAFETY.md` | Commitments, limits, responsible use |
| AI usage disclosure | `docs/AI_USAGE_DISCLOSURE.md` | AI tools used and how the team verified the work |
| Team plan | `docs/TEAM_PLAN.md` | Roles, schedule, workflow |
| Roles and merge guide | `docs/ROLES_AND_MERGE_GUIDE.md` | Per-person tasks and error-free merging |

If the form needs an uploaded file instead of links, upload `docs/PROJECT_PROPOSAL.md` exported as PDF (open it in any markdown viewer, or paste it into Google Docs or Word, then export to PDF).

## 9. Other fields you may be asked

**Innovation / what is unique (standard)**
Indian scam playbooks with type-specific safe actions; Telugu, Hindi and Romanised (code-mixed) support; evidence-first reports that highlight the matched phrases in the user's own message; honest uncertainty (never "safe", scores are not probabilities); privacy by design (stateless, links never opened); and a measured evaluation including false-positive tests on genuine messages. We do not claim to be the first scam detector; our contribution is this combination built for Indian users and languages.

**Technology stack**
Python, FastAPI, Pydantic, a regex-and-lexicon rule engine, offline URL analysis, optional scikit-learn (TF-IDF + logistic regression), HTML/JavaScript interface (React planned), pytest, GitHub Actions, single free-tier web service.

**Prototype status (honest)**
Working: text and link scanning, language detection, 12 indicators, 14 URL checks, risk engine, 9 playbooks, English explanation with Telugu action steps, web UI with highlighted evidence, 22 automated tests, evaluation script, CI and deployment configuration. Planned: screenshot OCR, expanded evaluation and ML comparison, React UI, opt-in feedback.

**Impact**
Helps users pause before clicking or paying, in their own language, and tells victims where to report. Free to run, no hardware, no personal data stored.

**Feasibility**
The core is already implemented and tested. Remaining work is measured improvement (data, evaluation, OCR), not new invention. Runs on a free-tier service.

**Limitations (say them first; judges respect it)**
Rule-based detection can miss new wording and can flag genuine messages; the starter evaluation set is small and team-written; the official-domain list is a starter list; no live reputation data, so "no flags found" is not "safe"; Telugu and Hindi wording needs native review.

**AI usage disclosure (short)**
We used AI coding assistants (Claude, Gemini through Antigravity) to draft code, tests and documents. The team reviewed and ran everything, and each member can explain the module they own. Details in `docs/AI_USAGE_DISCLOSURE.md`.

## 10. Final check before pressing Submit

- [ ] All `[brackets]` replaced
- [ ] Team name, member names and college details match the earlier steps
- [ ] GitHub link and live link both open in a private/incognito window
- [ ] No claim of accuracy percentages anywhere (we have not measured real-world accuracy yet)
- [ ] AI disclosure filled in by the team, not left as a template
- [ ] Deadline confirmed on the registration page (listed as 25 Nov 2026, 11:59 PM IST)

