from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from ..crud.database import get_db
from ..crud.choice import create_choices, get_choices_by_play
from ..schemas.choice import ChoiceCreate, ChoiceRead
from .user import oauth2_scheme, decode_token

router = APIRouter(prefix="/choices", tags=["choices"])


@router.post("/", response_model=List[ChoiceCreate])
async def save_choices(choices: List[ChoiceCreate], token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user_id = decode_token(token)
    return create_choices(db, user_id, choices)