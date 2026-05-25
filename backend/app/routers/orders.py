from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional

from app.dependencies import get_current_user, get_order_service
from app.services.order_service import OrderService
from app.schemas.order import OrderResponse, OrderRatingUpdate
from app.domain.user import UserDomain

router = APIRouter()

@router.post("/checkout", response_model=List[OrderResponse])
async def checkout_cart(
    current_user: UserDomain = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    try:
        orders = await order_service.checkout_cart(current_user.id)
        return orders
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[OrderResponse])
async def get_user_orders(
    status: Optional[str] = Query(None, description="Filter status: 'ongoing' atau 'completed'"),
    current_user: UserDomain = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    orders = await order_service.get_user_orders(current_user.id, status)
    return orders

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order_details(
    order_id: str,
    current_user: UserDomain = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    try:
        order = await order_service.get_order_details(current_user.id, order_id)
        return order
    except ValueError as e:
        raise HTTPException(status_code=404 if "ditemukan" in str(e).lower() else 403, detail=str(e))

@router.patch("/{order_id}/rating", response_model=OrderResponse)
async def rate_order(
    order_id: str,
    rating_data: OrderRatingUpdate,
    current_user: UserDomain = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    try:
        order = await order_service.rate_order(current_user.id, order_id, rating_data.rating)
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
