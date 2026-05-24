from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.dependencies import get_db, get_current_user, get_order_service
from app.services.order_service import OrderService
from app.schemas.order import OrderResponse, OrderRatingUpdate
from app.models.user import User

router = APIRouter()

@router.post("/checkout", response_model=List[OrderResponse])
async def checkout_cart(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    """
    Checkout keranjang saat ini.
    Sistem akan otomatis memecah pesanan berdasarkan penjual jika di keranjang ada produk dari beberapa penjual.
    """
    try:
        orders = await order_service.checkout_cart(db, current_user.id)
        return orders
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[OrderResponse])
async def get_user_orders(
    status: Optional[str] = Query(None, description="Filter status: 'ongoing' atau 'completed'"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    """
    Mengambil daftar pesanan pengguna.
    """
    orders = await order_service.get_user_orders(db, current_user.id, status)
    return orders

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order_details(
    order_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    """
    Melihat detail pesanan.
    """
    try:
        order = await order_service.get_order_details(db, current_user.id, order_id)
        return order
    except ValueError as e:
        raise HTTPException(status_code=404 if "ditemukan" in str(e).lower() else 403, detail=str(e))

@router.patch("/{order_id}/rating", response_model=OrderResponse)
async def rate_order(
    order_id: str,
    rating_data: OrderRatingUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    """
    Memberikan nilai (rating 1-5) untuk pesanan yang sudah selesai.
    """
    try:
        order = await order_service.rate_order(db, current_user.id, order_id, rating_data.rating)
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
