from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.dependencies import get_db, get_promo_service
from app.services.promo_service import PromoService
from app.schemas.promo import PromoResponse

router = APIRouter()

@router.get("/", response_model=List[PromoResponse])
async def read_promos(
    db: AsyncSession = Depends(get_db),
    promo_service: PromoService = Depends(get_promo_service),
):
    return await promo_service.get_active_promos(db)
