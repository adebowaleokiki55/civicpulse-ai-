from sqlalchemy.orm import Session

from app.models.issue import Issue


def create_issue(db: Session, data):
    issue = Issue(**data.dict())

    db.add(issue)
    db.commit()
    db.refresh(issue)

    return issue


def get_issues(db: Session):
    return db.query(Issue).all()


def get_issue(db: Session, issue_id: int):
    return db.query(Issue).filter(Issue.id == issue_id).first()


def update_status(db: Session, issue_id: int, status: str):
    issue = get_issue(db, issue_id)

    if not issue:
        return None

    issue.status = status

    db.commit()
    db.refresh(issue)

    return issue


def delete_issue(db: Session, issue_id: int):
    issue = get_issue(db, issue_id)

    if not issue:
        return None

    db.delete(issue)
    db.commit()

    return issue