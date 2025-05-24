from pydantic import BaseModel
from datetime import datetime
import uuid

class ChoiceCreate(BaseModel):
    play_id: uuid.UUID
    story_id: str
    scene_key: str
    choice_id: str

class ChoiceRead(BaseModel):
    id: int
    play_id: uuid.UUID
    story_id: str
    scene_key: str
    choice_id: str
    selected_at: datetime

    class Config:
        orm_mode = True