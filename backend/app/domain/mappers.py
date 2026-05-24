from typing import TypeVar, Type, Any
from pydantic import BaseModel
from app.models.base import Base

D = TypeVar('D', bound=BaseModel)
O = TypeVar('O', bound=Base)

class Mapper:
    @staticmethod
    def to_domain(orm_obj: O, domain_class: Type[D]) -> D:
        if not orm_obj:
            return None
        # Convert ORM object to dict, ignoring SQLAlchemy internal state
        data = {c.name: getattr(orm_obj, c.name) for c in orm_obj.__table__.columns}
        return domain_class(**data)

    @staticmethod
    def to_orm(domain_obj: D, orm_class: Type[O]) -> O:
        if not domain_obj:
            return None
        return orm_class(**domain_obj.model_dump(exclude_unset=True))
