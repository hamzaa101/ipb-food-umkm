from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_db, get_current_user, get_user_service
from app.schemas.user import UserResponse, UserUpdate, PasswordChangeRequest, DeleteAccountRequest
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

    async def change_password(self, current_user: User, pw_request: PasswordChangeRequest):
        ok = await self.user_service.change_password(self.db, current_user, pw_request.current_password, pw_request.new_password)
        if not ok:
            raise HTTPException(status_code=400, detail="Current password incorrect")
        return {"detail": "Password updated"}

    async def delete_account(self, current_user: User, delete_req: DeleteAccountRequest):
        ok = await self.user_service.delete_user(self.db, current_user, delete_req.password)
        if not ok:
            raise HTTPException(status_code=400, detail="Password incorrect or deletion failed")
        return {"detail": "Account deleted"}


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


@router.post("/me/change-password")
async def change_password(
    pw_request: PasswordChangeRequest,
    current_user: User = Depends(get_current_user),
    controller: UserController = Depends(get_user_controller),
):
    return await controller.change_password(current_user, pw_request)


@router.delete("/me")
async def delete_current_user(
    delete_req: DeleteAccountRequest,
    current_user: User = Depends(get_current_user),
    controller: UserController = Depends(get_user_controller),
):
    return await controller.delete_account(current_user, delete_req)
