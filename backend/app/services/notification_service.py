from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.models.notification import Notification
from app.repositories.notification_repository import NotificationRepository
from app.schemas.notification import NotificationCreate

class NotificationService:
    def __init__(self, notification_repo: NotificationRepository):
        self.notification_repo = notification_repo

    async def get_notifications(self, db: AsyncSession, user_id: str) -> List[Notification]:
        return await self.notification_repo.get_user_notifications(db, user_id)

    async def mark_read(self, db: AsyncSession, notification_id: str) -> Optional[Notification]:
        notification = await self.notification_repo.get(db, notification_id)
        if not notification:
            return None
        return await self.notification_repo.update(db, db_obj=notification, obj_in={"is_read": True})

    async def create_notification(self, db: AsyncSession, data: NotificationCreate) -> Notification:
        return await self.notification_repo.create(db, obj_in=data.model_dump())
