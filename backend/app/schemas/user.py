from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from typing import Optional
from datetime import time

class UserBase(BaseModel):
    name: str
    phone_number: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

class UserCreate(UserBase):
    password: str
    user_type: str

class BuyerCreate(UserCreate):
    user_type: str = "buyer"

class SellerCreate(UserCreate):
    user_type: str = "seller"
    store_name: str
    address: Optional[str] = None

class UserResponse(UserBase):
    id: str
    user_type: str

class BuyerResponse(UserResponse):
    pass

class SellerResponse(UserResponse):
    store_name: str
    open_time: Optional[time] = None
    close_time: Optional[time] = None
    address: Optional[str] = None
    verification_status: str

class UserLogin(BaseModel):
    phone_number: str
    password: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )