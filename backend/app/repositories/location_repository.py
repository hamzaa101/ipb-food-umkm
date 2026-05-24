from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.models.location import Location as LocationModel
from app.domain.location import LocationDomain
from app.domain.mappers import Mapper
from app.repositories.base import BaseRepository

class LocationRepository(BaseRepository[LocationDomain, LocationModel]):
    def __init__(self, db: AsyncSession):
        super().__init__(LocationDomain, LocationModel, db)

    async def get_all(self) -> List[LocationDomain]:
        result = await self.db.execute(select(LocationModel).order_by(LocationModel.name))
        return [Mapper.to_domain(loc, LocationDomain) for loc in result.scalars().all()]
