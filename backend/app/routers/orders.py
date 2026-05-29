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

@router.get("/seller", response_model=List[OrderResponse])
async def get_seller_orders(
    tab: str = Query("queue", description="Tab filter: 'queue', 'processing', atau 'completed'"),
    current_user: UserDomain = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    if current_user.user_type != "seller":
        raise HTTPException(status_code=403, detail="Hanya penjual yang dapat mengakses endpoint ini")
    orders = await order_service.get_seller_orders(current_user.id, tab)
    return orders

@router.get("/seller/dashboard")
async def get_seller_dashboard(
    current_user: UserDomain = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    if current_user.user_type != "seller":
        raise HTTPException(status_code=403, detail="Hanya penjual yang dapat mengakses endpoint ini")
    counts = await order_service.get_seller_order_counts(current_user.id)
    is_open = getattr(current_user, "is_accepting_orders", True)
    return {
        "counts": counts,
        "is_accepting_orders": is_open
    }

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

@router.patch("/{order_id}/accept", response_model=OrderResponse)
async def accept_order(
    order_id: str,
    current_user: UserDomain = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    if current_user.user_type != "seller":
        raise HTTPException(status_code=403, detail="Hanya penjual yang dapat mengakses endpoint ini")
    try:
        order = await order_service.accept_order(current_user.id, order_id)
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{order_id}/reject", response_model=OrderResponse)
async def reject_order(
    order_id: str,
    current_user: UserDomain = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    if current_user.user_type != "seller":
        raise HTTPException(status_code=403, detail="Hanya penjual yang dapat mengakses endpoint ini")
    try:
        order = await order_service.reject_order(current_user.id, order_id)
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{order_id}/complete-prep", response_model=OrderResponse)
async def complete_preparation(
    order_id: str,
    current_user: UserDomain = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    if current_user.user_type != "seller":
        raise HTTPException(status_code=403, detail="Hanya penjual yang dapat mengakses endpoint ini")
    try:
        order = await order_service.complete_preparation(current_user.id, order_id)
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{order_id}/complete", response_model=OrderResponse)
async def complete_order(
    order_id: str,
    current_user: UserDomain = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    try:
        order = await order_service.complete_order(current_user.id, order_id)
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

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
