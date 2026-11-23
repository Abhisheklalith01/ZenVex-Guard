"""Evaluate the analyser on a labelled CSV and print metrics.

    python scripts/evaluate.py                       # rules only (default)
    python scripts/evaluate.py --with-ml             # include the optional ML model if present
    python scripts/evaluate.py --threshold 45

CSV columns: id,text,label,language,category,source   (label 1 = scam, 0 = legitimate)

WARNING: the bundled data/eval_set.csv is a small starter set written by the team while
writing the rules. Metrics on it are for pipeline checking only, NOT an accuracy claim.
Build a separate held-out set (ideally written by people who have not seen the rules).
"""
import argparse
import csv
import os
import sys
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from app.config import FLAG_THRESHOLD  # noqa: E402
from app.engine.analyzer import analyze_text  # noqa: E402


def prf(tp, fp, fn):
    p = tp / (tp + fp) if tp + fp else 0.0
    r = tp / (tp + fn) if tp + fn else 0.0
    f = 2 * p * r / (p + r) if p + r else 0.0
    return p, r, f


def main():
    # Telugu/Hindi text can crash a Windows console that is not UTF-8; make output safe.
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", default=os.path.join(os.path.dirname(__file__), "..", "data", "eval_set.csv"))
    ap.add_argument("--threshold", type=int, default=FLAG_THRESHOLD)
    ap.add_argument("--with-ml", action="store_true")
    args = ap.parse_args()

    rows = list(csv.DictReader(open(args.data, newline="", encoding="utf-8")))
    tp = fp = tn = fn = 0
    per_lang = defaultdict(lambda: [0, 0, 0, 0])  # tp fp tn fn
    errors = []
    for r in rows:
        res = analyze_text(r["text"], use_ml=args.with_ml)
        pred = 1 if res["risk"]["score"] >= args.threshold else 0
        gold = int(r["label"])
        idx = {(1, 1): 0, (1, 0): 1, (0, 0): 2, (0, 1): 3}[(pred, gold)]
        per_lang[r["language"]][idx] += 1
        if idx == 0: tp += 1
        elif idx == 1: fp += 1
        elif idx == 2: tn += 1
        else: fn += 1
        if pred != gold:
            errors.append((r["id"], "FALSE POSITIVE" if pred else "MISSED SCAM", res["risk"]["score"], r["text"][:70]))

    p, rc, f = prf(tp, fp, fn)
    fpr = fp / (fp + tn) if fp + tn else 0.0
    print(f"Rows: {len(rows)}  threshold: score >= {args.threshold}  ML: {'on' if args.with_ml else 'off'}")
    print(f"Confusion  TP={tp} FP={fp} TN={tn} FN={fn}")
    print(f"Precision={p:.2f} Recall={rc:.2f} F1={f:.2f} False-positive rate={fpr:.2f}")
    print("\nPer language (TP FP TN FN | recall, FP rate)")
    for lang, (a, b, c, d) in sorted(per_lang.items()):
        rec = a / (a + d) if a + d else 0.0
        fr = b / (b + c) if b + c else 0.0
        print(f"  {lang:7s} {a:3d} {b:3d} {c:3d} {d:3d} | recall {rec:.2f}, FP rate {fr:.2f}")
    if errors:
        print("\nErrors:")
        for e in errors:
            print("  ", *e)
    print("\nNote: starter set only; see header of this script before quoting numbers.")


if __name__ == "__main__":
    main()
