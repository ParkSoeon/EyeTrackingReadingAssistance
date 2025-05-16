from fastapi import APIRouter, Depends, HTTPException
from routers.user import oauth2_scheme, decode_token
from pydantic import BaseModel
from typing import List
import openai
from google import genai
import os

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    provider: str  # "openai", "gemini", etc.
    messages: List[Message]




def call_openai(messages):
    openai.api_key = os.environ["OPENAI_API_KEY"]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[m.dict() for m in messages],
        temperature=0.7
    )
    return response["choices"][0]["message"]["content"]

def to_gemini_format(messages: list[dict]) -> list[dict]:
    # "assistant" → "model" 로 role 변경
    return [
        {
            
            "role": "model" if m.role == "assistant" else "user" if m.role == "system" else m.role,
            "parts": [{"text": m.content}]
        }
        for m in messages
    ]

def call_gemini(messages):
    client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=messages,
    )
    # print(response.text)
    return response.text

@router.post("/chat")
async def chat(prompt: ChatRequest, token: str = Depends(oauth2_scheme)):
    username = decode_token(token)
    provider = prompt.provider.lower()
    default_prompt_1 = Message(role="system", content="너는 게임(인터랙티브동화)에서 사용자의 선택을 돕는 친구야\n 사용자의 선택 또는 생각이 올바른지 조언해줘\n 답변은 간결하게 해줘 \n 필요없는 기호와 말은 넣지마")
    default_prompt_2 = Message(role="assistant", content="알았어. 선택에 대한 조언을 간결하게 해줄게.\n")

    messages = [default_prompt_1, default_prompt_2] + prompt.messages
    # print(messages)

    if provider == "openai":
        response = call_openai(messages)
    elif provider == "gemini":
        formatted = to_gemini_format(messages)
        response = call_gemini(formatted)
    else:
        raise HTTPException(status_code=400, detail="지원하지 않는 provider")

    return {"response": response}