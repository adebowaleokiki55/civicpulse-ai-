from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class Issue(Base):
    __tablename__ = "issues"

    # =========================
    # Primary Key
    # =========================
    id = Column(Integer, primary_key=True, index=True)

    # =========================
    # Citizen Report
    # =========================
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)

    # =========================
    # AI Classification
    # =========================
    category = Column(String, default="Other")
    severity = Column(String, default="Medium")
    department = Column(String, default="General Services")

    # confidence score from AI (0-100)
    ai_confidence = Column(Integer, default=0)

    # =========================
    # Location
    # =========================
    location = Column(String, nullable=True)

    # =========================
    # Uploaded Image
    # =========================
    image = Column(String, nullable=True)

    # =========================
    # Government Workflow
    # =========================
    status = Column(String, default="Pending")

    assigned_to = Column(String, nullable=True)

    resolution_notes = Column(String, nullable=True)

    # =========================
    # Dates
    # =========================
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )