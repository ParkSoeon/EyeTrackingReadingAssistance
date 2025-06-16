from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from server.models.base import Base

DATABASE_URL = "postgresql://postgres:mysecretpassword@localhost:5432/mydb"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()