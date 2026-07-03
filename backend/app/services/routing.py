def route_department(category: str, text: str = "", location: str | None = None) -> str:
    """
    Return a concrete Nigerian public institution/parastatal for the issue.

    The field is still called "department" in the database/frontend for backwards
    compatibility, but the value is now the target government institution.
    """
    content = f"{text or ''} {location or ''}".lower()

    if category == "Road":
        if any(word in content for word in ["federal road", "highway", "expressway", "trunk"]):
            return "Federal Roads Maintenance Agency (FERMA)"
        return "State Ministry of Works and Infrastructure"

    if category == "Flood":
        if any(word in content for word in ["disaster", "evacuation", "emergency", "trapped"]):
            return "National Emergency Management Agency (NEMA)"
        return "State Ministry of Environment"

    if category == "Waste":
        if "lagos" in content:
            return "Lagos Waste Management Authority (LAWMA)"
        return "State Waste Management Authority"

    if category == "Electricity":
        if any(word in content for word in ["transformer", "cable", "wire", "pole", "no light", "blackout"]):
            return "Nigerian Electricity Regulatory Commission (NERC)"
        return "Federal Ministry of Power"

    if category == "Water":
        return "State Water Corporation"

    if category == "Security":
        if any(word in content for word in ["fire", "burning", "explosion"]):
            return "Federal Fire Service"
        return "Nigeria Police Force"

    if category == "Health":
        if any(word in content for word in ["outbreak", "cholera", "disease", "epidemic"]):
            return "Nigeria Centre for Disease Control and Prevention (NCDC)"
        return "State Ministry of Health"

    return "Federal Ministry of Special Duties and Intergovernmental Affairs"
