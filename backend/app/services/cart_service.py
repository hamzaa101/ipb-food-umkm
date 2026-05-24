from typing import List, Optional
from app.repositories.cart_repository import CartRepository
from app.domain.cart import CartItemDomain

class CartService:
    def __init__(self, cart_repo: CartRepository):
        self.cart_repo = cart_repo

    async def get_user_cart(self, user_id: str) -> List[CartItemDomain]:
        return await self.cart_repo.get_user_cart(user_id)

    async def add_to_cart(self, user_id: str, product_id: str, quantity: int) -> CartItemDomain:
        existing_item = await self.cart_repo.get_by_user_and_product(user_id, product_id)
        if existing_item:
            existing_item.increase_quantity(quantity)
            return await self.cart_repo.update(existing_item)
        
        new_item = CartItemDomain(
            user_id=user_id,
            product_id=product_id,
            quantity=quantity
        )
        return await self.cart_repo.save(new_item)

    async def remove_from_cart(self, user_id: str, item_id: str) -> bool:
        item = await self.cart_repo.get_by_id(item_id)
        if not item or item.user_id != user_id:
            return False
        await self.cart_repo.delete(item)
        return True

    async def update_cart_item(self, user_id: str, item_id: str, quantity: int) -> Optional[CartItemDomain]:
        item = await self.cart_repo.get_by_id(item_id)
        if not item or item.user_id != user_id:
            return None
        item.quantity = quantity
        return await self.cart_repo.update(item)
