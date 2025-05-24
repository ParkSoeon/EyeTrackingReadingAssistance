from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    age: int
    gender: str

class UserOut(BaseModel):
    id: int
    username: str
    age: int
    gender: str

    class Config:
        orm_mode = True