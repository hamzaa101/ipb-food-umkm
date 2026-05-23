from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.dependencies import get_db, get_current_user, get_cart_service
from app.services.cart_service import CartService
from app.schemas.cart import CartItemResponse, CartItemCreate, CartItemUpdate
from app.models.user import User

router = APIRouter()

class CartController:
    def __init__(self, db: AsyncSession, cart_service: CartService):
        self.db = db
        self.cart_service = cart_service

    async def list_cart(self, current_user: User) -> List[CartItemResponse]:
        items = await self.cart_service.get_cart_items(self.db, current_user.id)
        return items

    async def add_item(self, current_user: User, item_in: CartItemCreate) -> CartItemResponse:
        return await self.cart_service.add_item(self.db, current_user.id, item_in)

    async def update_item(self, item_id: str, item_in: CartItemUpdate) -> CartItemResponse:
        if item_in.quantity is None:
            raise HTTPException(status_code=400, detail="Quantity is required")
        item = await self.cart_service.update_item(self.db, item_id, item_in.quantity)
        if not item:
            raise HTTPException(status_code=404, detail="Cart item not found")
        return item

    async def remove_item(self, item_id: str):
        item = await self.cart_service.remove_item(self.db, item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Cart item not found")
        return {"detail": "Cart item removed"}


def get_cart_controller(
    db: AsyncSession = Depends(get_db),
    cart_service: CartService = Depends(get_cart_service),
) -> CartController:
    return CartController(db, cart_service)


@router.get("/", response_model=List[CartItemResponse])
async def read_cart(
    current_user: User = Depends(get_current_user),
    controller: CartController = Depends(get_cart_controller),
):
    return await controller.list_cart(current_user)


@router.post("/", response_model=CartItemResponse)
async def create_cart_item(
    item_in: CartItemCreate,
    current_user: User = Depends(get_current_user),
    controller: CartController = Depends(get_cart_controller),
):
    return await controller.add_item(current_user, item_in)


@router.patch("/{item_id}", response_model=CartItemResponse)
async def update_cart_item(
    item_id: str,
    item_in: CartItemUpdate,
    controller: CartController = Depends(get_cart_controller),
):
    return await controller.update_item(item_id, item_in)


@router.delete("/{item_id}")
async def delete_cart_item(
    item_id: str,
    controller: CartController = Depends(get_cart_controller),
):
    return await controller.remove_item(item_id)
