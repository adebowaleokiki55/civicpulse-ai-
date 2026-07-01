from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


class IssueCreate(BaseModel):
    title: str
    description: str
    location: str


class IssueResponse(BaseModel):
    id: int

    title: str

    description: str

    location: str

    category: Optional[str]

    department: Optional[str]

    priority: Optional[str]

    status: str

    image_path: Optional[str]

    ai_summary: Optional[str]

    verified: bool

    created_at: datetime

    class Config:
        from_attributes = True