from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Float,
    DateTime,
)
from datetime import datetime

from app.db.database import Base


# ==========================
# User Model
# ==========================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(120), unique=True, index=True, nullable=False)

    password = Column(String(255), nullable=False)

    role = Column(String(30), default="citizen")

    created_at = Column(DateTime, default=datetime.utcnow)


# ==========================
# Report Model
# ==========================

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    description = Column(Text, nullable=False)

    category = Column(String(100), nullable=False)

    latitude = Column(Float, nullable=True)

    longitude = Column(Float, nullable=True)

    address = Column(String(255), nullable=True)

    image_paths = Column(Text, nullable=True)

    status = Column(String(50), default="Pending")

    department = Column(String(100), nullable=True)

    ai_summary = Column(Text, nullable=True)

    severity = Column(String(30), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)