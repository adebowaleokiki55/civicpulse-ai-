from datetime import datetime

from app.models.issue import Issue

# ---------------------------------------------------
# Allowed Workflow Statuses
# ---------------------------------------------------

WORKFLOW = [
    "Pending",
    "Assigned",
    "In Progress",
    "Under Review",
    "Resolved",
    "Closed",
]

# Valid transitions
VALID_TRANSITIONS = {
    "Pending": ["Assigned"],
    "Assigned": ["In Progress"],
    "In Progress": ["Under Review"],
    "Under Review": ["Resolved"],
    "Resolved": ["Closed"],
    "Closed": [],
}


# ---------------------------------------------------
# AI Department Mapping
# ---------------------------------------------------

CATEGORY_TO_DEPARTMENT = {
    "Road Damage": "Public Works",
    "Pothole": "Public Works",
    "Streetlight": "Public Works",
    "Traffic": "Transportation",
    "Garbage": "Sanitation",
    "Waste": "Sanitation",
    "Water": "Water Department",
    "Sewage": "Water Department",
    "Flood": "Emergency Services",
    "Fire": "Emergency Services",
    "Crime": "Police",
    "Vandalism": "Police",
    "Noise": "Police",
    "Tree": "Parks",
    "Park": "Parks",
}


# ---------------------------------------------------
# Department Assignment
# ---------------------------------------------------

def assign_department(issue: Issue):

    category = issue.category or ""

    issue.department = CATEGORY_TO_DEPARTMENT.get(
        category,
        "General Services"
    )

    return issue.department


# ---------------------------------------------------
# Officer Assignment
# ---------------------------------------------------

def assign_officer(issue: Issue, officer: str):

    issue.assigned_to = officer

    if issue.status == "Pending":
        issue.status = "Assigned"

    return issue


# ---------------------------------------------------
# Status Update
# ---------------------------------------------------

def update_status(issue: Issue, new_status: str):

    current = issue.status

    allowed = VALID_TRANSITIONS.get(current, [])

    if new_status not in allowed:
        raise ValueError(
            f"Cannot move issue from '{current}' to '{new_status}'"
        )

    issue.status = new_status

    if new_status == "Resolved":
        issue.resolved_at = datetime.utcnow()

    return issue


# ---------------------------------------------------
# Resolution
# ---------------------------------------------------

def resolve_issue(issue: Issue, resolution: str):

    issue.resolution = resolution

    update_status(issue, "Resolved")

    return issue


# ---------------------------------------------------
# Government Notes
# ---------------------------------------------------

def add_note(issue: Issue, note: str):

    if issue.notes:

        issue.notes += "\n\n" + note

    else:

        issue.notes = note

    return issue