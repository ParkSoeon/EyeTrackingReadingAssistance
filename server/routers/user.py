from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, Field, validator
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class User(BaseModel):
    username: str # = Field(..., min_length=3, max_length=20)
    password: str # = Field(..., min_length=8)

    # @validator("username")
    # def validate_username(cls, v):
    #     if not v.isalnum():
    #         raise ValueError("Username must be alphanumeric.")
    #     return v

class UserInDB(BaseModel):
    username: str
    hashed_password: str

class UserOut(BaseModel):
    username: str

fake_users_db = {
    "test": UserInDB(username="test", hashed_password=pwd_context.hash("test"))
}

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_user(username: str):
    return fake_users_db.get(username)

def decode_token(token: str):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except JWTError:
        raise credentials_exception


@router.post("/register", status_code=201)
async def register(user: User):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="User already registered")
    hashed_password = hash_password(user.password)
    fake_users_db[user.username] = UserInDB(username=user.username, hashed_password=hashed_password)
    return {"msg": "User registered successfully"}

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": token, "token_type": "bearer"}

@router.get("/users/me", response_model=UserOut)
async def read_users_me(token: str = Depends(oauth2_scheme)):
    username = decode_token(token)
    user = get_user(username)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return UserOut(username=user.username)