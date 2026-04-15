from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://postgres:root@localhost:5432/fabric_db"

engine = create_engine(
    DATABASE_URL,
    echo=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


# ✅ ADD THIS FUNCTION (you are missing this)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()