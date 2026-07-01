def route_department(category: str) -> str:
    mapping = {
        "Road": "Works Department",
        "Flood": "Water Resources",
        "Waste": "Sanitation",
        "Electricity": "Power Distribution",
        "Water": "Water Board",
        "Security": "Security Agency",
        "Health": "Health Department"
    }

    return mapping.get(category, "General Administration")