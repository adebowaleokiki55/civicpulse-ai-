from pathlib import Path
from typing import List

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
    status,
)

from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.issue import Issue
from app.schemas.issue import IssueResponse
from app.services.ai import analyze_issue

# image service is OPTIONAL now (safe import)
try:
    from app.services.image_service import save_image, delete_image
except Exception:
    save_image = None
    delete_image = None


router = APIRouter(prefix="/issues", tags=["Issues"])


# =====================================================
# CREATE ISSUE
# =====================================================

@router.post("/", response_model=IssueResponse, status_code=status.HTTP_201_CREATED)
def create_issue(
    title: str = Form(...),
    description: str = Form(...),
    location: str | None = Form(None),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
):
    """
    Full workflow:
    - Save image (optional)
    - AI classification
    - Department routing
    - Store in DB
    """

    # -------------------------
    # SAFE IMAGE HANDLING
    # -------------------------
    image_filename = None

    if image:
        try:
            if save_image:
                image_filename = save_image(image)
            else:
                image_filename = image.filename
        except Exception:
            image_filename = None

    # -------------------------
    # AI ANALYSIS (SAFE)
    # -------------------------
    try:
        category, severity, department = analyze_issue(description)
        confidence = 85  # fallback safe score
    except Exception:
        category, severity, department = "Other", "Medium", "General Services"
        confidence = 50

    # -------------------------
    # CREATE ISSUE
    # -------------------------
    issue = Issue(
        title=title,
        description=description,
        location=location,
        image=image_filename,
        category=category,
        severity=severity,
        department=department,
        ai_confidence=confidence,
        status="Pending",
        assigned_to=None,
        resolution_notes=None,
    )

    db.add(issue)
    db.commit()
    db.refresh(issue)

    return issue


# =====================================================
# GET ALL ISSUES
# =====================================================

@router.get("/", response_model=List[IssueResponse])
def get_all_issues(db: Session = Depends(get_db)):
    return db.query(Issue).order_by(Issue.created_at.desc()).all()


# =====================================================
# GET SINGLE ISSUE
# =====================================================

@router.get("/{issue_id}", response_model=IssueResponse)
def get_issue(issue_id: int, db: Session = Depends(get_db)):
    issue = db.get(Issue, issue_id)

    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    return issue


# =====================================================
# DELETE ISSUE
# =====================================================

@router.delete("/{issue_id}")
def delete_issue(issue_id: int, db: Session = Depends(get_db)):
    issue = db.get(Issue, issue_id)

    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    # delete image safely
    if delete_image:
        try:
            delete_image(issue.image)
        except Exception:
            pass

    db.delete(issue)
    db.commit()

    return {"message": "Issue deleted successfully"}


# =====================================================
# STATUS FILTER (CASE SAFE)
# =====================================================

@router.get("/status/{status_name}", response_model=List[IssueResponse])
def get_issues_by_status(status_name: str, db: Session = Depends(get_db)):

    issues = (
        db.query(Issue)
        .filter(Issue.status.ilike(status_name))
        .order_by(Issue.created_at.desc())
        .all()
    )

    return issues


# =====================================================
# DEPARTMENT FILTER
# =====================================================

@router.get("/department/{department}", response_model=List[IssueResponse])
def get_issues_by_department(department: str, db: Session = Depends(get_db)):

    issues = (
        db.query(Issue)
        .filter(Issue.department.ilike(department))
        .order_by(Issue.created_at.desc())
        .all()
    )

    return issues


# =====================================================
# SEARCH
# =====================================================

@router.get("/search/{keyword}", response_model=List[IssueResponse])
def search_issues(keyword: str, db: Session = Depends(get_db)):

    keyword = f"%{keyword}%"

    issues = (
        db.query(Issue)
        .filter(
            (Issue.title.ilike(keyword)) |
            (Issue.description.ilike(keyword)) |
            (Issue.category.ilike(keyword)) |
            (Issue.department.ilike(keyword))
        )
        .order_by(Issue.created_at.desc())
        .all()
    )

    return issues


# =====================================================
# RECENT ISSUES
# =====================================================

@router.get("/recent/list", response_model=List[IssueResponse])
def get_recent_issues(limit: int = 10, db: Session = Depends(get_db)):

    return (
        db.query(Issue)
        .order_by(Issue.created_at.desc())
        .limit(limit)
        .all()
    )


# =====================================================
# HIGH SEVERITY
# =====================================================

@router.get("/severity/high", response_model=List[IssueResponse])
def get_high_priority_issues(db: Session = Depends(get_db)):

    return (
        db.query(Issue)
        .filter(Issue.severity == "High")
        .order_by(Issue.created_at.desc())
        .all()
    )


# =====================================================
# STATS
# =====================================================

@router.get("/stats/summary")
def issue_statistics(db: Session = Depends(get_db)):

    return {
        "total": db.query(Issue).count(),
        "pending": db.query(Issue).filter(Issue.status == "Pending").count(),
        "assigned": db.query(Issue).filter(Issue.status == "Assigned").count(),
        "in_progress": db.query(Issue).filter(Issue.status == "In Progress").count(),
        "resolved": db.query(Issue).filter(Issue.status == "Resolved").count(),
        "rejected": db.query(Issue).filter(Issue.status == "Rejected").count(),
    }


# =====================================================
# IMAGE SERVING
# =====================================================

@router.get("/image/{filename}")
def get_uploaded_image(filename: str):

    file_path = Path("uploads") / filename

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Image not found")

    return FileResponse(file_path)


# =====================================================
# HEALTH CHECK
# =====================================================

@router.get("/ping")
def ping():
    return {"status": "ok", "service": "issues"}