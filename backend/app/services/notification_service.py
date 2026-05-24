from typing import List
from app.repositories.notification_repository import NotificationRepository
from app.domain.notification import NotificationDomain

class NotificationService:
    def __init__(self, notification_repo: NotificationRepository):
        self.notification_repo = notification_repo

    async def get_user_notifications(self, user_id: str) -> List[NotificationDomain]:
        return await self.notification_repo.get_user_notifications(user_id)

    async def create_notification(self, user_id: str, title: str, message: str = None) -> NotificationDomain:
        notification = NotificationDomain(
            user_id=user_id,
            title=title,
            message=message
        )
        return await self.notification_repo.save(notification)

    async def mark_as_read(self, user_id: str, notification_id: str) -> bool:
        notification = await self.notification_repo.get_by_id(notification_id)
        if not notification or notification.user_id != user_id:
            return False
        notification.mark_as_read()
        await self.notification_repo.update(notification)
        return True
