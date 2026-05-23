from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.models.location import Location
from app.repositories.base import BaseRepository

class LocationRepository(BaseRepository[Location]):
    def __init__(self):
        super().__init__(Location)

    async def get_all(self, db: AsyncSession) -> List[Location]:
        result = await db.execute(select(Location).order_by(Location.name))
        return list(result.scalars().all())

    async def get_by_id(self, db: AsyncSession, location_id: str) -> Optional[Location]:
        result = await db.execute(select(Location).where(Location.id == location_id))
        return result.scalars().first()
