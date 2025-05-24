from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from crud import user_message as crud_user_message
from schemas import user_message as schema_user_message
from crud.database import get_db

router = APIRouter(
    prefix="/user_messages",
    tags=["user_messages"]
)

@router.post("/", response_model=schema_user_message.UserMessageRead)
def create_message(message: schema_user_message.UserMessageCreate, db: Session = Depends(get_db)):
    return crud_user_message.create_user_message(db, message)

@router.get("/play/{play_id}", response_model=List[schema_user_message.UserMessageRead])
def read_messages_by_play(play_id: uuid.UUID, db: Session = Depends(get_db)):
    messages = crud_user_message.get_messages_by_play_id(db, play_id)
    if not messages:
        raise HTTPException(status_code=404, detail="Messages not found for the given play_id")
    return messages

@router.get("/user/{user_id}", response_model=List[schema_user_message.UserMessageRead])
def read_messages_by_user(user_id: int, db: Session = Depends(get_db)):
    messages = crud_user_message.get_messages_by_user_id(db, user_id)
    if not messages:
        raise HTTPException(status_code=404, detail="Messages not found for the given user_id")
    return messages
