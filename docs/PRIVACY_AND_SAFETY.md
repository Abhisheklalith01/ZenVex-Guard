# Privacy, Safety and Responsible Use

## Design commitments (enforced by code and tests where noted)

1. **No storage.** The API keeps no message text, no history and no scan results. A scan id cannot be used to retrieve anything (tested).
2. **No logging of content.** Do not add middleware or print statements that record request bodies.
3. **No outbound calls in the default path.** The analyser makes no network or DNS requests (tested with sockets blocked). This also removes the risk of the server being used to probe internal networks (SSRF).
4. **No "safe" verdicts.** Links get "no flags found", and `reputation_checked` is false. Messages with no indicators get an explicit "this does not prove it is safe" line.
5. **Evidence over assertion.** Every flag shows what matched. The explanation is built only from findings.
6. **Scores are summaries, not probabilities.** Every response says so.

## Future features must keep these rules

- Feedback or history: opt-in, minimal, mask phone numbers and account numbers, allow deletion.
- Third-party URL reputation: opt-in, send only the registered domain (not the full message or query strings), document the provider and its terms.
- OCR: process locally if possible; if a cloud service is used, ask for explicit consent first.
- LLM explanation: send structured findings only, never raw messages.

## What to do if the user may already be a victim

Reports prominently include: call **1930** (national cybercrime helpline) and report at **cybercrime.gov.in**; suspected fraud communications can be reported through **Chakshu on the Sanchar Saathi portal**. These details are stored in `config.HELPLINES`. **Verify them on official government sites before each demo and update if they change.**

## Limits to state honestly

- ZenVex Guard is an independent awareness tool. It does not replace banks, the police or official reporting services.
- It can miss scams and can flag genuine messages.
- Clean results are not a guarantee.
- Telugu and Hindi content is a hand-built lexicon that needs native review.

## Data handling for the team

- Evaluation messages must be synthetic, publicly shareable, or used with permission, and cleaned of personal data.
- Never paste real OTPs, PINs, card numbers or Aadhaar numbers into the app, the repo, an AI tool, or a test.
- Do not publish real scam phone numbers or malicious URLs in the repo; examples use non-functional domains.

## Security checklist before public deployment

- [ ] CORS restricted if the UI is hosted on a different origin
- [ ] Rate limiting at the host or a reverse proxy
- [ ] No debug mode, no stack traces to users
- [ ] Dependencies pinned and scanned (`pip-audit`) before the final submission
- [ ] `.env` not committed

