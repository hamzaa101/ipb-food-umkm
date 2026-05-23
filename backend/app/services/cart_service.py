from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.models.cart import CartItem
from app.repositories.cart_repository import CartRepository
from app.schemas.cart import CartItemCreate

class CartService:
    def __init__(self, cart_repo: CartRepository):
        self.cart_repo = cart_repo

    async def get_cart_items(self, db: AsyncSession, user_id: str) -> List[CartItem]:
        return await self.cart_repo.get_user_cart(db, user_id)

    async def add_item(self, db: AsyncSession, user_id: str, item_in: CartItemCreate) -> CartItem:
        existing = await self.cart_repo.get_by_user_and_product(db, user_id, item_in.product_id)
        if existing:
            existing.quantity += item_in.quantity
            return await self.cart_repo.update(db, db_obj=existing, obj_in={"quantity": existing.quantity})
        cart_item = {
            "user_id": user_id,
            "product_id": item_in.product_id,
            "quantity": item_in.quantity,
        }
        return await self.cart_repo.create(db, obj_in=cart_item)

    async def update_item(self, db: AsyncSession, item_id: str, quantity: int) -> Optional[CartItem]:
        item = await self.cart_repo.get(db, item_id)
        if not item:
            return None
        return await self.cart_repo.update(db, db_obj=item, obj_in={"quantity": quantity})

    async def remove_item(self, db: AsyncSession, item_id: str) -> Optional[CartItem]:
        return await self.cart_repo.delete(db, id=item_id)
