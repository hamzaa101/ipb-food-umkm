from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_db, get_user_service
from app.services.user_service import UserService
from app.schemas.user import UserCreate, UserLogin, Token, UserResponse

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(
    user_create: UserCreate,
    db: AsyncSession = Depends(get_db),
    user_service: UserService = Depends(get_user_service),
):
    try:
        user = await user_service.register_user(db, user_create)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return user


@router.post("/login", response_model=Token)
async def login(
    login_data: UserLogin,
    db: AsyncSession = Depends(get_db),
    user_service: UserService = Depends(get_user_service),
):
    user = await user_service.authenticate_user(db, login_data.phone_number, login_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Phone number atau password salah")
    access_token = user_service.create_access_token({"sub": user.id})
    return {"access_token": access_token, "token_type": "bearer"}
