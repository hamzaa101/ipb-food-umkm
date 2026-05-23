from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_db, get_location_service
from app.services.location_service import LocationService
from app.schemas.location import LocationResponse

router = APIRouter()

class LocationController:
    def __init__(self, db: AsyncSession, location_service: LocationService):
        self.db = db
        self.location_service = location_service

    async def list_locations(self) -> List[LocationResponse]:
        locations = await self.location_service.list_locations(self.db)
        return locations


def get_location_controller(
    db: AsyncSession = Depends(get_db),
    location_service: LocationService = Depends(get_location_service),
) -> LocationController:
    return LocationController(db, location_service)


@router.get("/", response_model=List[LocationResponse])
async def read_locations(controller: LocationController = Depends(get_location_controller)):
    return await controller.list_locations()
