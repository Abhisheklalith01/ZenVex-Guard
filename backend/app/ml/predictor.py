"""Optional ML scorer. Returns None when no trained model is present (default in Level 1).

Train with: python -m app.ml.train_baseline --data data/train.csv
Whether it helps must be shown by the ablation in scripts/evaluate.py (rules-only vs rules+ML).
"""
from functools import lru_cache
from typing import Optional

from ..config import MODEL_PATH


@lru_cache(maxsize=1)
def _load():
    if not MODEL_PATH.exists():
        return None
    try:
        import joblib
        return joblib.load(MODEL_PATH)
    except Exception:  # missing dependency or corrupt file: fail soft, rules still work
        return None


def predict_proba(text: str) -> Optional[float]:
    model = _load()
    if model is None:
        return None
    try:
        return float(model.predict_proba([text])[0][1])
    except Exception:
        return None
