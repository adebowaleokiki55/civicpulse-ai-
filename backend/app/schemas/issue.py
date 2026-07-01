from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ======================================================
# Citizen Creates an Issue
# ======================================================

class IssueCreate(BaseModel):
    title: str
    description: str
    location: Optional[str] = None


# ======================================================
# Government Assigns an Officer
# ======================================================

class AssignIssue(BaseModel):
    assigned_to: str


# ======================================================
# Government Updates Status
# ======================================================

class StatusUpdate(BaseModel):
    status: str


# ======================================================
# Government Adds Notes
# ======================================================

class ResolutionUpdate(BaseModel):
    resolution_notes: str


# ======================================================
# Full Response Model
# ======================================================

class IssueResponse(BaseModel):
    id: int

    title: str
    description: str

    category: str
    severity: str
    department: str

    location: Optional[str] = None
    image: Optional[str] = None

    status: str
    assigned_to: Optional[str] = None
    resolution_notes: Optional[str] = None

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


# ======================================================
# Backwards Compatibility
# ======================================================

# Existing routes use IssueOut.
# Keep this alias so you don't have to rename everything immediately.
IssueOut = IssueResponse