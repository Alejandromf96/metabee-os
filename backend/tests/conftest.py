import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.database.session import Base, get_db
from app.main import app
from app.modules.auth import models  # noqa: F401

TEST_DB_NAME = "metabee_test"

real_url = make_url(settings.database_url)
test_url = real_url.set(database=TEST_DB_NAME)

# Seguro de vida: jamás operar sobre la base real
assert test_url.database != real_url.database
assert test_url.database.endswith("_test")

engine = create_engine(test_url, pool_pre_ping=True)
TestingSession = sessionmaker(bind=engine, autoflush=False, autocommit=False)


@pytest.fixture
def database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db_session(database):
    db = TestingSession()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def client(database):
    def override_get_db():
        db = TestingSession()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()