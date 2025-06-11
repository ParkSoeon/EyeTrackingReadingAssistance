from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import uuid
from crud.database import Base

class User_Answer(Base):
    __tablename__ = "user_answers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    play_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("plays.id"))

    question_number: Mapped[int] = mapped_column(Integer)
    correct_answer: Mapped[str] = mapped_column(String(500))
    user_answer: Mapped[str] = mapped_column(String(500))
    # is_correct: Mapped[bool] = mapped_column(Boolean, nullable=True)
