from fastapi import APIRouter, Depends, HTTPException
from routers.user import oauth2_scheme, decode_token
from sqlalchemy.orm import Session
from crud.database import get_db
from crud.play import get_play_by_id
from crud.choice import get_choices_by_play
import json

router = APIRouter(prefix="/report", tags=["report"])

# Mock data for stories
stories = [
    {
        "story_id": "golden_axe",
        "title": "황금 도끼",
        "description": "황금 도끼의 전설",
        "json_url": "http://localhost:8000/stories/golden_axe.json"
    },
    {
        "story_id": "pinocchio",
        "title": "피노키오 이야기",
        "description": "피노키오의 모험",
        "json_url": "http://localhost:8000/stories/pinocchio.json"
    },
    {
        "story_id": "hansel",
        "title": "헨젤과 그레텔",
        "description": "남매의 숲속 모험",
        "json_url": "http://localhost:8000/stories/hansel.json"
    },
    {
        "story_id": "red_riding",
        "title": "빨간 망토",
        "description": "빨간 망토 소녀 이야기",
        "json_url": "http://localhost:8000/stories/red_riding.json"
    }
]



@router.get("/{play_id}")
# async def story_download(play_id: str, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
async def story_download(play_id: str, db: Session = Depends(get_db)):

    # user_id = decode_token(token)

    play = get_play_by_id(db, play_id=play_id)
    choices = get_choices_by_play(db, play_id=play_id)
    user_choices = [choice.choice_id for choice in choices]
    # if not user_id:
    #     raise HTTPException(status_code=401, detail="Invalid token")
    # if play.user_id != user_id:
    #     raise HTTPException(status_code=403, detail="You do not have permission to access this play")
    if not play:
        raise HTTPException(status_code=404, detail="Play not found")
    if not choices:
        raise HTTPException(status_code=404, detail="Choices not found")

    file_path = f"static/stories/{play.story_id}.json"

    try:
        print(f"Attempting to access file: {file_path}")
        with open(file_path, 'r', encoding='utf-8') as f:
            story = json.load(f)
        current_scene = 'start'
        choice_history = []

        for choice_id in user_choices:
            scene = story[current_scene]
            scene_text = scene['text']
            
            # 해당 scene에서 사용자의 choice 찾기
            choice = next((c for c in scene['choices'] if c['id'] == choice_id), None)
            
            if choice:
                # 선택 정보 저장
                choice_history.append({
                    "situation": scene_text,
                    "selected_id": choice['id'],
                    "choice": choice['text'],
                    "reason": "",  # 선택 이유는 현재 구현에 없음
                    "counterpoint": choice['counterpoint'],
                    "resulting_scene": choice['next_scene']
                })
                # 다음 scene 이동
                current_scene = choice['next_scene']
            else:
                break

        return {
            "branches": choice_history,
        }

        
    except Exception:
        raise HTTPException(status_code=404, detail="Story not found")