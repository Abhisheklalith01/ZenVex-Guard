# Low-Level Design (LLD)

Describes the code as built. File paths are relative to `backend/`. Keep this document in sync with the code (a reviewer should be able to find every item below).

## 1. Module map

```
app/
  main.py            FastAPI app, routes, static UI mount, CORS
  schemas.py         Pydantic request/response models (contract source of truth)
  config.py          Limits, risk bands, thresholds, helplines, paths
  engine/
    analyzer.py      analyze_text(), analyze_url_only(): orchestration, no I/O
    lexicon.py       IndicatorDef list + credential regex parts + romanised markers
    rules.py         find_indicators(): regex matching with evidence + offsets
    language.py      detect_language()
    urls.py          extract_urls(), analyze_url(): offline structural analysis
    risk.py          compute_risk(), band_for()
    playbooks.py     scam-type playbooks, actions (EN + TE), pick_playbook()
    explain.py       build_explanation(): template text from findings only
    examples.py      demo messages
  ml/
    predictor.py     predict_proba(): optional model, fails soft
    train_baseline.py  TF-IDF + logistic regression training script
  static/index.html  demo UI
scripts/evaluate.py  metrics on labelled CSV
data/eval_set.csv    starter labelled set (synthetic)
tests/               pytest suite
```

Dependency direction: `main -> analyzer -> {language, rules, urls, risk, playbooks, explain, ml}`. `rules` imports `urls` (to mask links) and `lexicon`. Nothing in `engine/` imports FastAPI.

## 2. Analysis pipeline (`analyze_text`)

1. `text = text.strip()`.
2. `extract_urls(text)` returns `(url, start, end)` for each distinct link-like token.
3. `analyze_url()` on each URL, producing a `UrlReport`.
4. `find_indicators(text)`: URLs are masked with spaces (same length, offsets preserved), then each indicator's regexes run with `IGNORECASE | DOTALL`. `credential_request` also runs a custom matcher.
5. Optional `predict_proba(text)`; `None` if no model file or any error.
6. `compute_risk(indicators, url_scores, ml_prob)`.
7. `pick_playbook(indicator_ids)` only when band is not `low`.
8. Build `spans`, `explanation`, `actions`; attach `helplines`; return a dict matching `ScanResponse`.

`analyze_url_only` runs steps 3, 6 (URL score only, capped at 100), and 8.

No step performs network I/O, writes to disk or logs the message.

## 3. Indicator engine

Each `IndicatorDef(id, label, weight, patterns)` fires **once** per message regardless of match count; up to 3 distinct evidence snippets (max 80 characters each) and all match spans are recorded.

Pattern design rules:
- Windows between words use `[^.!?।\n]{0,N}` so a pattern cannot span sentences.
- Latin patterns use `\b`; Indic-script patterns use plain substrings (`\b` is unreliable for Indic scripts).
- Romanised Telugu/Hindi are covered by dedicated alternatives.

| Indicator id | Weight | What it looks for |
|---|---|---|
| urgency | 12 | immediately, within N hours, expires today, ventane, turant, వెంటనే, तुरंत |
| account_threat | 20 | account/card/SIM/service + blocked/suspended/closed; Romanised and native-script variants |
| kyc_pressure | 20 | KYC/PAN/Aadhaar with update, verify, pending, incomplete, expired |
| credential_request | 25 | share/send/give + OTP/PIN/password/CVV/card details, with guards (below); Indic forms |
| payment_pressure | 15 | pay/send + rupee amount, amount + fee/penalty/deposit, registration/customs fee, UPI collect request |
| reward_bait | 12 | you have won, lottery, prize, cashback, reward points, KBC; Indic forms |
| investment_bait | 30 | guaranteed returns, daily profit, double your money, join VIP trading group |
| job_scam | 20 | work from home, part-time job, earn Rs N per day, task-based |
| remote_access | 30 | AnyDesk, TeamViewer, install APK, `.apk` |
| delivery_customs | 12 | parcel/courier/customs + held, fee, pay, incomplete address |
| digital_arrest | 35 | digital arrest, arrest warrant, agency name + arrest/warrant/legal action, stay on video call |
| unofficial_contact | 10 | call/WhatsApp/contact + a 10-digit mobile number |

