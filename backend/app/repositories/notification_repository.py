from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.models.notification import Notification as NotificationModel
from app.domain.notification import NotificationDomain
from app.domain.mappers import Mapper
from app.repositories.base import BaseRepository

class NotificationRepository(BaseRepository[NotificationDomain, NotificationModel]):
    def __init__(self, db: AsyncSession):
        super().__init__(NotificationDomain, NotificationModel, db)

    async def get_user_notifications(self, user_id: str) -> List[NotificationDomain]:
        result = await self.db.execute(
            select(NotificationModel).where(NotificationModel.user_id == user_id).order_by(NotificationModel.created_at.desc())
        )
        return [Mapper.to_domain(n, NotificationDomain) for n in result.scalars().all()]
