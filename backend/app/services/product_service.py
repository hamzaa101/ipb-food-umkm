from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate
from app.repositories.product_repository import ProductRepository

class ProductService:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    async def get_products(self, db: AsyncSession, seller_id: Optional[str] = None) -> List[Product]:
        return await self.product_repo.get_products(db, seller_id)

    async def search_products(
        self,
        db: AsyncSession,
        query: Optional[str] = None,
        category: Optional[str] = None,
        seller_address: Optional[str] = None,
        seller_name: Optional[str] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> List[Product]:
        return await self.product_repo.search_products(
            db,
            query=query,
            category=category,
            seller_address=seller_address,
            seller_name=seller_name,
            limit=limit,
            offset=offset,
        )

    async def get_product_by_id(self, db: AsyncSession, product_id: str) -> Optional[Product]:
        return await self.product_repo.get_product_by_id(db, product_id)

    async def create_product(self, db: AsyncSession, product_in: ProductCreate, seller_id: str) -> Product:
        product_data = product_in.model_dump()
        product_data["seller_id"] = seller_id
        return await self.product_repo.create(db, product_data)

    async def update_product(self, db: AsyncSession, product_id: str, product_in: ProductUpdate) -> Optional[Product]:
        product = await self.product_repo.get_product_by_id(db, product_id)
        if product:
            update_data = product_in.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(product, field, value)
            await db.commit()
            await db.refresh(product)
        return product

    async def delete_product(self, db: AsyncSession, product_id: str) -> bool:
        return await self.product_repo.delete(db, product_id)

