try:

    import google.generativeai as genai

except ImportError:

    genai = None

from app.services.routing import route_department

from app.config import settings

import re



# =========================

# GEMINI SETUP

# =========================



API_KEY = settings.GEMINI_API_KEY



if API_KEY and genai is not None:

    genai.configure(api_key=API_KEY)

    model = genai.GenerativeModel("gemini-2.5-flash")

else:

    model = None



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



def normalize(title: str, description: str, location: str | None = None):

    return f"{title or ''} {description or ''} {location or ''}".strip().lower()





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



def clean_institution(value: str | None):

    if not value:

        return None

    value = value.strip()

    if value.lower() in {"none", "unknown", "n/a", "not sure"}:

        return None

    return value


def ai_engine(text: str, location: str | None = None):

    if model is None:

        if genai is None:

            print("Gemini skipped: google-generativeai package is not installed")

        else:

            print("Gemini skipped: GEMINI_API_KEY is missing")

        return None, None, 40, None

    prompt = f"""

You are a Nigerian civic issue classifier and government routing assistant.



Classify this report and identify the most appropriate Nigerian government institution/parastatal to handle it.



{text}

Location, if provided: {location or "Unknown"}



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

Institution: the specific Nigerian government ministry, agency, commission, authority, force, board, or parastatal responsible.

Prefer specific institutions such as FERMA, NEMA, NERC, NCDC, Nigeria Police Force, Federal Fire Service, State Ministry of Works, State Ministry of Environment, State Waste Management Authority, State Water Corporation, State Ministry of Health, or a location-specific agency when the location makes it clear.

If the report is local/state-level and no state is known, use the appropriate "State ..." institution.



Format:



Category: ...

Severity: ...

Confidence: ...

Institution: ...

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

        institution = None



        for line in output.splitlines():



            lower = line.lower()



            if lower.startswith("category"):

                category = line.split(":")[-1].strip().title()



            elif lower.startswith("severity"):

                severity = line.split(":")[-1].strip().title()



            elif lower.startswith("confidence"):

                confidence = extract_int(line)



            elif lower.startswith("institution") or lower.startswith("parastatal") or lower.startswith("agency"):

                institution = clean_institution(line.split(":", 1)[-1])



        return category, severity, confidence, institution



    except Exception as e:



        print("Gemini Error:", e)



        return None, None, 40, None





# =========================

# FINAL PIPELINE

# =========================



def analyze_issue(title: str, description: str, location: str | None = None):



    text = normalize(title, description, location)



    rule_category, rule_severity = rule_engine(text)



    ai_category, ai_severity, confidence, ai_institution = ai_engine(text, location)



    category = rule_category or ai_category or "Other"



    severity = rule_severity or ai_severity or "Medium"



    if any(word in text for word in KEYWORDS["Electricity"]):

        category = "Electricity"

        severity = "High"

        confidence = max(confidence, 90)



    if any(word in text for word in HIGH_SEVERITY):

        severity = "High"



    department = ai_institution or route_department(category, text, location)



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
