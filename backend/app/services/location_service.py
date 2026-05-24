from typing import List, Optional
from app.repositories.location_repository import LocationRepository
from app.domain.location import LocationDomain

class LocationService:
    def __init__(self, location_repo: LocationRepository):
        self.location_repo = location_repo

    async def get_locations(self) -> List[LocationDomain]:
        return await self.location_repo.get_all()

    async def get_location_by_id(self, location_id: str) -> Optional[LocationDomain]:
        return await self.location_repo.get_by_id(location_id)
