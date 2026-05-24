from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload
from typing import List, Optional
import uuid
from datetime import datetime

from app.models.order import Order, OrderItem
from app.models.cart import CartItem
from app.models.product import Product
from app.repositories.order_repository import OrderRepository
from app.schemas.order import OrderResponse, OrderItemResponse

class OrderService:
    def __init__(self, order_repo: OrderRepository):
        self.order_repo = order_repo

    async def checkout_cart(self, db: AsyncSession, user_id: str) -> List[OrderResponse]:
        # Ambil semua item keranjang user beserta relasi produknya
        query = select(CartItem).options(selectinload(CartItem.product)).where(CartItem.user_id == user_id)
        result = await db.execute(query)
        cart_items = result.scalars().all()

        if not cart_items:
            raise ValueError("Keranjang kosong")

        # Kelompokkan berdasarkan seller_id
        orders_by_seller = {}
        for item in cart_items:
            product = item.product
            seller_id = product.seller_id
            if seller_id not in orders_by_seller:
                orders_by_seller[seller_id] = {
                    "total_price": 0.0,
                    "items": []
                }
            
            price = product.price
            orders_by_seller[seller_id]["total_price"] += price * item.quantity
            orders_by_seller[seller_id]["items"].append({
                "product_id": product.id,
                "quantity": item.quantity,
                "price": price
            })

        created_orders = []
        for seller_id, data in orders_by_seller.items():
            order_id = str(uuid.uuid4())
            new_order = Order(
                id=order_id,
                user_id=user_id,
                seller_id=seller_id,
                status="Menunggu Konfirmasi",
                total_price=data["total_price"]
            )
            db.add(new_order)
            
            for item_data in data["items"]:
                order_item = OrderItem(
                    order_id=order_id,
                    product_id=item_data["product_id"],
                    quantity=item_data["quantity"],
                    price=item_data["price"]
                )
                db.add(order_item)
            
            created_orders.append(new_order)

        # Hapus item keranjang setelah checkout
        await db.execute(delete(CartItem).where(CartItem.user_id == user_id))
        
        await db.commit()
        
        # Load ulang order untuk format response
        responses = []
        for order in created_orders:
            await db.refresh(order, ["items"])
            loaded_order = await self.order_repo.get_by_id(db, order.id)
            responses.append(self._format_order_response(loaded_order))
            
        return responses

    async def get_user_orders(self, db: AsyncSession, user_id: str, status_filter: Optional[str]) -> List[OrderResponse]:
        orders = await self.order_repo.get_user_orders(db, user_id, status_filter)
        return [self._format_order_response(order) for order in orders]

    async def get_order_details(self, db: AsyncSession, user_id: str, order_id: str) -> OrderResponse:
        order = await self.order_repo.get_by_id(db, order_id)
        if not order:
            raise ValueError("Pesanan tidak ditemukan")
        if order.user_id != user_id:
            raise ValueError("Tidak memiliki akses ke pesanan ini")
        return self._format_order_response(order)

    async def rate_order(self, db: AsyncSession, user_id: str, order_id: str, rating: int) -> OrderResponse:
        order = await self.order_repo.get_by_id(db, order_id)
        if not order:
            raise ValueError("Pesanan tidak ditemukan")
        if order.user_id != user_id:
            raise ValueError("Tidak memiliki akses ke pesanan ini")
        if order.status != "Selesai":
            raise ValueError("Hanya pesanan yang selesai yang dapat dinilai")
            
        order.rating = rating
        updated_order = await self.order_repo.update_order(db, order)
        return self._format_order_response(updated_order)

    def _format_order_response(self, order: Order) -> OrderResponse:
        items = []
        for item in order.items:
            items.append(OrderItemResponse(
                id=item.id,
                order_id=item.order_id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.price,
                product_name=item.product.name if item.product else None,
                product_image_url=item.product.image_url if item.product else None
            ))
            
        return OrderResponse(
            id=order.id,
            user_id=order.user_id,
            seller_id=order.seller_id,
            status=order.status,
            total_price=order.total_price,
            rating=order.rating,
            created_at=order.created_at,
            updated_at=order.updated_at,
            seller_name=order.seller.name if order.seller else None,
            items=items
        )
