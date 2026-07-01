from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.issue import Issue
from app.schemas.issue import (
    IssueResponse,
    AssignIssue,
    StatusUpdate,
    ResolutionUpdate,
)

router = APIRouter(
    prefix="/government",
    tags=["Government"],
)


# ======================================================
# Dashboard
# ======================================================

@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
):

    total = db.query(Issue).count()

    pending = db.query(Issue).filter(
        Issue.status == "Pending"
    ).count()

    assigned = db.query(Issue).filter(
        Issue.status == "Assigned"
    ).count()

    in_progress = db.query(Issue).filter(
        Issue.status == "In Progress"
    ).count()

    resolved = db.query(Issue).filter(
        Issue.status == "Resolved"
    ).count()

    rejected = db.query(Issue).filter(
        Issue.status == "Rejected"
    ).count()

    high_priority = db.query(Issue).filter(
    Issue.severity == "High"
).count()

    return {
    "total_issues": total,
    "pending": pending,
    "assigned": assigned,
    "in_progress": in_progress,
    "resolved": resolved,
    "rejected": rejected,
    "high_priority": high_priority,
}

# ======================================================
# Get Pending Issues
# ======================================================

@router.get(
    "/pending",
    response_model=List[IssueResponse],
)
def pending_issues(
    db: Session = Depends(get_db),
):

    return (
        db.query(Issue)
        .filter(Issue.status == "Pending")
        .all()
    )


# ======================================================
# Get Assigned Issues
# ======================================================

@router.get(
    "/assigned",
    response_model=List[IssueResponse],
)
def assigned_issues(
    db: Session = Depends(get_db),
):

    return (
        db.query(Issue)
        .filter(Issue.status == "Assigned")
        .all()
    )


# ======================================================
# Get In Progress
# ======================================================

@router.get(
    "/in-progress",
    response_model=List[IssueResponse],
)
def in_progress(
    db: Session = Depends(get_db),
):

    return (
        db.query(Issue)
        .filter(Issue.status == "In Progress")
        .all()
    )


# ======================================================
# Get Resolved
# ======================================================

@router.get(
    "/resolved",
    response_model=List[IssueResponse],
)
def resolved(
    db: Session = Depends(get_db),
):

    return (
        db.query(Issue)
        .filter(Issue.status == "Resolved")
        .all()
    )


# ======================================================
# Assign Officer
# ======================================================

@router.put(
    "/assign/{issue_id}",
    response_model=IssueResponse,
)
def assign_issue(
    issue_id: int,
    assignment: AssignIssue,
    db: Session = Depends(get_db),
):

    issue = db.get(Issue, issue_id)

    if issue is None:
        raise HTTPException(
            status_code=404,
            detail="Issue not found"
        )

    issue.assigned_to = assignment.assigned_to
    issue.status = "Assigned"

    db.commit()
    db.refresh(issue)

    return issue


# ======================================================
# Update Status
# ======================================================

@router.put(
    "/status/{issue_id}",
    response_model=IssueResponse,
)
def update_status(
    issue_id: int,
    update: StatusUpdate,
    db: Session = Depends(get_db),
):

    issue = db.get(Issue, issue_id)

    if issue is None:
        raise HTTPException(
            status_code=404,
            detail="Issue not found"
        )

    issue.status = update.status

    db.commit()
    db.refresh(issue)

    return issue


# ======================================================
# Add Resolution Notes
# ======================================================

@router.put(
    "/resolution/{issue_id}",
    response_model=IssueResponse,
)
def add_resolution(
    issue_id: int,
    resolution: ResolutionUpdate,
    db: Session = Depends(get_db),
):

    issue = db.get(Issue, issue_id)

    if issue is None:
        raise HTTPException(
            status_code=404,
            detail="Issue not found"
        )

    issue.resolution_notes = resolution.resolution_notes

    db.commit()
    db.refresh(issue)

    return issue


# ======================================================
# Resolve Issue
# ======================================================

@router.put(
    "/resolve/{issue_id}",
    response_model=IssueResponse,
)
def resolve_issue(
    issue_id: int,
    resolution: ResolutionUpdate,
    db: Session = Depends(get_db),
):

    issue = db.get(Issue, issue_id)

    if issue is None:
        raise HTTPException(
            status_code=404,
            detail="Issue not found"
        )

    issue.status = "Resolved"
    issue.resolution_notes = resolution.resolution_notes
    issue.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(issue)

    return issue


# ======================================================
# Reject Issue
# ======================================================

@router.put(
    "/reject/{issue_id}",
    response_model=IssueResponse,
)
def reject_issue(
    issue_id: int,
    resolution: ResolutionUpdate,
    db: Session = Depends(get_db),
):

    issue = db.get(Issue, issue_id)

    if issue is None:
        raise HTTPException(
            status_code=404,
            detail="Issue not found"
        )

    issue.status = "Rejected"
    issue.resolution_notes = resolution.resolution_notes
    issue.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(issue)

    return issue


# ======================================================
# Department Queue
# ======================================================

@router.get(
    "/department/{department}",
    response_model=List[IssueResponse],
)
def department_queue(
    department: str,
    db: Session = Depends(get_db),
):

    return (
        db.query(Issue)
        .filter(Issue.department.ilike(department))
        .all()
    )


# ======================================================
# Officer Queue
# ======================================================

@router.get(
    "/officer/{officer}",
    response_model=List[IssueResponse],
)
def officer_queue(
    officer: str,
    db: Session = Depends(get_db),
):

    return (
        db.query(Issue)
        .filter(Issue.assigned_to.ilike(officer))
        .all()
    )


# ======================================================
# Health Check
# ======================================================

@router.get("/ping")
def ping():

    return {
        "status": "ok",
        "service": "government"
    }
