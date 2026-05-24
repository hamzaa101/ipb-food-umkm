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
        query = select(ProductModel).options(selectinload(ProductModel.seller))
        if seller_id:
            query = query.where(ProductModel.seller_id == seller_id)
        result = await self.db.execute(query)
        return [Mapper.to_domain(p, ProductDomain) for p in result.scalars().all()]

    async def get_product_by_id(self, product_id: str) -> Optional[ProductDomain]:
        query = select(ProductModel).options(selectinload(ProductModel.seller)).filter(ProductModel.id == product_id)
        result = await self.db.execute(query)
        product = result.scalars().first()
        return Mapper.to_domain(product, ProductDomain) if product else None

    async def search_products(
        self,
        query: Optional[str] = None,
        category: Optional[str] = None,
        seller_name: Optional[str] = None,
        seller_address: Optional[str] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> List[ProductDomain]:
        stmt = select(ProductModel).join(ProductModel.seller).options(selectinload(ProductModel.seller))

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

        stmt = stmt.limit(limit).offset(offset)
        result = await self.db.execute(stmt)
        return [Mapper.to_domain(p, ProductDomain) for p in result.scalars().all()]
