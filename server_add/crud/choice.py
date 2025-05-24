from sqlalchemy.orm import Session
from models.choice import Choice
from schemas.choice import ChoiceCreate
from typing import List

def create_choices(db: Session,user_id, choice_data_list: List[ChoiceCreate]):
    choices = []
    for data in choice_data_list:
        choice = Choice(
            play_id=data.play_id,
            user_id=user_id,
            story_id=data.story_id,
            scene_key=data.scene_key,
            choice_id=data.choice_id,
            selected_at=data.selected_at if hasattr(data, "selected_at") else None
        )
        db.add(choice)
        choices.append(choice)
    db.commit()
    return choices

def get_choices_by_play(db: Session, play_id):
    return db.query(Choice).filter(Choice.play_id == play_id).all()