# Test and Evaluation Plan

Two different things: **tests** prove the code does what we intend; **evaluation** measures how well the detector separates scams from genuine messages.

## 1. Automated tests (`backend/tests`)

Run: `cd backend && python -m pytest -q` (22 tests at the time of writing).

| Area | What is checked |
|---|---|
| Language | en, te, hi, te-rom, hi-rom examples |
| Indicators | Scam messages trigger expected indicators in English, Romanised and native scripts |
| False-positive guards | OTP warnings and OTP delivery messages are not credential requests; genuine bank alert, OTP, delivery, salary and KYC-confirmation messages stay `low`; urgency alone stays `low` |
| URLs | Extraction and trimming, emails skipped, registered-domain logic, official domain not flagged, brand-in-wrong-domain flagged, IP and shortener flags, no "safe" wording |
| Safety | The analyser works with sockets blocked (no network access) |
| Regression | Link text and sentence boundaries do not leak into indicator evidence or spans |
| API | Health, text and URL scans, validation errors (blank, too long, missing), examples, index page, scan results not retrievable |

Rule: every bug fix adds a test that fails before the fix.

## 2. Evaluation harness

Run: `python scripts/evaluate.py [--threshold N] [--with-ml]`

Reports: confusion matrix, precision, recall, F1, false-positive rate, per-language recall and false-positive rate, and the list of mistakes. A message counts as flagged when `score >= threshold` (default 30, the "caution" line).

### Important: what the bundled numbers mean

`data/eval_set.csv` holds 42 synthetic starter messages (22 scam, 20 genuine, five language groups) **written by the team while the rules were being written**. It checks that the pipeline runs and catches obvious regressions. **Its scores are not evidence of real-world accuracy and must not be quoted as such.** It does include a known miss (a UPI "collect request" refund scam scores 15, below the threshold), which is kept on purpose as an honest limitation.

## 3. Building a credible held-out set (Person 4, Level 1 stretch / Level 2)

1. Target at least 150 messages, balanced, with at least 25 per language group (en, te, hi, te-rom, hi-rom) and at least 40 genuine messages, including hard cases: real-looking bank alerts, OTPs, delivery notices, bill reminders, marketing offers with cashback or urgency.
2. Scam messages should come from permitted public sources and publicly shared examples, or be written by someone who has **not** seen the lexicon. Label synthetic messages as synthetic in the `source` column.
3. Never use real people's private messages without permission. Remove or mask names, numbers and account details.
4. Remove near-duplicate templates so the same wording does not appear many times.
5. Have a second person re-label a sample to check agreement.
6. **Freeze the held-out set.** Do not tune lexicon weights on it. Tune on a separate development set.

Columns: `id,text,label,language,category,source` (label 1 = scam, 0 = genuine).

## 4. ML ablation (Level 2)

1. Assemble `data/train.csv` (`text,label`) from permitted datasets plus team-written examples. The widely used UCI SMS Spam Collection is mainly English and general spam, so it is a baseline, not proof of Indian-scam performance.
2. `python -m app.ml.train_baseline --data data/train.csv`.
3. Compare on the held-out set: rules only, ML only, rules + ML. Report all three. Keep ML in the live path only if it improves results without raising false positives.

## 5. Metrics to publish

Precision, recall, F1, false-positive rate (the share of genuine messages wrongly flagged), the confusion matrix, per-language results, example mistakes, dataset size and source, and limitations. For a security tool, false positives matter because users stop trusting a tool that cries wolf.

## 6. Manual demo checks (before each demo)

- Fake KYC (English), Romanised Telugu, Telugu script, Hindi.
- A genuine OTP message and a genuine debit alert (must show low risk).
- A link-only scan.
- Very long input and empty input (friendly errors).
- Phone-width screen, light and dark mode.
- First load on the deployed URL (free instances may need a minute to wake).

## 7. Release gate (Tuesday 6 PM freeze)

All tests green, evaluation run recorded in `docs/EVALUATION_RESULTS.md` with its limitations, demo checklist passed on the deployed URL, README and disclosure complete.

