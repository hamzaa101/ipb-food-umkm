from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_user_service
from app.services.user_service import UserService
from app.schemas.user import UserCreate, UserLogin, Token, UserResponse

router = APIRouter()

class AuthController:
    def __init__(self, user_service: UserService):
        self.user_service = user_service

    async def register(self, user_create: UserCreate) -> UserResponse:
        try:
            user = await self.user_service.register_user(user_create)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        return user

    async def login(self, login_data: UserLogin) -> Token:
        user = await self.user_service.authenticate_user(
            login_data.phone_number, login_data.password
        )
        if not user:
            raise HTTPException(status_code=401, detail="Phone number atau password salah")
        access_token = self.user_service.create_access_token({"sub": user.id})
        return {"access_token": access_token, "token_type": "bearer"}

def get_auth_controller(
    user_service: UserService = Depends(get_user_service),
) -> AuthController:
    return AuthController(user_service)

@router.post("/register", response_model=UserResponse)
async def register(
    user_create: UserCreate,
    controller: AuthController = Depends(get_auth_controller),
):
    return await controller.register(user_create)

@router.post("/login", response_model=Token)
async def login(
    login_data: UserLogin,
    controller: AuthController = Depends(get_auth_controller),
):
    return await controller.login(login_data)
