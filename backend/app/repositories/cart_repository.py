from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.models.cart import CartItem
from app.repositories.base import BaseRepository

class CartRepository(BaseRepository[CartItem]):
    def __init__(self):
        super().__init__(CartItem)

    async def get_user_cart(self, db: AsyncSession, user_id: str) -> List[CartItem]:
        result = await db.execute(
            select(CartItem).where(CartItem.user_id == user_id)
        )
        return list(result.scalars().all())

    async def get_by_user_and_product(self, db: AsyncSession, user_id: str, product_id: str):
        result = await db.execute(
            select(CartItem).where(CartItem.user_id == user_id, CartItem.product_id == product_id)
        )
        return result.scalars().first()
