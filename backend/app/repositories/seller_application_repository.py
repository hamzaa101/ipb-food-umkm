from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from datetime import datetime

from app.models.seller_application import SellerApplication as SellerApplicationModel
from app.domain.seller_application import SellerApplicationDomain
from app.domain.mappers import Mapper
from app.repositories.base import BaseRepository

class SellerApplicationRepository(BaseRepository[SellerApplicationDomain, SellerApplicationModel]):
    def __init__(self, db: AsyncSession):
        super().__init__(SellerApplicationDomain, SellerApplicationModel, db)

    async def get_by_user(self, user_id: str) -> List[SellerApplicationDomain]:
        result = await self.db.execute(
            select(SellerApplicationModel)
            .where(SellerApplicationModel.user_id == user_id)
            .order_by(SellerApplicationModel.submitted_at.desc())
        )
        return [Mapper.to_domain(a, SellerApplicationDomain) for a in result.scalars().all()]
