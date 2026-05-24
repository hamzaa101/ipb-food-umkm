from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.models.promo import Promo as PromoModel
from app.domain.promo import PromoDomain
from app.domain.mappers import Mapper
from app.repositories.base import BaseRepository

class PromoRepository(BaseRepository[PromoDomain, PromoModel]):
    def __init__(self, db: AsyncSession):
        super().__init__(PromoDomain, PromoModel, db)

    async def get_active_promos(self) -> List[PromoDomain]:
        result = await self.db.execute(
            select(PromoModel).where(PromoModel.is_active == True)
        )
        return [Mapper.to_domain(p, PromoDomain) for p in result.scalars().all()]
