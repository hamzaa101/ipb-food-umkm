from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.models.promo import Promo
from app.repositories.promo_repository import PromoRepository
from app.schemas.promo import PromoCreate

class PromoService:
    def __init__(self, promo_repo: PromoRepository):
        self.promo_repo = promo_repo

    async def get_active_promos(self, db: AsyncSession) -> List[Promo]:
        return await self.promo_repo.get_active_promos(db)

    async def create_promo(self, db: AsyncSession, promo_in: PromoCreate) -> Promo:
        return await self.promo_repo.create(db, obj_in=promo_in.model_dump())
