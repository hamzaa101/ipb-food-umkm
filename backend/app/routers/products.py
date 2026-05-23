from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.dependencies import get_db, get_product_service
from app.services.product_service import ProductService
from app.schemas.product import ProductResponse

router = APIRouter()

@router.get("/", response_model=List[ProductResponse])
async def read_products(
    db: AsyncSession = Depends(get_db),
    product_service: ProductService = Depends(get_product_service)
):
    
    products = await product_service.get_products(db)
    return products