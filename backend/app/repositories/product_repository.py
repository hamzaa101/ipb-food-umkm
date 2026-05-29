from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_
from sqlalchemy.orm import selectinload
from typing import List, Optional

from app.models.product import Product as ProductModel
from app.domain.product import ProductDomain
from app.repositories.base import BaseRepository
from app.domain.mappers import Mapper
from app.models.user import Seller as SellerModel

class ProductRepository(BaseRepository[ProductDomain, ProductModel]):
    def __init__(self, db: AsyncSession):
        super().__init__(ProductDomain, ProductModel, db)

    async def get_products(self, seller_id: Optional[str] = None) -> List[ProductDomain]:
        from app.models.order import Order as OrderModel, OrderItem as OrderItemModel
        
        stmt = (
            select(
                ProductModel,
                func.coalesce(func.sum(OrderItemModel.quantity), 0).label("sold_count"),
                func.coalesce(func.avg(OrderModel.rating), 0.0).label("average_rating")
            )
            .outerjoin(OrderItemModel, ProductModel.id == OrderItemModel.product_id)
            .outerjoin(OrderModel, OrderItemModel.order_id == OrderModel.id)
            .options(selectinload(ProductModel.seller))
        )
        
        if seller_id:
            stmt = stmt.where(ProductModel.seller_id == seller_id)
            
        stmt = stmt.group_by(ProductModel.id)
        
        result = await self.db.execute(stmt)
        products = []
        for row in result.all():
            p_orm = row[0]
            p_orm.sold_count = int(row[1])
            p_orm.average_rating = float(row[2])
            products.append(Mapper.to_domain(p_orm, ProductDomain))
        return products

    async def get_product_by_id(self, product_id: str) -> Optional[ProductDomain]:
        from app.models.order import Order as OrderModel, OrderItem as OrderItemModel
        
        stmt = (
            select(
                ProductModel,
                func.coalesce(func.sum(OrderItemModel.quantity), 0).label("sold_count"),
                func.coalesce(func.avg(OrderModel.rating), 0.0).label("average_rating")
            )
            .outerjoin(OrderItemModel, ProductModel.id == OrderItemModel.product_id)
            .outerjoin(OrderModel, OrderItemModel.order_id == OrderModel.id)
            .where(ProductModel.id == product_id)
            .options(selectinload(ProductModel.seller))
            .group_by(ProductModel.id)
        )
        
        result = await self.db.execute(stmt)
        row = result.first()
        if not row:
            return None
            
        p_orm = row[0]
        p_orm.sold_count = int(row[1])
        p_orm.average_rating = float(row[2])
        return Mapper.to_domain(p_orm, ProductDomain)

    async def search_products(
        self,
        query: Optional[str] = None,
        category: Optional[str] = None,
        seller_name: Optional[str] = None,
        seller_address: Optional[str] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> List[ProductDomain]:
        from app.models.order import Order as OrderModel, OrderItem as OrderItemModel
        
        stmt = (
            select(
                ProductModel,
                func.coalesce(func.sum(OrderItemModel.quantity), 0).label("sold_count"),
                func.coalesce(func.avg(OrderModel.rating), 0.0).label("average_rating")
            )
            .join(ProductModel.seller)
            .outerjoin(OrderItemModel, ProductModel.id == OrderItemModel.product_id)
            .outerjoin(OrderModel, OrderItemModel.order_id == OrderModel.id)
            .options(selectinload(ProductModel.seller))
        )

        if query:
            stmt = stmt.where(
                or_(
                    ProductModel.name.ilike(f"%{query}%"),
                    ProductModel.description.ilike(f"%{query}%")
                )
            )
        if category:
            stmt = stmt.where(ProductModel.category == category)
        if seller_name:
            stmt = stmt.where(SellerModel.store_name.ilike(f"%{seller_name}%"))
        if seller_address:
            stmt = stmt.where(SellerModel.address.ilike(f"%{seller_address}%"))

        stmt = stmt.group_by(ProductModel.id, SellerModel.id).limit(limit).offset(offset)
        result = await self.db.execute(stmt)
        
        products = []
        for row in result.all():
            p_orm = row[0]
            p_orm.sold_count = int(row[1])
            p_orm.average_rating = float(row[2])
            products.append(Mapper.to_domain(p_orm, ProductDomain))
        return products
