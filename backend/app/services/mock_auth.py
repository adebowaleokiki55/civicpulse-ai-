from typing import Dict

# Simple in-memory "database"
mock_users: Dict[str, dict] = {}


def register_user(full_name: str, email: str, password: str):

    if email in mock_users:
        return None

    user = {
        "id": len(mock_users) + 1,
        "full_name": full_name,
        "email": email,
        "password": password,
        "role": "citizen"
    }

    mock_users[email] = user

    return user


def login_user(email: str, password: str):

    user = mock_users.get(email)

    if not user:
        return None

    if user["password"] != password:
        return None

    return {
        "access_token": "mock-token",
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "full_name": user["full_name"],
            "email": user["email"],
            "role": user["role"]
        }
    }


def get_current_user():

    if len(mock_users) == 0:
        return None

    return list(mock_users.values())[0]