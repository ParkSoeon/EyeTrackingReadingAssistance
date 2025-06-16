from sqlalchemy.orm import Session
from ..models.play import Play

def create_play(db: Session,user_id, story_id):
    play = Play(
        user_id=user_id,
        story_id=story_id
    )
    db.add(play)
    db.commit()
    db.refresh(play)
    return play

def get_play_by_id(db: Session, play_id: str):
    return db.query(Play).filter(Play.id == play_id).first()