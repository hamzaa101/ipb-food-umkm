from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List, Optional

from app.models.order import Order as OrderModel, OrderItem as OrderItemModel
from app.domain.order import OrderDomain, OrderItemDomain
from app.domain.mappers import Mapper
from app.repositories.base import BaseRepository

class OrderRepository(BaseRepository[OrderDomain, OrderModel]):
    def __init__(self, db: AsyncSession):
        super().__init__(OrderDomain, OrderModel, db)

    # Override get_by_id to eagerly load items
    async def get_by_id(self, id: str) -> Optional[OrderDomain]:
        query = select(OrderModel).options(selectinload(OrderModel.items)).filter(OrderModel.id == id)
        result = await self.db.execute(query)
        orm_obj = result.scalars().first()
        if not orm_obj:
            return None
        
        domain_obj = Mapper.to_domain(orm_obj, OrderDomain)
        domain_obj.items = [Mapper.to_domain(item, OrderItemDomain) for item in orm_obj.items]
        return domain_obj

    async def create_order(self, order: OrderDomain) -> OrderDomain:
        orm_order = Mapper.to_orm(order, OrderModel)
        # Handle items separately
        orm_items = [Mapper.to_orm(item, OrderItemModel) for item in order.items]
        orm_order.items = orm_items
        
        self.db.add(orm_order)
        await self.db.commit()
        await self.db.refresh(orm_order)
        
        domain_obj = Mapper.to_domain(orm_order, OrderDomain)
        domain_obj.items = [Mapper.to_domain(item, OrderItemDomain) for item in orm_order.items]
        return domain_obj

    async def get_user_orders(self, user_id: str, status_filter: Optional[str] = None) -> List[OrderDomain]:
        query = select(OrderModel).options(selectinload(OrderModel.items)).filter(OrderModel.user_id == user_id)
        
        if status_filter == 'ongoing':
            query = query.filter(OrderModel.status != 'Selesai', OrderModel.status != 'Dibatalkan')
        elif status_filter == 'completed':
            query = query.filter(OrderModel.status == 'Selesai')
            
        query = query.order_by(OrderModel.created_at.desc())
        result = await self.db.execute(query)
        
        orders = []
        for orm_order in result.scalars().all():
            domain_order = Mapper.to_domain(orm_order, OrderDomain)
            domain_order.items = [Mapper.to_domain(item, OrderItemDomain) for item in orm_order.items]
            orders.append(domain_order)
        return orders
