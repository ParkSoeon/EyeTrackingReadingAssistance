from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from sqlalchemy import String, DateTime, ForeignKey
from .base import Base
import uuid

class Choice(Base):
    __tablename__ = "choices"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    play_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("plays.id"))
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    story_id: Mapped[str] = mapped_column(String(50))
    scene_key: Mapped[str] = mapped_column(String(50))
    choice_id: Mapped[str] = mapped_column(String(50))
    selected_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    play: Mapped["Play"] = relationship("Play", back_populates="choices")