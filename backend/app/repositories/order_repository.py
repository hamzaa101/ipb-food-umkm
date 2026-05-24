from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List, Optional

from app.models.order import Order, OrderItem

class OrderRepository:
    async def create_order(self, db: AsyncSession, order: Order) -> Order:
        db.add(order)
        await db.commit()
        await db.refresh(order)
        return order
        
    async def get_by_id(self, db: AsyncSession, order_id: str) -> Optional[Order]:
        query = select(Order).options(selectinload(Order.items).selectinload(OrderItem.product), selectinload(Order.seller)).filter(Order.id == order_id)
        result = await db.execute(query)
        return result.scalars().first()

    async def get_user_orders(self, db: AsyncSession, user_id: str, status_filter: Optional[str] = None) -> List[Order]:
        query = select(Order).options(selectinload(Order.items).selectinload(OrderItem.product), selectinload(Order.seller)).filter(Order.user_id == user_id)
        
        if status_filter == 'ongoing':
            query = query.filter(Order.status != 'Selesai', Order.status != 'Dibatalkan')
        elif status_filter == 'completed':
            query = query.filter(Order.status == 'Selesai')
            
        query = query.order_by(Order.created_at.desc())
        result = await db.execute(query)
        return list(result.scalars().all())

    async def update_order(self, db: AsyncSession, order: Order) -> Order:
        await db.commit()
        await db.refresh(order)
        return order
