"""Offline URL analysis. NEVER performs any network request (no fetching, no DNS).

The verdict is based on URL structure only. `reputation_checked` is always False in Level 1
and the verdict is never 'safe'.
"""
import ipaddress
import re
from dataclasses import dataclass, field
from typing import List, Tuple
from urllib.parse import urlparse

URL_RE = re.compile(
    r"""(?ix)
    (?:https?://|www\.)[^\s<>"')\]]+
    |
    (?<![@\w.\-])(?:[a-z0-9-]+\.)+(?:com|in|net|org|info|xyz|top|club|online|site|link|app|co|io|me|cc|ly|gl|page|click|icu|buzz|vip|cfd|sbs|shop|store|live|work|support|help)\b(?:/[^\s<>"')\]]*)?
    """
)

MULTI_PART_SUFFIXES = {
    "co.in", "org.in", "net.in", "gov.in", "ac.in", "nic.in", "res.in", "edu.in",
    "bank.in", "fin.in", "co.uk", "com.au",
}
SHORTENERS = {"bit.ly", "tinyurl.com", "t.co", "goo.gl", "cutt.ly", "rb.gy", "is.gd", "shorturl.at", "ow.ly", "tiny.cc"}
SUSPICIOUS_TLDS = {"xyz", "top", "click", "icu", "buzz", "vip", "cfd", "sbs", "rest", "work", "support", "zip", "mov"}
PHISH_WORDS = ("kyc", "verify", "update", "secure", "login", "refund", "reward", "claim", "support", "care", "bonus", "prize", "offer", "redelivery")

# STARTER allowlist of official registered domains. Incomplete on purpose -- extend it and
# verify entries against official sources. A legitimate but unlisted domain will be shown as
# "possible impersonation", never as a confirmed scam.
BRANDS = {
    "sbi": ("sbi", {"sbi.co.in", "onlinesbi.sbi", "onlinesbi.com", "sbi.bank.in", "sbicard.com"}),
    "hdfc": ("hdfc", {"hdfcbank.com"}),
    "icici": ("icici", {"icicibank.com", "icicidirect.com"}),
    "axis": ("axisbank", {"axisbank.com"}),
    "kotak": ("kotak", {"kotak.com"}),
    "pnb": ("pnb", {"pnbindia.in", "netpnb.com"}),
    "paytm": ("paytm", {"paytm.com"}),
    "phonepe": ("phonepe", {"phonepe.com"}),
    "gpay": ("gpay", {"google.com"}),
    "amazon": ("amazon", {"amazon.in", "amazon.com", "amazonpay.in"}),
    "flipkart": ("flipkart", {"flipkart.com"}),
    "indiapost": ("indiapost", {"indiapost.gov.in"}),
    "incometax": ("incometax", {"incometax.gov.in", "incometaxindia.gov.in"}),
    "irctc": ("irctc", {"irctc.co.in"}),
    "uidai": ("uidai", {"uidai.gov.in"}),
    "airtel": ("airtel", {"airtel.in", "airtel.com"}),
    "jio": ("jio", {"jio.com"}),
    "rbi": ("rbi", {"rbi.org.in"}),
    "npci": ("npci", {"npci.org.in"}),
    "fedex": ("fedex", {"fedex.com"}),
    "dhl": ("dhl", {"dhl.com"}),
    "bluedart": ("bluedart", {"bluedart.com"}),
}

FLAG_DEFS = {
    "ip_host": ("Uses a raw IP address instead of a domain name", 30),
    "at_symbol": ("Contains '@', which can hide the real destination", 25),
    "punycode": ("Uses punycode (xn--), sometimes used for look-alike domains", 20),
    "shortener": ("URL shortener hides the real destination", 15),
    "suspicious_tld": ("Uses a top-level domain often seen in throwaway scam sites", 15),
    "many_subdomains": ("Has an unusually deep chain of subdomains", 10),
    "many_hyphens": ("Domain contains many hyphens", 10),
    "long_url": ("Very long URL", 5),
    "explicit_http": ("Uses http:// without encryption", 8),
    "phishing_words": ("Domain contains words like verify, update, login or refund", 12),
    "brand_mismatch": ("Contains a well-known brand name but is not on our official-domain starter list (possible impersonation)", 35),
    "lookalike_brand": ("Resembles a well-known brand using swapped characters", 35),
    "apk_link": ("Link points to an Android APK file", 30),
    "digit_heavy": ("Domain is unusually full of digits", 8),
}

_TRAILING = ".,;:!?"


@dataclass
class UrlReport:
    url: str
    host: str = ""
    registered_domain: str = ""
    flags: List[dict] = field(default_factory=list)
    score: int = 0
    verdict: str = "no_flags_found"
    official_match: bool = False
    reputation_checked: bool = False
    note: str = ""


