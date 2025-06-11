from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from crud import user_answer as crud_user_answer
from schemas import user_answer as schema_user_answer
from crud.database import get_db

router = APIRouter(
    prefix="/user_answers",
    tags=["user_answers"]
)

@router.post("/", response_model=schema_user_answer.UserAnswerRead)
def create_answer(answer: schema_user_answer.UserAnswerCreate, db: Session = Depends(get_db)):
    return crud_user_answer.create_user_answer(db, answer)

@router.get("/play/{play_id}", response_model=List[schema_user_answer.UserAnswerRead])
def read_answers_by_play(play_id: uuid.UUID, db: Session = Depends(get_db)):
    answers = crud_user_answer.get_user_answers_by_play(db, play_id)
    if not answers:
        raise HTTPException(status_code=404, detail="Answers not found for the given play_id")
    return answers

@router.get("/user/{user_id}", response_model=List[schema_user_answer.UserAnswerRead])
def read_answers_by_user(user_id: int, db: Session = Depends(get_db)):
    answers = crud_user_answer.get_user_answers_by_user(db, user_id)
    if not answers:
        raise HTTPException(status_code=404, detail="Answers not found for the given user_id")
    return answers
