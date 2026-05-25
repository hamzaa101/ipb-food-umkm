from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.dependencies import get_current_user, get_cart_service
from app.services.cart_service import CartService
from app.schemas.cart import CartItemResponse, CartItemCreate, CartItemUpdate
from app.domain.user import UserDomain

router = APIRouter()

class CartController:
    def __init__(self, cart_service: CartService):
        self.cart_service = cart_service

    async def list_cart(self, current_user: UserDomain) -> List[CartItemResponse]:
        items = await self.cart_service.get_user_cart(current_user.id)
        return items

    async def add_item(self, current_user: UserDomain, item_in: CartItemCreate) -> CartItemResponse:
        return await self.cart_service.add_to_cart(current_user.id, item_in.product_id, item_in.quantity)

    async def update_item(self, current_user: UserDomain, item_id: str, item_in: CartItemUpdate) -> CartItemResponse:
        if item_in.quantity is None:
            raise HTTPException(status_code=400, detail="Quantity is required")
        item = await self.cart_service.update_cart_item(current_user.id, item_id, item_in.quantity)
        if not item:
            raise HTTPException(status_code=404, detail="Cart item not found")
        return item

    async def remove_item(self, current_user: UserDomain, item_id: str):
        ok = await self.cart_service.remove_from_cart(current_user.id, item_id)
        if not ok:
            raise HTTPException(status_code=404, detail="Cart item not found")
        return {"detail": "Cart item removed"}


def get_cart_controller(
    cart_service: CartService = Depends(get_cart_service),
) -> CartController:
    return CartController(cart_service)


@router.get("/", response_model=List[CartItemResponse])
async def read_cart(
    current_user: UserDomain = Depends(get_current_user),
    controller: CartController = Depends(get_cart_controller),
):
    return await controller.list_cart(current_user)


@router.post("/", response_model=CartItemResponse)
async def create_cart_item(
    item_in: CartItemCreate,
    current_user: UserDomain = Depends(get_current_user),
    controller: CartController = Depends(get_cart_controller),
):
    return await controller.add_item(current_user, item_in)


@router.patch("/{item_id}", response_model=CartItemResponse)
async def update_cart_item(
    item_id: str,
    item_in: CartItemUpdate,
    current_user: UserDomain = Depends(get_current_user),
    controller: CartController = Depends(get_cart_controller),
):
    return await controller.update_item(current_user, item_id, item_in)


@router.delete("/{item_id}")
async def delete_cart_item(
    item_id: str,
    current_user: UserDomain = Depends(get_current_user),
    controller: CartController = Depends(get_cart_controller),
):
    return await controller.remove_item(current_user, item_id)