def extract_urls(text: str) -> List[Tuple[str, int, int]]:
    """Return (url, start, end) for each distinct URL-like token in text."""
    out, seen = [], set()
    for m in URL_RE.finditer(text):
        raw = m.group(0)
        end = m.end()
        while raw and raw[-1] in _TRAILING:
            raw = raw[:-1]
            end -= 1
        if raw.endswith(")") and "(" not in raw:
            raw = raw[:-1]
            end -= 1
        if raw and raw.lower() not in seen:
            seen.add(raw.lower())
            out.append((raw, m.start(), end))
    return out


def registered_domain(host: str) -> str:
    parts = host.split(".")
    if len(parts) <= 2:
        return host
    if ".".join(parts[-2:]) in MULTI_PART_SUFFIXES:
        return ".".join(parts[-3:])
    return ".".join(parts[-2:])


def _brand_in_host(host: str, token: str) -> bool:
    for label in host.split("."):
        for piece in label.split("-"):
            if piece == token:
                return True
            if len(token) >= 4 and token in piece:
                return True
            if len(token) == 3 and (piece.startswith(token) or piece.endswith(token)):
                return True
    return False


def _lookalike(host: str, token: str) -> bool:
    for table in ({"0": "o", "1": "i", "3": "e", "5": "s", "4": "a"}, {"0": "o", "1": "l", "3": "e", "5": "s", "4": "a"}):
        norm = host.translate(str.maketrans(table)).replace("rn", "m").replace("vv", "w")
        if norm != host and _brand_in_host(norm, token) and not _brand_in_host(host, token):
            return True
    return False


def analyze_url(raw: str) -> UrlReport:
    rep = UrlReport(url=raw)
    explicit_scheme = re.match(r"^[a-z][a-z0-9+.\-]*://", raw, re.I) is not None
    candidate = raw if explicit_scheme else "http://" + raw
    try:
        parsed = urlparse(candidate)
        host = (parsed.hostname or "").lower().rstrip(".")
    except ValueError:
        rep.verdict = "malformed"
        rep.note = "The link could not be parsed and is treated as suspicious."
        rep.score = 40
        rep.flags.append({"id": "malformed", "label": "Malformed URL", "weight": 40})
        return rep

    rep.host = host
    flags = set()
    is_ip = False
    try:
        ipaddress.ip_address(host)
        is_ip = True
    except ValueError:
        pass

    if is_ip:
        flags.add("ip_host")
        rep.registered_domain = host
    else:
        rep.registered_domain = registered_domain(host)
    if "@" in parsed.netloc:
        flags.add("at_symbol")
    if "xn--" in host:
        flags.add("punycode")
    if rep.registered_domain in SHORTENERS:
        flags.add("shortener")
    if not is_ip and host.rsplit(".", 1)[-1] in SUSPICIOUS_TLDS:
        flags.add("suspicious_tld")
    if not is_ip and len(host.split(".")) - len(rep.registered_domain.split(".")) >= 3:
        flags.add("many_subdomains")
    if host.count("-") >= 3:
        flags.add("many_hyphens")
    if len(raw) > 100:
        flags.add("long_url")
    if explicit_scheme and parsed.scheme.lower() == "http":
        flags.add("explicit_http")
    if not is_ip and any(w in host for w in PHISH_WORDS):
        flags.add("phishing_words")
    if parsed.path.lower().endswith(".apk"):
        flags.add("apk_link")
    letters_digits = [c for c in host if c.isalnum()]
    if letters_digits and sum(c.isdigit() for c in letters_digits) / len(letters_digits) >= 0.3 and not is_ip:
        flags.add("digit_heavy")

    if not is_ip:
        for token, official in BRANDS.values():
            if rep.registered_domain in official:
                rep.official_match = True
            elif _brand_in_host(host, token):
                flags.add("brand_mismatch")
            elif _lookalike(host, token):
                flags.add("lookalike_brand")

    rep.flags = [{"id": f, "label": FLAG_DEFS[f][0], "weight": FLAG_DEFS[f][1]} for f in sorted(flags)]
    rep.score = min(100, sum(f["weight"] for f in rep.flags))

    if rep.score >= 35:
        rep.verdict = "suspicious"
    elif rep.flags:
        rep.verdict = "some_flags"
    elif rep.official_match:
        rep.verdict = "official_domain_match"
    else:
        rep.verdict = "no_flags_found"
    rep.note = (
        "Structure-only check. The link was not opened and no reputation service was queried, "
        "so 'no flags' does not mean the link is safe."
    )
    return rep
