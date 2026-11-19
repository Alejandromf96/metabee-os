from datetime import datetime, timedelta, timezone

import jwt
from sqlalchemy import select

from app.core.config import settings
from app.modules.auth.models import User

USER = {"email": "test@example.com", "password": "clave12345"}


def register(client, data=None):
    return client.post("/auth/register", json=data or USER)


def login(client, data=None):
    return client.post("/auth/login", json=data or USER)


def auth_header(client):
    register(client)
    token = login(client).json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


# ---------- Registro ----------


def test_register_ok(client):
    response = register(client)
    assert response.status_code == 201
    body = response.json()
    assert body["email"] == USER["email"]
    assert "id" in body
    assert "password" not in body
    assert "hashed_password" not in body


def test_register_normalizes_email(client):
    response = register(client, {"email": "Test@Example.COM", "password": "clave12345"})
    assert response.status_code == 201
    assert response.json()["email"] == "test@example.com"


def test_register_duplicate_email(client):
    register(client)
    response = register(client)
    assert response.status_code == 409


def test_register_duplicate_email_different_case(client):
    register(client)
    response = register(client, {"email": "TEST@example.com", "password": "clave12345"})
    assert response.status_code == 409


def test_register_short_password(client):
    response = register(client, {"email": "test@example.com", "password": "corta"})
    assert response.status_code == 422


def test_register_invalid_email(client):
    response = register(client, {"email": "no-es-un-correo", "password": "clave12345"})
    assert response.status_code == 422


def test_password_is_hashed(client, db_session):
    register(client)
    user = db_session.scalar(select(User))
    assert user.hashed_password != USER["password"]
    assert user.hashed_password.startswith("$argon2id$")


# ---------- Login ----------


def test_login_ok(client):
    register(client)
    response = login(client)
    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"
    assert body["access_token"]


def test_login_wrong_password(client):
    register(client)
    response = login(client, {"email": USER["email"], "password": "clave_incorrecta"})
    assert response.status_code == 401


def test_login_unknown_email_same_message(client):
    register(client)
    wrong_password = login(client, {"email": USER["email"], "password": "clave_incorrecta"})
    unknown_email = login(client, {"email": "otro@example.com", "password": "clave12345"})
    assert unknown_email.status_code == 401
    assert unknown_email.json()["detail"] == wrong_password.json()["detail"]


# ---------- /auth/me ----------


def test_me_ok(client):
    response = client.get("/auth/me", headers=auth_header(client))
    assert response.status_code == 200
    assert response.json()["email"] == USER["email"]


def test_me_without_token(client):
    response = client.get("/auth/me")
    assert response.status_code in (401, 403)


def test_me_invalid_token(client):
    response = client.get("/auth/me", headers={"Authorization": "Bearer token.falso.xyz"})
    assert response.status_code == 401


def test_me_expired_token(client):
    user = register(client).json()
    expired = jwt.encode(
        {"sub": user["id"], "exp": datetime.now(timezone.utc) - timedelta(minutes=1)},
        settings.secret_key,
        algorithm=settings.algorithm,
    )
    response = client.get("/auth/me", headers={"Authorization": f"Bearer {expired}"})
    assert response.status_code == 401