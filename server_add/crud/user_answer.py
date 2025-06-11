from sqlalchemy.orm import Session
from models.user_answer import User_Answer
from schemas.user_answer import UserAnswerCreate
from typing import List
import uuid

def create_user_answer(db: Session, answer: UserAnswerCreate):
    db_answer = User_Answer(
        user_id=answer.user_id,
        play_id=answer.play_id,
        question_number=answer.question_number,
        correct_answer=answer.correct_answer,
        user_answer=answer.user_answer,
    )
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    return db_answer

#play_id 별 
def get_user_answers_by_play(db: Session, play_id: uuid.UUID):
    return db.query(User_Answer).filter(User_Answer.play_id == play_id).all()

#user_id 별 
def get_user_answers_by_user(db: Session, user_id: int):
    return db.query(User_Answer).filter(User_Answer.user_id == user_id).all()
