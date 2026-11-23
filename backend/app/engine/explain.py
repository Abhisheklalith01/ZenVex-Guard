"""Deterministic explanation built ONLY from detected findings.

An optional LLM can rephrase this later, but it must receive the same structured findings
and may not add evidence (see docs/LLD.md, section on the explainer contract).
"""
from .playbooks import PLAYBOOKS


def build_explanation(risk: dict, indicators: list, urls: list, playbook_id) -> str:
    parts = []
    n = len(indicators)
    if n == 0 and not any(u.flags for u in urls):
        return (
            "No known scam indicators were found. This does not prove the message is safe. "
            "If it asks for money, an OTP or a link click, verify through the official app or website."
        )

    if playbook_id and risk["band"] != "low":
        parts.append(f"This message resembles: {PLAYBOOKS[playbook_id]['label']}.")
    if n:
        labels = "; ".join(i.label.lower() for i in indicators[:4])
        parts.append(f"{n} warning sign{'s' if n != 1 else ''} detected: {labels}.")
    bad = [u for u in urls if u.flags]
    if bad:
        u = max(bad, key=lambda x: x.score)
        parts.append(
            f"The link '{u.host or u.url}' has {len(u.flags)} structural warning sign"
            f"{'s' if len(u.flags) != 1 else ''}. It was not opened or checked against a reputation service."
        )
    if risk["band"] == "low":
        parts.append("Overall detected risk is low. A single warning sign is not proof of fraud.")
    else:
        parts.append("These are indicators, not proof. Verify through an official channel before acting.")
    return " ".join(parts)
