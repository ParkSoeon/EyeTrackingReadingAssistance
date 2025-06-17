from sqlalchemy.orm import Session
from server.models.user import User
from server.schemas.user import UserCreate
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

def create_test_user(db: Session):
    test_username = "testuser"
    test_password = "test1234"
    test_name = "홍길동"
    hashed_password = hash_password(test_password)
    db_test_user = User(username=test_username, password_hash=hashed_password, name=test_name)
    try:
        db.add(db_test_user)
        db.commit()
        db.refresh(db_test_user)
        return db_test_user
    except IntegrityError:
        db.rollback
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Test user already exists (or IntegrityError)")