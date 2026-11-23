# ZenVex Guard: Multilingual Scam Intelligence for Indian Users

Project proposal · HackWithAditya 2026 · Level 1 · Theme: Cybersecurity, FinTech & Digital Trust

Team: [Team name] · Members: [Name 1], [Name 2], [Name 3], [Name 4] · Repository: [GitHub link] · Live prototype: [URL]

## One-line pitch

Paste a suspicious SMS, WhatsApp message or link (English, Telugu, Hindi or code-mixed) and ZenVex Guard tells you which kind of scam it resembles, shows the evidence behind its verdict, and gives safe next steps, without storing your message or opening the link.

## 1. Problem

People in India regularly receive fake KYC, UPI, delivery-fee, job, investment, prize, remote-access and "digital arrest" messages. Most users cannot tell a genuine bank alert from a scam, and even when they feel unsure they do not know which part is suspicious or what to do next.

Existing tools cover only part of the gap. A spam filter gives a label without a reason. Reporting channels such as the Chakshu facility on the government's Sanchar Saathi portal collect reports about suspected fraud, but they are not an interactive tool that explains, in the user's own language, why a particular message looks dangerous before they act on it.

## 2. Solution

ZenVex Guard is a user-side analysis assistant. The user pastes a message or a link and receives an investigation report:

1. **Language detection** for English, Telugu script, Romanised Telugu, Hindi script and Romanised Hindi.
2. **Indicator detection** across 12 scam indicators (urgency, account-block threats, KYC pressure, credential requests, payment pressure, reward bait, investment bait, job scams, remote-access apps, delivery/customs fees, digital-arrest threats, unofficial contact numbers). Each indicator carries the exact phrases that triggered it.
3. **URL analysis** with 14 offline checks (IP hosts, @ tricks, punycode, shorteners, risky TLDs, subdomain stacking, brand-in-domain mismatch, look-alike spellings, APK links and more). The analyser never opens the link.
4. **Risk engine** that combines the evidence into a risk band and score. The score is an evidence summary, not a probability.
5. **Scam playbook and explanation:** the message is matched to one of 9 named Indian scam types, and the user gets a plain-language explanation plus type-specific safe actions in English and Telugu, with the official helpline and reporting portal for people who have already lost money.

## 3. What makes it different

- **Indian scam playbooks.** Nine named scam types, each with its own safe-action steps, instead of a generic spam/not-spam label.
- **Code-mixed language support.** Lexicons for English, Telugu, Romanised Telugu, Hindi and Romanised Hindi, tested separately rather than only translating the interface.
- **Evidence first.** Every verdict lists what was matched, and the matched phrases are highlighted in the user's own message. The explanation is built only from detected findings and never claims a lookup that was not performed.
- **Honest uncertainty.** A link is never declared "safe". Urgency alone is not treated as proof. Genuine bank OTP messages that warn users not to share an OTP are not flagged as credential requests.
- **Measured, not claimed.** An evaluation harness reports precision, recall, F1 and false positives, including genuine bank, OTP and delivery messages, broken down per language.
- **Privacy by design.** No message is stored, no URL is fetched (which also removes server-side request forgery risk), and the default path calls no third-party service.

We do not claim to be the first scam detector. Our contribution is the combination above, built and evaluated for Indian users and languages.

## 4. Prototype status (Level 1)

**Working now:** text scanner, language detection, 12-indicator rule engine, URL analyser, risk engine, 9 scam playbooks, deterministic explanation in English with Telugu action steps, REST API (FastAPI), web interface with highlighted evidence, 22 automated tests, evaluation script, CI and deployment configuration.

**Planned for the 48-hour round:** screenshot upload with OCR, a trained TF-IDF text classifier compared against the rules in an ablation, a React interface, opt-in feedback storage, optional LLM-phrased explanations grounded in structured findings, and optional URL-reputation adapters.

**Honest note:** the current evaluation set is small and hand-built by the team. Reported metrics are for development and will be expanded and published with their limitations.

## 5. Architecture summary

Browser interface, then FastAPI service, then language detector, indicator engine, URL analyser and (optional) ML scorer, then risk engine, then playbook and explainer, then JSON response. Level 1 is stateless, so there is no database to fail and no personal data to protect at rest. It deploys as a single web service on a free tier. Full designs are in `docs/HLD.md` and `docs/LLD.md`.

## 6. Technology and rationale

| Layer | Choice | Why |
|---|---|---|
| Backend | Python, FastAPI, Pydantic | Fast to build, typed API contract, automatic docs, same language as the ML work |
| Detection | Regex lexicons plus a rule engine, optional scikit-learn TF-IDF model | Explainable and testable in days; ML is added only where it can be measured |
| URL analysis | Python urllib and ipaddress, no network | Safe by construction and instant |
| Interface | Static web page now, React in Level 2 | A working demo first, richer UI after |
| Deployment | Single free-tier web service | Fewest moving parts for judges |
| Quality | pytest, GitHub Actions, evaluation script | Evidence that it works |

## 7. Evaluation and responsible AI

We evaluate with a labelled set of scam and genuine messages across languages and report precision, recall, F1, the confusion matrix and the false-positive rate, plus an ablation of rules against rules plus ML. Near-duplicate templates are kept out of the held-out set. Synthetic messages are labelled as synthetic. We never use real people's private messages without permission. The tool is advisory: it states its limits in the interface and does not guarantee that any message is safe.

## 8. Plan for the 48-hour round

Freeze scope and re-baseline in the first hours, add the challenge-specific enhancement, expand and publish the evaluation, add OCR and the React interface only after the core is stable, then rehearse the demo with a genuine-message counterexample and a Telugu example.

## 9. Impact and feasibility

The target users are everyday smartphone users, students, and people who are not confident with technology. The prototype needs no special hardware, runs on a free tier, and the core is already implemented, so the remaining work is measured improvement rather than invention.

## 10. Limitations and risks

Rules can miss new scam wording, and keyword lists need continuous maintenance. The starter list of official brand domains is incomplete, so a legitimate but unlisted domain may be flagged as a possible impersonation. Telugu and Hindi wording needs native-speaker review. Without live reputation data the URL result is based on structure only. Helpline and portal details must be verified before each demo.

## 11. AI usage disclosure

AI coding assistants (Claude and Gemini through Antigravity) were used to draft code, tests and documentation. The team reviewed, ran and understands the code, and each member can explain the module they own. [Team to confirm and adjust this paragraph before submission.]

