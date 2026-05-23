from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.dependencies import get_db, get_current_user, get_notification_service
from app.services.notification_service import NotificationService
from app.schemas.notification import NotificationResponse
from app.models.user import User

router = APIRouter()

class NotificationController:
    def __init__(self, db: AsyncSession, notification_service: NotificationService):
        self.db = db
        self.notification_service = notification_service

    async def list_notifications(self, current_user: User) -> List[NotificationResponse]:
        notifications = await self.notification_service.get_notifications(self.db, current_user.id)
        return notifications

    async def mark_read(self, notification_id: str) -> NotificationResponse:
        notification = await self.notification_service.mark_read(self.db, notification_id)
        if not notification:
            raise HTTPException(status_code=404, detail="Notification not found")
        return notification


def get_notification_controller(
    db: AsyncSession = Depends(get_db),
    notification_service: NotificationService = Depends(get_notification_service),
) -> NotificationController:
    return NotificationController(db, notification_service)


@router.get("/", response_model=List[NotificationResponse])
async def read_notifications(
    current_user: User = Depends(get_current_user),
    controller: NotificationController = Depends(get_notification_controller),
):
    return await controller.list_notifications(current_user)


@router.patch("/{notification_id}/read", response_model=NotificationResponse)
async def mark_notification_read(
    notification_id: str,
    controller: NotificationController = Depends(get_notification_controller),
):
    return await controller.mark_read(notification_id)
