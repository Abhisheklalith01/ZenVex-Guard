"""Train a TF-IDF + Logistic Regression baseline.

Input CSV columns: text,label  (label: 1/scam/spam or 0/legit/ham).
Character n-grams are used so Romanised and code-mixed text is not tokenised away.

    python -m app.ml.train_baseline --data data/train.csv --out models/baseline.joblib
"""
import argparse
import csv
import sys
from pathlib import Path

POSITIVE = {"1", "scam", "spam", "phishing"}


def load(path):
    texts, labels = [], []
    with open(path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            t = (row.get("text") or "").strip()
            if t:
                texts.append(t)
                labels.append(1 if str(row.get("label", "")).strip().lower() in POSITIVE else 0)
    return texts, labels


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", required=True)
    ap.add_argument("--out", default="models/baseline.joblib")
    ap.add_argument("--min-df", type=int, default=2)
    ap.add_argument("--test-size", type=float, default=0.2)
    args = ap.parse_args()

    import joblib
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.linear_model import LogisticRegression
    from sklearn.metrics import classification_report, confusion_matrix
    from sklearn.model_selection import train_test_split
    from sklearn.pipeline import Pipeline

    texts, labels = load(args.data)
    # De-duplicate so near-identical templates do not leak between train and test.
    seen, X, y = set(), [], []
    for t, l in zip(texts, labels):
        key = " ".join(t.lower().split())
        if key not in seen:
            seen.add(key)
            X.append(t)
            y.append(l)
    print(f"Loaded {len(texts)} rows, {len(X)} after de-duplication. Scam share: {sum(y)/len(y):.1%}")
    if len(set(y)) < 2:
        sys.exit("Need both scam and legitimate examples.")

    Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=args.test_size, stratify=y, random_state=42)
    pipe = Pipeline([
        ("tfidf", TfidfVectorizer(analyzer="char_wb", ngram_range=(2, 5), min_df=args.min_df, sublinear_tf=True)),
        ("clf", LogisticRegression(max_iter=1000, class_weight="balanced")),
    ])
    pipe.fit(Xtr, ytr)
    pred = pipe.predict(Xte)
    print(classification_report(yte, pred, target_names=["legit", "scam"], zero_division=0))
    print("Confusion matrix [[TN FP] [FN TP]]:\n", confusion_matrix(yte, pred))
    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(pipe, args.out)
    print("Saved", args.out)


if __name__ == "__main__":
    main()
