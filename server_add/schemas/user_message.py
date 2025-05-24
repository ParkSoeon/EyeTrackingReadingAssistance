from pydantic import BaseModel
from datetime import datetime
import uuid

class UserMessageBase(BaseModel):
    user_id: int
    play_id: uuid.UUID
    message_text: str
    sent_at: datetime | None = None  # 옵션, (없으면 서버 시간으로 처리)

class UserMessageCreate(UserMessageBase):
    pass

class UserMessageRead(UserMessageBase):
    id: int

    class Config:
        orm_mode = True
