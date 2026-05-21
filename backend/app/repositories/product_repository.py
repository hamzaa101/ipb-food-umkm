from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.models.product import Product
from app.repositories.base import BaseRepository

class ProductRepository(BaseRepository[Product]):
    def __init__(self):
        super().__init__(Product)

    async def get_by_seller(self, db: AsyncSession, seller_id: str) -> List[Product]:
        result = await db.execute(
            select(Product).where(Product.seller_id == seller_id)
        )
        return list(result.scalars().all())
