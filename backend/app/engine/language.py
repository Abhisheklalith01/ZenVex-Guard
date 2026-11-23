"""Heuristic language detection for English, Telugu, Hindi and Romanised Telugu/Hindi.

This is intentionally simple (script ranges + marker words). It is a routing/labelling aid,
not a language-identification model. Limitations are documented in docs/LLD.md.
"""
import re
from .lexicon import TE_ROM_MARKERS, HI_ROM_MARKERS

_TELUGU = re.compile(r"[\u0C00-\u0C7F]")
_DEVANAGARI = re.compile(r"[\u0900-\u097F]")
_LATIN = re.compile(r"[A-Za-z]")
_WORD = re.compile(r"[a-z]+")


def detect_language(text: str) -> str:
    """Return one of: en, te, hi, te-rom, hi-rom, mixed."""
    te = len(_TELUGU.findall(text))
    hi = len(_DEVANAGARI.findall(text))
    la = len(_LATIN.findall(text))
    letters = te + hi + la
    if letters == 0:
        return "en"

    # Native-script messages. 'mixed' when a second script is a substantial share.
    if te and te >= hi:
        return "mixed" if la / letters > 0.4 else "te"
    if hi:
        return "mixed" if la / letters > 0.4 else "hi"

    words = _WORD.findall(text.lower())
    te_hits = sum(1 for w in words if w in TE_ROM_MARKERS)
    hi_hits = sum(1 for w in words if w in HI_ROM_MARKERS)
    if te_hits >= 1 and te_hits > hi_hits:
        return "te-rom"
    if hi_hits >= 2 and hi_hits > te_hits:
        return "hi-rom"
    return "en"
