from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.models.cart import CartItem as CartItemModel
from app.domain.cart import CartItemDomain
from app.domain.mappers import Mapper
from app.repositories.base import BaseRepository

class CartRepository(BaseRepository[CartItemDomain, CartItemModel]):
    def __init__(self, db: AsyncSession):
        super().__init__(CartItemDomain, CartItemModel, db)

    async def get_user_cart(self, user_id: str) -> List[CartItemDomain]:
        result = await self.db.execute(
            select(CartItemModel).where(CartItemModel.user_id == user_id)
        )
        return [Mapper.to_domain(c, CartItemDomain) for c in result.scalars().all()]

    async def get_by_user_and_product(self, user_id: str, product_id: str) -> Optional[CartItemDomain]:
        result = await self.db.execute(
            select(CartItemModel).where(CartItemModel.user_id == user_id, CartItemModel.product_id == product_id)
        )
        item = result.scalars().first()
        return Mapper.to_domain(item, CartItemDomain) if item else None
