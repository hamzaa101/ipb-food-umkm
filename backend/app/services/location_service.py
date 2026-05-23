from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.models.location import Location
from app.repositories.location_repository import LocationRepository

class LocationService:
    def __init__(self, location_repo: LocationRepository):
        self.location_repo = location_repo

    async def list_locations(self, db: AsyncSession) -> List[Location]:
        return await self.location_repo.get_all(db)

    async def get_location(self, db: AsyncSession, location_id: str) -> Location:
        return await self.location_repo.get_by_id(db, location_id)
