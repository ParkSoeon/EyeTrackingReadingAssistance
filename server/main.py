from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.routers import user, chat, choice, play, stroies

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:5173",  # React 개발 서버
    "http://localhost:3000",  # React 프로덕션 서버 (필요한 경우)
    "http://127.0.0.1:5173",  # React 개발 서버 (대체 주소)
    "http://127.0.0.1:3000",  # React 프로덕션 서버 (대체 주소)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(chat.router)
app.include_router(choice.router)
app.include_router(play.router)
app.include_router(stroies.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
