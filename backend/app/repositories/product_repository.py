from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from typing import List, Optional

from app.models.product import Product
from app.repositories.base import BaseRepository

class ProductRepository(BaseRepository[Product]):
    def __init__(self):
        super().__init__(Product)

    async def get_products(self, db: AsyncSession, seller_id: Optional[str] = None) -> List[Product]:
        stmt = select(Product).where(Product.is_available == True)
        if seller_id:
            stmt = stmt.where(Product.seller_id == seller_id)
        result = await db.execute(stmt)
        return list(result.scalars().all())

    async def get_product_by_id(self, db: AsyncSession, product_id: str) -> Optional[Product]:
        return await self.get(db, product_id)

    async def get_by_seller(self, db: AsyncSession, seller_id: str) -> List[Product]:
        result = await db.execute(
            select(Product).where(Product.seller_id == seller_id)
        )
        return list(result.scalars().all())

    async def search_products(
        self,
        db: AsyncSession,
        query: Optional[str] = None,
        category: Optional[str] = None,
        seller_name: Optional[str] = None,
        seller_address: Optional[str] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> List[Product]:
        stmt = select(Product).where(Product.is_available == True)

        if query:
            q = f"%{query}%"
            stmt = stmt.where(
                or_(
                    Product.name.ilike(q),
                    Product.description.ilike(q),
                )
            )

        if category:
            stmt = stmt.where(Product.category.ilike(f"%{category}%"))

        if seller_address or seller_name:
            from app.models.user import Seller
            stmt = stmt.join(Seller, Product.seller)
            if seller_name:
                stmt = stmt.where(Seller.store_name.ilike(f"%{seller_name}%"))
            if seller_address:
                stmt = stmt.where(Seller.address.ilike(f"%{seller_address}%"))

        stmt = stmt.offset(offset).limit(limit)
        result = await db.execute(stmt)
        return list(result.scalars().all())
