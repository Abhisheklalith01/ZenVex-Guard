"""Scam playbooks: named Indian scam types with type-specific safe actions.

Telugu strings must be reviewed by a native speaker before being demonstrated.
"""

# Priority order: first playbook whose trigger indicator fired wins.
PRIORITY = (
    ("digital_arrest", "digital_arrest"),
    ("remote_access", "remote_access"),
    ("investment_bait", "investment_fraud"),
    ("job_scam", "job_fraud"),
    ("delivery_customs", "delivery_customs_fee"),
    ("reward_bait", "prize_lottery"),
    ("kyc_pressure", "kyc_account_block"),
    ("account_threat", "kyc_account_block"),
    ("credential_request", "credential_phishing"),
    ("payment_pressure", "payment_request"),
)

PLAYBOOKS = {
    "digital_arrest": {
        "label": "Digital arrest / fake agency threat",
        "extra_actions": [
            "No genuine agency arrests people over a video call or asks for money to 'settle' a case. Hang up.",
            "Do not stay on the call, and talk to a family member or friend right away.",
        ],
    },
    "remote_access": {
        "label": "Remote-access or fake app scam",
        "extra_actions": [
            "Do not install AnyDesk, TeamViewer or any APK that a caller or message asks for.",
            "If you already installed it, disconnect from the internet, uninstall it and contact your bank.",
        ],
    },
    "investment_fraud": {
        "label": "Investment or trading fraud",
        "extra_actions": [
            "Guaranteed or daily returns are a classic fraud signal. Do not transfer money.",
            "Check whether the entity is registered with SEBI on SEBI's official website.",
        ],
    },
    "job_fraud": {
        "label": "Fake job or task-based earning scam",
        "extra_actions": [
            "A genuine employer does not charge a registration, training or security fee.",
            "Do not join task groups that ask you to deposit money to 'unlock' earnings.",
        ],
    },
    "delivery_customs_fee": {
        "label": "Delivery or customs fee scam",
        "extra_actions": [
            "Check the shipment only in the courier's official app or website, or the app you ordered from.",
            "Do not pay a small 'redelivery' fee through a link in a message.",
        ],
    },
    "prize_lottery": {
        "label": "Prize, lottery or cashback scam",
        "extra_actions": [
            "You cannot win a contest you did not enter. Do not pay a fee to claim a prize.",
        ],
    },
    "kyc_account_block": {
        "label": "KYC or account-block impersonation",
        "extra_actions": [
            "Banks do not ask you to complete KYC through a link in a message. Open your bank's official app instead.",
        ],
    },
    "credential_phishing": {
        "label": "Credential phishing (OTP, PIN, password)",
        "extra_actions": [
            "No bank or company will ever ask for your OTP, PIN or full card details.",
        ],
    },
    "payment_request": {
        "label": "Suspicious payment or collect request",
        "extra_actions": [
            "You never need to enter a PIN or approve a request to RECEIVE money. Decline unexpected collect requests.",
        ],
    },
}

COMMON_ACTIONS = [
    {
        "en": "Do not open links or call numbers in this message.",
        "te": "ఈ సందేశంలోని లింక్‌లను తెరవవద్దు, నంబర్లకు కాల్ చేయవద్దు.",
    },
    {
        "en": "Never share an OTP, PIN, password or card details with anyone.",
        "te": "OTP, PIN, పాస్‌వర్డ్ లేదా కార్డ్ వివరాలను ఎవరితోనూ పంచుకోవద్దు.",
    },
    {
        "en": "Verify independently using the official app or website, not the link in the message.",
        "te": "సందేశంలోని లింక్ కాకుండా, అధికారిక యాప్ లేదా వెబ్‌సైట్ ద్వారా స్వయంగా సరిచూసుకోండి.",
    },
    {
        "en": "If you already lost money, call 1930 immediately and report at cybercrime.gov.in.",
        "te": "డబ్బు పోయినట్లయితే వెంటనే 1930 కు కాల్ చేసి, cybercrime.gov.in లో ఫిర్యాదు చేయండి.",
    },
]


def pick_playbook(indicator_ids):
    ids = set(indicator_ids)
    for trigger, playbook in PRIORITY:
        if trigger in ids:
            return playbook
    return None
