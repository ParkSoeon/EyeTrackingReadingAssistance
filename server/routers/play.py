from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud.play import create_play, get_play_by_id
from schemas.play import PlayRead, PlayCreate
from crud.database import get_db
from routers.user import oauth2_scheme, decode_token

router = APIRouter(prefix="/plays", tags=["plays"])

@router.post("/", response_model=PlayRead)
def create_new_play(play_data: PlayCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user_id = decode_token(token)

    return create_play(db, user_id, play_data.story_id)

@router.get("/{play_id}", response_model=PlayRead)
def read_play(play_id: str, db: Session = Depends(get_db)):
    play = get_play_by_id(db, play_id)
    if not play:
        raise HTTPException(status_code=404, detail="Play not found")
    return play