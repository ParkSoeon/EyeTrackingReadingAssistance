from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from sqlalchemy import String, Integer, DateTime, create_engine, UniqueConstraint
from crud.database import Base

class User(Base):
    __tablename__ = "users"
    __table_args__ = (UniqueConstraint("username", name="uq_username"),)

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)  
    gender: Mapped[str] = mapped_column(String(10), nullable=False)  # 성별, 예: 'male', 'female', 'other'
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    
