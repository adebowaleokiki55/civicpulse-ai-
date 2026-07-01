from google import genai
from app.services.routing import route_department
from app.config import settings
import re

# =========================
# GEMINI SETUP
# =========================

API_KEY = settings.GEMINI_API_KEY
if not API_KEY:
    raise ValueError("GEMINI_API_KEY is missing")

client = genai.Client(api_key=API_KEY)


# =========================
# CATEGORY MODEL (DOMAIN KNOWLEDGE)
# =========================

CATEGORIES = [
    "Road", "Flood", "Waste", "Electricity",
    "Water", "Security", "Health", "Other"
]

KEYWORDS = {
    "Electricity": [
        "transformer", "no light", "blackout", "power outage",
        "nepa", "bedc", "ekedc", "power cut",
        "bad transformer", "spoilt transformer", "no electricity"
    ],
    "Road": ["pothole", "road", "accident", "traffic", "bridge"],
    "Flood": ["flood", "drainage", "overflow", "waterlogged"],
    "Waste": ["trash", "waste", "garbage", "dump"],
    "Water": ["pipe", "water", "leak", "tap", "borehole"],
    "Security": ["robbery", "theft", "attack", "violence"],
    "Health": ["hospital", "sick", "ambulance", "disease"]
}

HIGH_SEVERITY = [
    "blackout", "no light", "no electricity",
    "transformer", "fire", "collapse",
    "robbery", "attack", "violence"
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
        if any(w in text for w in words):
            category = cat
            break

    if any(w in text for w in HIGH_SEVERITY):
        severity = "High"

    return category, severity


def extract_int(text: str, default=50):
    match = re.findall(r"\d+", text)
    return int(match[0]) if match else default


# =========================
# AI ENGINE (GEMINI)
# =========================

def ai_engine(text: str):
    prompt = f"""
You are a strict Nigerian civic classification system.

Classify the issue below:

"{text}"

RULES:
- Choose ONLY from: Road, Flood, Waste, Electricity, Water, Security, Health, Other
- Do NOT invent categories
- Context: Nigerian infrastructure (NEPA, transformers, drainage, roads)

Return format ONLY:
Category: ...
Severity: Low | Medium | High
Confidence: 0-100
"""

    try:
        res = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text_out = (res.text or "").strip()

        category = None
        severity = "Medium"
        confidence = 50

        for line in text_out.split("\n"):
            l = line.lower()

            if "category" in l:
                category = line.split(":")[-1].strip().title()

            if "severity" in l:
                severity = line.split(":")[-1].strip().title()

            if "confidence" in l:
                confidence = extract_int(line, 50)

        return category, severity, confidence

    except Exception:
        return None, None, 40


# =========================
# FINAL ORCHESTRATOR
# =========================

def analyze_issue(title: str, description: str):
    """
    Production-grade civic AI pipeline
    """

    # 1. Normalize input
    text = normalize(title, description)

    # 2. Rule engine (fast + deterministic)
    rule_category, rule_severity = rule_engine(text)

    # 3. AI engine (semantic reasoning)
    ai_category, ai_severity, confidence = ai_engine(text)

    # =========================
    # 4. DECISION LOGIC (CRITICAL)
    # =========================

    category = rule_category or ai_category or "Other"
    severity = rule_severity or ai_severity or "Medium"

    # =========================
    # 5. HARD OVERRIDES (GOV LOGIC)
    # =========================

    if any(w in text for w in KEYWORDS["Electricity"]):
        category = "Electricity"
        severity = "High"
        confidence = max(confidence, 90)

    if any(w in text for w in HIGH_SEVERITY):
        severity = "High"

    # =========================
    # 6. FINAL FALLBACKS
    # =========================

    if not category:
        category = "Other"

    if not severity:
        severity = "Medium"

    # =========================
    # 7. ROUTING
    # =========================

    department = route_department(category)

    return category, severity, department, confidence


'''
Most of the people  
i know are people that have not eaten i
if you notice that the people in th country are not 
really interested 
'''