from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    is_admin: bool

class UserOut(BaseModel):
    id: int
    username: str
    is_admin: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str

class SweetBase(BaseModel):
    name: str
    category: str
    price: float
    quantity: int

class SweetOut(SweetBase):
    id: int
    class Config:
        from_attributes = True

class SweetResponse(BaseModel):
    message: str
    sweet: SweetOut

class SweetUpdateResponse(BaseModel):
    message: str
    changes: dict
    updated_sweet: SweetOut

class UserLogin(BaseModel):
    username: str
    password: str
