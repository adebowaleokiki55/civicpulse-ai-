from fastapi import APIRouter
from fastapi import HTTPException

from app.db.schemas import UserRegister
from app.db.schemas import UserLogin

from app.services.mock_auth import (
    register_user,
    login_user,
    get_current_user,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(user: UserRegister):
    created = register_user(
        user.full_name,
        user.email,
        user.password
    )

    if created is None:
        raise HTTPException(
            status_code=400,
            detail="Email already exists."
        )

    return {
        "message": "User registered successfully.",
        "user": {
            "id": created["id"],
            "full_name": created["full_name"],
            "email": created["email"],
            "role": created["role"]
        }
    }


@router.post("/login")
def login(user: UserLogin):
    logged = login_user(
        user.email,
        user.password
    )

    if logged is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials."
        )

    return logged


@router.get("/me")
def me():
    user = get_current_user()

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="No user logged in."
        )

    return {
        "id": user["id"],
        "full_name": user["full_name"],
        "email": user["email"],
        "role": user["role"]
    }