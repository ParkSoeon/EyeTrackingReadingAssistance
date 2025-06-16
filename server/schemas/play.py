from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import uuid
from .choice import ChoiceRead

class PlayCreate(BaseModel):
    story_id: str
    
class PlayRead(BaseModel):
    id: uuid.UUID
    started_at: datetime
    ended_at: Optional[datetime]
    status: str
    choices: Optional[List[ChoiceRead]] = []

    class Config:
        orm_mode = True