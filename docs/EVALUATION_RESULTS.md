# Evaluation Results

**Read first.** These numbers come from the 42-message starter set (`backend/data/eval_set.csv`), which the team wrote while writing the rules. They check that the pipeline runs and catch regressions. **They are not an accuracy claim** and must not be presented as one. Replace this file with results from a frozen held-out set (see `TEST_AND_EVALUATION_PLAN.md`) before the final submission.

Run: `python scripts/evaluate.py` (rules only, threshold score >= 30)
Date: 22 Nov 2026

```
Rows: 42  threshold: score >= 30  ML: off
Confusion  TP=21 FP=0 TN=20 FN=1
Precision=1.00 Recall=0.95 F1=0.98 False-positive rate=0.00

Per language (TP FP TN FN | recall, FP rate)
  en       11   0  15   1 | recall 0.92, FP rate 0.00
  hi        2   0   1   0 | recall 1.00, FP rate 0.00
  hi-rom    2   0   1   0 | recall 1.00, FP rate 0.00
  te        3   0   2   0 | recall 1.00, FP rate 0.00
  te-rom    3   0   1   0 | recall 1.00, FP rate 0.00

Errors:
   s09 MISSED SCAM 15 Approve the collect request of Rs 1 on your UPI app to receive your re

Note: starter set only; see header of this script before quoting numbers.
```

## Interpretation

- Zero false positives on the 20 genuine starter messages, including OTP, debit alert, delivery, bill and marketing cases, shows the false-positive guards work on these examples. It does not show they work on all real messages.
- The one miss is a UPI "collect request" refund scam that scores 15 (payment pressure alone). It is kept in the set as a known limitation; a fix should add a test and be checked against genuine payment reminders.
- Per-language numbers have very few examples (1 to 5 per class) and are not meaningful statistically.

## Next steps

1. Build and freeze a held-out set (150+ messages, see plan).
2. Tune on a separate development set only.
3. Re-run, record precision, recall, F1, false-positive rate, and per-language results here.
4. Run the rules vs ML ablation if a model is trained.

