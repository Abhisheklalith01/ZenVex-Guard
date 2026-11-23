# Dataset Card

## `backend/data/eval_set.csv` (starter evaluation set)

| Item | Value |
|---|---|
| Size | 42 messages: 22 scam (label 1), 20 genuine (label 0) |
| Languages | en (27), te (5), hi (3), te-rom (4), hi-rom (3) |
| Source | `synthetic-starter`: written by the team's AI-assisted workflow for development |
| Personal data | None. Links use non-functional example domains |
| Intended use | Pipeline check and regression catching |
| Not intended for | Reporting accuracy, tuning final thresholds, or training a production model |

### Known weaknesses
- Written alongside the rules, so results are optimistic.
- Small; few examples per scam type and language.
- Telugu and Hindi wording not yet reviewed by native speakers.
- Contains one deliberate known miss (UPI collect-request refund scam).

## Planned datasets (Level 2)

| Dataset | Use | Caveat |
|---|---|---|
| Team-built held-out set (150+ messages) | Final evaluation | Must be frozen and kept separate from tuning |
| UCI SMS Spam Collection (public, ~5.5k English SMS) | Baseline ML training | English, general spam; not Indian-scam specific. Check its licence and citation requirements |
| Other public phishing/SMS datasets | Optional training data | Check licence, language and label quality |

Record for every dataset: where it came from, licence, collection date, cleaning steps, and known biases. Never include real people's private messages.

