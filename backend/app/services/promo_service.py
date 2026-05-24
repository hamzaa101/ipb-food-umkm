from typing import List
from app.repositories.promo_repository import PromoRepository
from app.domain.promo import PromoDomain

class PromoService:
    def __init__(self, promo_repo: PromoRepository):
        self.promo_repo = promo_repo

    async def get_active_promos(self) -> List[PromoDomain]:
        return await self.promo_repo.get_active_promos()
