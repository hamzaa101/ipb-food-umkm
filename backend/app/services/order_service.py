from typing import List, Optional
from app.repositories.order_repository import OrderRepository
from app.repositories.cart_repository import CartRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.user_repository import UserRepository
from app.domain.order import OrderDomain
from app.schemas.order import OrderResponse, OrderItemResponse

class OrderService:
    def __init__(self, order_repo: OrderRepository, cart_repo: CartRepository, product_repo: ProductRepository, user_repo: UserRepository):
        self.order_repo = order_repo
        self.cart_repo = cart_repo
        self.product_repo = product_repo
        self.user_repo = user_repo

    async def checkout_cart(self, user_id: str) -> List[OrderResponse]:
        cart_items = await self.cart_repo.get_user_cart(user_id)
        if not cart_items:
            raise ValueError("Keranjang kosong")

        orders_by_seller = {}
        for item in cart_items:
            product = await self.product_repo.get_product_by_id(item.product_id)
            if not product:
                continue
            seller_id = product.seller_id
            if seller_id not in orders_by_seller:
                orders_by_seller[seller_id] = []
            
            orders_by_seller[seller_id].append({
                "product_id": product.id,
                "quantity": item.quantity,
                "price": product.price,
                "product_name": product.name,
                "product_image_url": product.image_url
            })

        created_orders = []
        for seller_id, items_data in orders_by_seller.items():
            order = OrderDomain(
                user_id=user_id,
                seller_id=seller_id
            )
            for item_data in items_data:
                order.add_item(
                    product_id=item_data["product_id"],
                    quantity=item_data["quantity"],
                    price=item_data["price"]
                )
            
            saved_order = await self.order_repo.create_order(order)
            created_orders.append((saved_order, items_data))

        # Delete cart items
        for item in cart_items:
            await self.cart_repo.delete(item)

        # Format responses
        responses = []
        for order, items_data in created_orders:
            seller = await self.user_repo.get_seller_by_id(order.seller_id)
            seller_name = seller.store_name if seller else None
            
            items_response = []
            for i, item in enumerate(order.items):
                items_response.append(OrderItemResponse(
                    id=item.id,
                    order_id=item.order_id,
                    product_id=item.product_id,
                    quantity=item.quantity,
                    price=item.price,
                    product_name=items_data[i]["product_name"],
                    product_image_url=items_data[i]["product_image_url"]
                ))
            
            responses.append(OrderResponse(
                id=order.id,
                user_id=order.user_id,
                seller_id=order.seller_id,
                status=order.status,
                total_price=order.total_price,
                rating=order.rating,
                created_at=order.created_at,
                updated_at=order.updated_at,
                seller_name=seller_name,
                items=items_response
            ))

        return responses

    async def get_user_orders(self, user_id: str, status_filter: Optional[str]) -> List[OrderResponse]:
        orders = await self.order_repo.get_user_orders(user_id, status_filter)
        responses = []
        for order in orders:
            seller = await self.user_repo.get_seller_by_id(order.seller_id)
            items_response = []
            for item in order.items:
                product = await self.product_repo.get_product_by_id(item.product_id)
                items_response.append(OrderItemResponse(
                    id=item.id,
                    order_id=item.order_id,
                    product_id=item.product_id,
                    quantity=item.quantity,
                    price=item.price,
                    product_name=product.name if product else None,
                    product_image_url=product.image_url if product else None
                ))
            responses.append(OrderResponse(
                id=order.id,
                user_id=order.user_id,
                seller_id=order.seller_id,
                status=order.status,
                total_price=order.total_price,
                rating=order.rating,
                created_at=order.created_at,
                updated_at=order.updated_at,
                seller_name=seller.store_name if seller else None,
                items=items_response
            ))
        return responses

    async def get_order_details(self, user_id: str, order_id: str) -> OrderResponse:
        order = await self.order_repo.get_by_id(order_id)
        if not order:
            raise ValueError("Pesanan tidak ditemukan")
        if order.user_id != user_id:
            raise ValueError("Tidak memiliki akses ke pesanan ini")
        
        seller = await self.user_repo.get_seller_by_id(order.seller_id)
        items_response = []
        for item in order.items:
            product = await self.product_repo.get_product_by_id(item.product_id)
            items_response.append(OrderItemResponse(
                id=item.id,
                order_id=item.order_id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.price,
                product_name=product.name if product else None,
                product_image_url=product.image_url if product else None
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
            seller_name=seller.store_name if seller else None,
            items=items_response
        )

    async def rate_order(self, user_id: str, order_id: str, rating: int) -> OrderResponse:
        order = await self.order_repo.get_by_id(order_id)
        if not order:
            raise ValueError("Pesanan tidak ditemukan")
        if order.user_id != user_id:
            raise ValueError("Tidak memiliki akses ke pesanan ini")
        
        order.add_rating(rating)
        await self.order_repo.update(order)
        
        return await self.get_order_details(user_id, order_id)
