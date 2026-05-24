from typing import Any, Generic, List, Optional, Type, TypeVar
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.domain.mappers import Mapper
from pydantic import BaseModel
from app.models.base import Base

DomainType = TypeVar("DomainType", bound=BaseModel)
ModelType = TypeVar("ModelType", bound=Base)

class BaseRepository(Generic[DomainType, ModelType]):
    def __init__(self, domain_class: Type[DomainType], model_class: Type[ModelType], db: AsyncSession):
        self.domain_class = domain_class
        self.model_class = model_class
        self.db = db

    async def get_by_id(self, id: Any) -> Optional[DomainType]:
        result = await self.db.execute(select(self.model_class).filter(self.model_class.id == id))
        orm_obj = result.scalars().first()
        return Mapper.to_domain(orm_obj, self.domain_class) if orm_obj else None

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[DomainType]:
        result = await self.db.execute(select(self.model_class).offset(skip).limit(limit))
        orm_objs = result.scalars().all()
        return [Mapper.to_domain(obj, self.domain_class) for obj in orm_objs]

    async def save(self, entity: DomainType) -> DomainType:
        orm_obj = Mapper.to_orm(entity, self.model_class)
        self.db.add(orm_obj)
        await self.db.commit()
        await self.db.refresh(orm_obj)
        return Mapper.to_domain(orm_obj, self.domain_class)

    async def update(self, entity: DomainType) -> DomainType:
        orm_obj = Mapper.to_orm(entity, self.model_class)
        await self.db.merge(orm_obj)
        await self.db.commit()
        return entity

    async def delete(self, entity: DomainType) -> None:
        result = await self.db.execute(select(self.model_class).filter(self.model_class.id == entity.id))
        orm_obj = result.scalars().first()
        if orm_obj:
            await self.db.delete(orm_obj)
            await self.db.commit()

    async def delete_by_id(self, id: Any) -> bool:
        result = await self.db.execute(select(self.model_class).filter(self.model_class.id == id))
        orm_obj = result.scalars().first()
        if orm_obj:
            await self.db.delete(orm_obj)
            await self.db.commit()
            return True
        return False
