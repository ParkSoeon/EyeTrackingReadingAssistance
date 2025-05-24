from pydantic import BaseModel
from typing import Optional
import uuid

class UserAnswerCreate(BaseModel):
    user_id: int
    play_id: uuid.UUID
    question_number: int
    correct_answer: str
    user_answer: str

class UserAnswerRead(BaseModel):
    id: int
    user_id: int
    play_id: uuid.UUID
    question_number: int
    correct_answer: str
    user_answer: str

    class Config:
        orm_mode = True
