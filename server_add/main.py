from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server_add.routers import user, chat, choice, play, user_answer, user_message

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user.router)
app.include_router(chat.router)
app.include_router(choice.router)
app.include_router(play.router)
app.include_router(user_answer.router)
app.include_router(user_message.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
