from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserCreate
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)


def create_user(db: Session, user: UserCreate):
    hashed_password = hash_password(user.password)
    db_user = User(username=user.username, password_hash=hashed_password)

    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()