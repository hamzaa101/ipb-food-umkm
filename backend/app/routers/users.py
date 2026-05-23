from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_db, get_current_user, get_user_service
from app.schemas.user import UserResponse, UserUpdate
from app.services.user_service import UserService
from app.models.user import User

router = APIRouter()

class UserController:
    def __init__(self, db: AsyncSession, user_service: UserService):
        self.db = db
        self.user_service = user_service

    async def read_current_user(self, current_user: User) -> UserResponse:
        return current_user

    async def update_current_user(self, updates: UserUpdate, current_user: User) -> UserResponse:
        if not updates.name and updates.address is None:
            raise HTTPException(status_code=400, detail="No update data provided")
        return await self.user_service.update_user(
            self.db, current_user, updates.dict(exclude_none=True)
        )


def get_user_controller(
    db: AsyncSession = Depends(get_db),
    user_service: UserService = Depends(get_user_service),
) -> UserController:
    return UserController(db, user_service)


@router.get("/me", response_model=UserResponse)
async def read_current_user(
    current_user: User = Depends(get_current_user),
    controller: UserController = Depends(get_user_controller),
):
    return await controller.read_current_user(current_user)


@router.put("/me", response_model=UserResponse)
async def update_current_user(
    updates: UserUpdate,
    current_user: User = Depends(get_current_user),
    controller: UserController = Depends(get_user_controller),
):
    return await controller.update_current_user(updates, current_user)
