from sqlalchemy.orm import Session
from models.user_message import User_Message
from schemas.user_message import UserMessageCreate
from typing import List
import uuid

def create_user_message(db: Session, message: UserMessageCreate):
    db_message = User_Message(
        user_id=message.user_id,
        play_id=message.play_id,
        message_text=message.message_text,
        sent_at=message.sent_at
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_messages_by_play_id(db: Session, play_id: uuid.UUID) -> List[User_Message]:
    return db.query(User_Message).filter(User_Message.play_id == play_id).all()

def get_messages_by_user_id(db: Session, user_id: int) -> List[User_Message]:
    return db.query(User_Message).filter(User_Message.user_id == user_id).all()
