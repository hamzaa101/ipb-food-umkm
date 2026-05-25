from fastapi import APIRouter, Depends, Query
from typing import List, Optional

from app.dependencies import get_product_service
from app.services.product_service import ProductService
from app.schemas.product import ProductResponse

router = APIRouter()

@router.get("/", response_model=List[ProductResponse])
async def read_products(
    q: Optional[str] = Query(None, description="Search keyword for product name or description"),
    category: Optional[str] = Query(None, description="Product category filter"),
    seller_address: Optional[str] = Query(None, description="Filter by seller address or area"),
    seller_name: Optional[str] = Query(None, description="Filter by seller/store name"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    product_service: ProductService = Depends(get_product_service),
):
    products = await product_service.search_products(
        query=q,
        category=category,
        seller_address=seller_address,
        seller_name=seller_name,
        limit=limit,
        offset=offset,
    )
    return products