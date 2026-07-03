import google.generativeai as genai
from app.services.routing import route_department
from app.config import settings
import re

# =========================
# GEMINI SETUP
# =========================

API_KEY = settings.GEMINI_API_KEY

if not API_KEY:
    raise ValueError("GEMINI_API_KEY is missing")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

# =========================
# CATEGORY MODEL (DOMAIN KNOWLEDGE)
# =========================

CATEGORIES = [
    "Road",
    "Flood",
    "Waste",
    "Electricity",
    "Water",
    "Security",
    "Health",
    "Other",
]

KEYWORDS = {
    "Electricity": [
        "transformer",
        "no light",
        "blackout",
        "power outage",
        "nepa",
        "bedc",
        "ekedc",
        "power cut",
        "bad transformer",
        "spoilt transformer",
        "no electricity",
    ],
    "Road": [
        "pothole",
        "road",
        "accident",
        "traffic",
        "bridge",
    ],
    "Flood": [
        "flood",
        "drainage",
        "overflow",
        "waterlogged",
    ],
    "Waste": [
        "trash",
        "waste",
        "garbage",
        "dump",
    ],
    "Water": [
        "pipe",
        "water",
        "leak",
        "tap",
        "borehole",
    ],
    "Security": [
        "robbery",
        "theft",
        "attack",
        "violence",
    ],
    "Health": [
        "hospital",
        "sick",
        "ambulance",
        "disease",
    ],
}

HIGH_SEVERITY = [
    "blackout",
    "no light",
    "no electricity",
    "transformer",
    "fire",
    "collapse",
    "robbery",
    "attack",
    "violence",
]

# =========================
# HELPERS
# =========================

def normalize(title: str, description: str):
    return f"{title or ''} {description or ''}".strip().lower()


def rule_engine(text: str):
    category = None
    severity = "Low"

    for cat, words in KEYWORDS.items():
        if any(word in text for word in words):
            category = cat
            break

    if any(word in text for word in HIGH_SEVERITY):
        severity = "High"

    return category, severity


def extract_int(text: str, default=50):
    match = re.findall(r"\d+", text)
    return int(match[0]) if match else default


# =========================
# GEMINI AI
# =========================

def ai_engine(text: str):
    prompt = f"""
You are a Nigerian civic issue classifier.

Classify this report.

{text}

Rules:
- Return ONLY one category from:
Road
Flood
Waste
Electricity
Water
Security
Health
Other

Also return:

Severity: Low | Medium | High

Confidence: 0-100

Format:

Category: ...
Severity: ...
Confidence: ...
"""

    try:

        response = model.generate_content(prompt)

        output = response.text.strip()

        print("\n========== GEMINI RAW RESPONSE ==========")
        print(output)
        print("=========================================\n")

        category = None
        severity = "Medium"
        confidence = 50

        for line in output.splitlines():

            lower = line.lower()

            if lower.startswith("category"):
                category = line.split(":")[-1].strip().title()

            elif lower.startswith("severity"):
                severity = line.split(":")[-1].strip().title()

            elif lower.startswith("confidence"):
                confidence = extract_int(line)

        return category, severity, confidence

    except Exception as e:

        print("Gemini Error:", e)

        return None, None, 40


# =========================
# FINAL PIPELINE
# =========================

def analyze_issue(title: str, description: str):

    text = normalize(title, description)

    rule_category, rule_severity = rule_engine(text)

    ai_category, ai_severity, confidence = ai_engine(text)

    category = rule_category or ai_category or "Other"

    severity = rule_severity or ai_severity or "Medium"

    if any(word in text for word in KEYWORDS["Electricity"]):
        category = "Electricity"
        severity = "High"
        confidence = max(confidence, 90)

    if any(word in text for word in HIGH_SEVERITY):
        severity = "High"

    department = route_department(category)

    print("\n========== FINAL AI RESULT ==========")
    print("Title:", title)
    print("Rule Category:", rule_category)
    print("AI Category:", ai_category)
    print("Final Category:", category)
    print("Severity:", severity)
    print("Department:", department)
    print("Confidence:", confidence)
    print("=====================================\n")

    return (
        category,
        severity,
        department,
        confidence,
    )