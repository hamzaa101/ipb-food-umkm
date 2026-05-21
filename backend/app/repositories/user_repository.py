from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Optional

from app.models.user import User, Seller, Buyer, SellerStatus
from app.models.product import Product
from app.repositories.base import BaseRepository

class UserRepository(BaseRepository[User]):
    def __init__(self):
        super().__init__(User)

    async def get_sellers_by_status(self, db: AsyncSession, status: SellerStatus) -> List[Seller]:
        result = await db.execute(
            select(Seller).where(Seller.verification_status == status)
        )
        return list(result.scalars().all())

    async def get_seller_by_id(self, db: AsyncSession, seller_id: str) -> Optional[Seller]:
        result = await db.execute(
            select(Seller).where(Seller.id == seller_id)
        )
        return result.scalars().first()

    async def count_sellers(self, db: AsyncSession) -> int:
        result = await db.scalar(select(func.count(Seller.id)))
        return result or 0

    async def count_buyers(self, db: AsyncSession) -> int:
        result = await db.scalar(select(func.count(Buyer.id)))
        return result or 0

    async def count_products(self, db: AsyncSession) -> int:
        result = await db.scalar(select(func.count(Product.id)))
        return result or 0
