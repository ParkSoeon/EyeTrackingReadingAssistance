from fastapi import APIRouter, Depends, HTTPException, status
from .user import oauth2_scheme, decode_token
from typing import List
from ..schemas.choice import ChoiceCreate
from sqlalchemy.orm import Session
from ..crud.database import get_db
from ..crud.choice import create_choices
from fastapi.responses import FileResponse

router = APIRouter(prefix="/stories", tags=["stories"])

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


@router.get("/")
async def get_stories():
    return stories

@router.get("/{story_filename}")
async def story_download(
    story_filename: str, 
    token: str = Depends(oauth2_scheme)
):
    user_id = decode_token(token)

    file_path = f"static/stories/{story_filename}.json"
    
    try:
        print(f"Attempting to access file: {file_path}")
        return FileResponse(file_path, media_type="application/json")
    except Exception:
        raise HTTPException(status_code=404, detail="Story not found")