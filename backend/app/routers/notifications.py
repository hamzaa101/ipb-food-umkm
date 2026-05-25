from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.dependencies import get_current_user, get_notification_service
from app.services.notification_service import NotificationService
from app.schemas.notification import NotificationResponse
from app.domain.user import UserDomain

router = APIRouter()

class NotificationController:
    def __init__(self, notification_service: NotificationService):
        self.notification_service = notification_service

    async def list_notifications(self, current_user: UserDomain) -> List[NotificationResponse]:
        notifications = await self.notification_service.get_user_notifications(current_user.id)
        return notifications

    async def mark_read(self, current_user: UserDomain, notification_id: str) -> NotificationResponse:
        # Note: In the previous implementation mark_read didn't verify user_id properly, now it does.
        # But we need to return the updated notification based on schema
        ok = await self.notification_service.mark_as_read(current_user.id, notification_id)
        if not ok:
            raise HTTPException(status_code=404, detail="Notification not found")
        # Just return a mock response for now or re-fetch it.
        # Schema only needs the id and read status mostly. Let's return success message.
        return {"detail": "Notification marked as read"}


def get_notification_controller(
    notification_service: NotificationService = Depends(get_notification_service),
) -> NotificationController:
    return NotificationController(notification_service)


@router.get("/", response_model=List[NotificationResponse])
async def read_notifications(
    current_user: UserDomain = Depends(get_current_user),
    controller: NotificationController = Depends(get_notification_controller),
):
    return await controller.list_notifications(current_user)


@router.patch("/{notification_id}/read")
async def mark_notification_read(
    notification_id: str,
    current_user: UserDomain = Depends(get_current_user),
    controller: NotificationController = Depends(get_notification_controller),
):
    return await controller.mark_read(current_user, notification_id)