Weights are starting values chosen by judgement (strong, rarely-innocent signals such as remote-access apps, arrest threats and guaranteed returns are heavy enough to reach "caution" alone). They are **not calibrated probabilities**; calibration is a Level 2 task.

### Credential-request guards (`rules._credential_matches`)

English pattern: `verb + (up to 25 chars) + target` where verb is share/send/enter/provide/tell/give/submit/confirm/verify/update/reply with/type and target is OTP/PIN/password/passcode/CVV/card details/etc.

1. **Negation:** if `do not | don't | dont | never | not` appears in the 30 characters before the match, skip it ("Do not share your OTP" is advice).
2. **OTP delivery:** if the target is `otp`, the verb is a soft verb (enter/type/verify/confirm) and the message contains a 4-8 digit number, skip it ("Enter OTP 889977 to log in" delivers an OTP rather than asking for one).

## 4. Language detection (`language.detect_language`)

- Count Telugu (U+0C00-0C7F), Devanagari (U+0900-097F) and Latin letters.
- Telugu or Hindi script present: return `te` / `hi`, or `mixed` if Latin letters exceed 40% of letters.
- Latin only: count romanised marker words (`TE_ROM_MARKERS`, `HI_ROM_MARKERS`). Return `te-rom` if at least 1 Telugu marker and more than Hindi markers; `hi-rom` if at least 2 Hindi markers and more than Telugu; else `en`.
- Limits: heuristic only; short messages and English-heavy code-mixing may be labelled `en`. The label does not change detection (all lexicons always run), so a wrong label does not hide a scam.

## 5. URL analyzer (`urls.analyze_url`)

**Extraction.** One regex finds `http(s)://...`, `www....`, and bare domains on a fixed TLD list (not preceded by `@`, word characters, `.` or `-`, so email domains are skipped). Trailing `.,;:!?` and an unmatched `)` are trimmed.

**Parsing.** `urllib.parse.urlparse` (scheme-less input gets `http://` for parsing only). `ValueError` returns verdict `malformed`, score 40.

**Registered domain.** Last two labels, or last three when the last two form a known multi-part suffix (`co.in`, `org.in`, `gov.in`, `ac.in`, `bank.in`, `co.uk`, ...). This is an approximation, not the Public Suffix List (a Level 2 improvement).

**Flags and weights**

| Flag | Weight | Condition |
|---|---|---|
| ip_host | 30 | host parses as an IP address |
| at_symbol | 25 | `@` in the authority part |
| punycode | 20 | `xn--` in host |
| shortener | 15 | registered domain in shortener list |
| suspicious_tld | 15 | TLD in a risky list (xyz, top, click, icu, buzz, vip, cfd, sbs, ...) |
| many_subdomains | 10 | 3 or more labels beyond the registered domain |
| many_hyphens | 10 | 3 or more hyphens in host |
| long_url | 5 | longer than 100 characters |
| explicit_http | 8 | scheme typed as `http://` |
| phishing_words | 12 | host contains kyc, verify, update, login, refund, reward, claim, ... |
| brand_mismatch | 35 | host contains a brand token but registered domain is not on that brand's starter allowlist |
| lookalike_brand | 35 | brand token appears only after swapping look-alike characters (0/o, 1/i or l, 3/e, 5/s, 4/a, rn/m, vv/w) |
| apk_link | 30 | URL path ends in `.apk` |
| digit_heavy | 8 | 30% or more of host characters are digits |

`score = min(100, sum(weights))`. Verdict: `suspicious` at 35 or more; `some_flags` for any flag below 35; `official_domain_match` when no flag and the registered domain is on an allowlist; otherwise `no_flags_found`. `reputation_checked` is always `False` and the note states the check is structural only.

**Brand matching.** A token matches a host label piece (split on `.` and `-`) by equality, or by substring if the token has 4 or more characters, or by prefix/suffix if it has 3 characters. The allowlist is a **starter list that must be verified and extended**; unlisted official domains produce "possible impersonation" wording, never a confirmed verdict.

**Safety.** The module imports no network library and the test suite blocks `socket` to prove it.

