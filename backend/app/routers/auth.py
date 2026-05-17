from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_db, get_current_user_id
from app.models.user import Buyer, Seller, User, SellerStatus
from app.schemas.user import BuyerCreate, SellerCreate, SellerResponse, UserResponse
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

class LoginRequest(BaseModel):
    phone_number: str
    password: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class LoginResponse(BaseModel):
    user_id: str
    user_type: str
    message: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

router = APIRouter()

@router.post("/register/buyer", response_model=UserResponse)
async def register_buyer(
    buyer_in: BuyerCreate,
    db: AsyncSession = Depends(get_db),
):
    buyer = Buyer(
        name=buyer_in.name,
        phone_number=buyer_in.phone_number,
        password=buyer_in.password,
        user_type="buyer"
    )
    db.add(buyer)
    await db.commit()
    await db.refresh(buyer)
    return buyer

@router.post("/register/seller", response_model=SellerResponse)
async def register_seller(
    seller_in: SellerCreate,
    db: AsyncSession = Depends(get_db),
):
    seller = Seller(
        name=seller_in.name,
        phone_number=seller_in.phone_number,
        password=seller_in.password,
        user_type="seller",
        store_name=seller_in.store_name,
        address=seller_in.address,
        verification_status=SellerStatus.PENDING
    )
    db.add(seller)
    await db.commit()
    await db.refresh(seller)
    return seller

@router.post("/login", response_model=LoginResponse)
async def login(
    login_in: LoginRequest,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(
            User.phone_number == login_in.phone_number,
            User.password == login_in.password
        )
    )
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=401, detail="Phone number atau password salah")

    return LoginResponse(
        user_id=user.id,
        user_type=user.user_type,
        message="Login berhasil. Gunakan header X-User-Id dengan nilai user_id untuk endpoint yang memerlukan autentikasi."
    )

@router.get("/me", response_model=UserResponse)
async def read_current_user(
    current_user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(User).where(User.id == current_user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User tidak ditemukan")
    return user