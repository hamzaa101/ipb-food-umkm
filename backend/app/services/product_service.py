from typing import List, Optional
from app.repositories.product_repository import ProductRepository
from app.domain.product import ProductDomain
from app.schemas.product import ProductCreate, ProductUpdate

class ProductService:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    async def get_products(self, seller_id: Optional[str] = None) -> List[ProductDomain]:
        return await self.product_repo.get_products(seller_id)

    async def get_product(self, product_id: str) -> Optional[ProductDomain]:
        return await self.product_repo.get_product_by_id(product_id)

    async def create_product(self, product_in: ProductCreate, seller_id: str) -> ProductDomain:
        product = ProductDomain(
            seller_id=seller_id,
            name=product_in.name,
            description=product_in.description,
            price=product_in.price,
            stock=product_in.stock,
            image_url=product_in.image_url,
            category=product_in.category
        )
        return await self.product_repo.save(product)

    async def update_product(self, product_id: str, product_in: ProductUpdate, seller_id: str) -> Optional[ProductDomain]:
        product = await self.product_repo.get_product_by_id(product_id)
        if not product or product.seller_id != seller_id:
            return None
        
        update_data = product_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(product, field, value)
            
        return await self.product_repo.update(product)

    async def delete_product(self, product_id: str, seller_id: str) -> bool:
        product = await self.product_repo.get_product_by_id(product_id)
        if not product or product.seller_id != seller_id:
            return False
            
        await self.product_repo.delete(product)
        return True

    async def search_products(
        self,
        query: Optional[str] = None,
        category: Optional[str] = None,
        seller_name: Optional[str] = None,
        seller_address: Optional[str] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> List[ProductDomain]:
        return await self.product_repo.search_products(
            query=query,
            category=category,
            seller_name=seller_name,
            seller_address=seller_address,
            limit=limit,
            offset=offset,
        )
