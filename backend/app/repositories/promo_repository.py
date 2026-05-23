from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.models.promo import Promo
from app.repositories.base import BaseRepository

class PromoRepository(BaseRepository[Promo]):
    def __init__(self):
        super().__init__(Promo)

    async def get_active_promos(self, db: AsyncSession) -> List[Promo]:
        result = await db.execute(
            select(Promo).where(Promo.is_active == True)
        )
        return list(result.scalars().all())
