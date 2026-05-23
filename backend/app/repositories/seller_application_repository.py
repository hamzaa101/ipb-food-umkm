from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.models.seller_application import SellerApplication
from app.repositories.base import BaseRepository

class SellerApplicationRepository(BaseRepository[SellerApplication]):
    def __init__(self):
        super().__init__(SellerApplication)

    async def get_by_id(self, db: AsyncSession, application_id: str) -> Optional[SellerApplication]:
        result = await db.execute(select(SellerApplication).where(SellerApplication.id == application_id))
        return result.scalars().first()

    async def get_by_user(self, db: AsyncSession, user_id: str) -> List[SellerApplication]:
        result = await db.execute(select(SellerApplication).where(SellerApplication.user_id == user_id).order_by(SellerApplication.submitted_at.desc()))
        return list(result.scalars().all())

    async def create_application(self, db: AsyncSession, application_data: dict) -> SellerApplication:
        application = SellerApplication(**application_data)
        db.add(application)
        await db.commit()
        await db.refresh(application)
        return application

    async def update_status(self, db: AsyncSession, application: SellerApplication, status: str, rejected_reason: Optional[str] = None) -> SellerApplication:
        application.status = status
        application.rejected_reason = rejected_reason
        application.reviewed_at = datetime.utcnow()
        await db.commit()
        await db.refresh(application)
        return application
