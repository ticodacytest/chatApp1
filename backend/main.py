from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Request, status
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from tortoise import fields
from tortoise.contrib.fastapi import register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model
from passlib.hash import bcrypt
import jwt

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
JWT_SECRET = "f7b66e077c5997b084a83299662800d0bec8071f128aefede11ba687b6db9845"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class User(Model):
    username = fields.CharField(50, unique=True)
    password = fields.CharField(128)

    @classmethod
    async def get_user(cls, username):
        return cls.get(username=username)

    def verify_password(self, password):
        return bcrypt.verify(password, self.password)


class UserId(Model):
    firstname = fields.CharField(128)
    lastname = fields.CharField(128)
    username = fields.CharField(50, unique=True)
    password = fields.CharField(128)

    @classmethod
    async def get_user(cls, username):
        return cls.get(username=username)

    def verify_password(self, password):
        return bcrypt.verify(password, self.password)


User_Pydantic0 = pydantic_model_creator(User, name="User0")
UserIn_Pydantic0 = pydantic_model_creator(User, name="UserIn0", exclude_readonly=True)

User_Pydantic = pydantic_model_creator(UserId, name="User")
UserIn_Pydantic = pydantic_model_creator(UserId, name="UserIn", exclude_readonly=True)


@app.get("/", tags=["root"])
def read_root() -> dict:
    return {"Hello": "World Gaurav"}


async def authenticate_user(username: str, password: str):
    user = await UserId.get(username=username)
    if not user:
        return False
    if not user.verify_password(password):
        return False
    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = await UserId.get(id=payload.get("id"))
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username and password",
        )
    return await User_Pydantic.from_tortoise_orm(user)


@app.post("/register", response_model=User_Pydantic)
async def register(user: UserIn_Pydantic):
    user_obj = UserId(
        firstname=user.firstname,
        lastname=user.lastname,
        username=user.username,
        password=bcrypt.hash(user.password),
    )
    # print(user.username)
    await user_obj.save()
    return await User_Pydantic.from_tortoise_orm(user_obj)
    # access_token = Authorize.create_access_token(subject=user.username)
    # return {"access_token": access_token}


@app.post("/login")
async def login(user: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(user.username, user.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    user_obj = await User_Pydantic.from_tortoise_orm(user)
    # user.username
    # user.password
    # this is the part where we will checUser_Pydantic k the user credentials with our database record
    # but since we are not going to use any db, straight away we will just create the token and send it back
    # subject identifier for who this token is for example id or username from database
    access_token = jwt.encode(user_obj.dict(), JWT_SECRET)
    return {"access_token": access_token, "token_type": "brearer"}


@app.get("/chat", response_model=User_Pydantic)
async def chat_user(user: User_Pydantic = Depends(get_current_user)):
    print("chat user")
    return user


register_tortoise(
    app,
    db_url="sqlite://db.sqlite3",
    modules={"modles": ["main"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
