"""Rule engine: finds scam indicators in text and returns evidence with offsets."""
import re
from dataclasses import dataclass, field
from typing import List, Tuple

from .urls import extract_urls
from .lexicon import (
    INDICATORS, CRED_EN, CRED_SOFT_VERBS, NEGATION,
)

_FLAGS = re.IGNORECASE | re.DOTALL
_COMPILED = {i.id: [re.compile(p, _FLAGS) for p in i.patterns] for i in INDICATORS}
_CRED_EN = re.compile(CRED_EN, _FLAGS)
_NEG = re.compile(NEGATION, _FLAGS)
_OTP_CODE = re.compile(r"\b\d{4,8}\b")
_MAX_EVIDENCE = 3
_MAX_SNIPPET = 80


@dataclass
class Indicator:
    id: str
    label: str
    weight: int
    evidence: List[str] = field(default_factory=list)
    spans: List[Tuple[int, int]] = field(default_factory=list)


def _snippet(s: str) -> str:
    s = " ".join(s.split())
    return s if len(s) <= _MAX_SNIPPET else s[: _MAX_SNIPPET - 1] + "…"


def _credential_matches(text: str):
    """English credential requests with two guards against false positives.

    1. Negation: 'do not share your OTP' is advice, not a request.
    2. OTP delivery: 'Enter OTP 123456 to log in' contains the code itself, so the
       soft verbs (enter/type/verify/confirm) are not treated as a request for it.
    """
    has_code = bool(_OTP_CODE.search(text))
    for m in _CRED_EN.finditer(text):
        before = text[max(0, m.start() - 30): m.start()]
        if _NEG.search(before):
            continue
        verb = m.group(1).lower()
        target = m.group(2).lower()
        if target == "otp" and verb in CRED_SOFT_VERBS and has_code:
            continue
        yield m


def _mask_urls(text: str) -> str:
    """Blank out URLs (same length, so offsets stay valid) so link text such as
    'sbi-kyc-update' is not mistaken for message wording. The URL analyser handles links."""
    chars = list(text)
    for _, start, end in extract_urls(text):
        for i in range(start, end):
            chars[i] = " "
    return "".join(chars)


def find_indicators(text: str) -> List[Indicator]:
    text = _mask_urls(text)
    found: List[Indicator] = []
    for ind in INDICATORS:
        hit = Indicator(ind.id, ind.label, ind.weight)
        matches = []
        for rx in _COMPILED[ind.id]:
            matches.extend(rx.finditer(text))
        if ind.id == "credential_request":
            matches.extend(_credential_matches(text))
        if not matches:
            continue
        matches.sort(key=lambda m: m.start())
        for m in matches:
            hit.spans.append((m.start(), m.end()))
            snip = _snippet(m.group(0))
            if snip not in hit.evidence and len(hit.evidence) < _MAX_EVIDENCE:
                hit.evidence.append(snip)
        found.append(hit)
    return found