## 6. Risk engine (`risk.compute_risk`)

```
text_points = sum(weight of each fired indicator)
url_points  = min(50, max(url_score over URLs))
ml_points   = round(ml_probability * 20)  if a model is present else 0
score       = min(100, text_points + url_points + ml_points)
```
Bands (placeholders): 0-29 `low`, 30-59 `caution`, 60-79 `high`, 80-100 `very_high`. `breakdown` reports the three parts. Every response carries the disclaimer that the score is not a probability.

URL-only scans use the URL score directly (cap 100) with the same bands.

## 7. Playbooks and actions

`PRIORITY` lists `(trigger_indicator, playbook_id)` pairs; the first trigger present wins: digital_arrest, remote_access, investment_fraud, job_fraud, delivery_customs_fee, prize_lottery, kyc_account_block (from kyc_pressure or account_threat), credential_phishing, payment_request. A playbook is only selected when the band is above `low`. Output actions are `[type-specific English steps] + 4 common steps (EN + TE)`. Telugu strings are drafts needing native review.

## 8. Explainer contract (`explain.build_explanation`)

Input: risk, indicators, URL reports, playbook id. Output: English sentences naming the scam type, up to 4 indicator labels and a URL sentence, always ending with a caution that indicators are not proof. With no findings it says that no indicators were found and that this does not prove safety.

**Future LLM rephrasing (optional, Level 2).** The LLM receives only this JSON: language, risk band, indicator ids and labels, URL flags and `reputation_checked`. System prompt rules: use only listed findings; never claim a lookup that was not performed; never say a message or link is safe; no new URLs or phone numbers; refuse to speculate. The response is validated (must not contain a URL or number not present in the findings) and falls back to the template on any failure. `explanation.source` becomes `llm`.

## 9. ML component (optional)

`train_baseline.py`: read `text,label` CSV, de-duplicate on normalised text, stratified 80/20 split, `TfidfVectorizer(analyzer="char_wb", ngram_range=(2,5), sublinear_tf=True)` plus `LogisticRegression(class_weight="balanced")`, print the classification report and confusion matrix, save with joblib. Character n-grams keep Romanised and code-mixed text usable.

`predictor.py` loads `models/baseline.joblib` once (cached) and returns a probability or `None` on any problem. The model is **ignored unless the ablation in `scripts/evaluate.py --with-ml` shows it helps** on the held-out set.

## 10. API layer

- `TextScanRequest.text`: 1-5000 characters, not blank. `UrlScanRequest.url`: 3-2048 characters.
- Routes are synchronous (CPU-light regex work).
- CORS origins from `ZenVex Guard_CORS_ORIGINS` (default `*`; restrict when the UI is hosted separately).
- Static UI mounted at `/static`, index served at `/`.
- No logging of request bodies. Do not add request-body logging middleware.

## 11. UI (`static/index.html`)

Single file, no build step. Modes: Message and Link only. After a scan it renders the risk meter, scam type, explanation, indicators with evidence, link cards, actions (EN/TE toggle) and the original message with highlighted spans. Overlapping spans are dropped (earlier start wins; URL wins ties). All user text is inserted via `textContent` or text nodes. Respects `prefers-color-scheme`.

## 12. Error handling

| Case | Behaviour |
|---|---|
| Blank/oversized input | 422 from validation |
| Unparseable URL | verdict `malformed`, score 40 |
| Model missing or broken | `ml_used: false`, rules continue |
| Regex or logic bug | 500 without echoing the input |

## 13. Test strategy (see `TEST_AND_EVALUATION_PLAN.md`)

Unit tests per module, false-positive tests with genuine messages, regression tests for fixed bugs, API tests with `TestClient`, a no-network test for the analyzer, and the evaluation script in CI.

## 14. Known limitations

- Keyword and regex rules miss paraphrased or new scam wording.
- Registered-domain logic is approximate; the brand allowlist is incomplete.
- No live reputation data; a link with no flags may still be malicious.
- Language detection is heuristic; Telugu/Hindi coverage is a small hand-built lexicon.
- Scores and bands are not calibrated.
- Screenshots (OCR) are not supported in Level 1.

