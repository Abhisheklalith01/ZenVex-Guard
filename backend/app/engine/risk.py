"""Risk engine: combines text indicators, URL evidence and optional ML into a score.

The score is an EVIDENCE SUMMARY, not a probability of fraud. Weights and bands are starting
values and must be calibrated on a labelled evaluation set.
"""
from typing import Iterable, Optional

from ..config import RISK_BANDS, URL_MAX_POINTS, ML_MAX_POINTS


def band_for(score: int):
    for minimum, band_id, label in RISK_BANDS:
        if score >= minimum:
            return band_id, label
    return RISK_BANDS[-1][1], RISK_BANDS[-1][2]


def compute_risk(indicators: Iterable, url_scores: Iterable[int], ml_prob: Optional[float] = None) -> dict:
    text_points = sum(i.weight for i in indicators)
    url_points = min(URL_MAX_POINTS, max(url_scores, default=0))
    ml_points = round(ml_prob * ML_MAX_POINTS) if ml_prob is not None else 0
    score = min(100, text_points + url_points + ml_points)
    band_id, label = band_for(score)
    return {
        "score": score,
        "band": band_id,
        "label": label,
        "breakdown": {"text": text_points, "url": url_points, "ml": ml_points},
        "disclaimer": "This score summarises detected warning signs. It is not a probability of fraud.",
    }
