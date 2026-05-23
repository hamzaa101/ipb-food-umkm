from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from typing import Optional
from datetime import date

class PromoBase(BaseModel):
    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    promo_type: Optional[str] = None
    discount_percent: Optional[float] = None
    is_active: bool = True
    start_date: Optional[date] = None
    end_date: Optional[date] = None

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

class PromoCreate(PromoBase):
    pass

class PromoResponse(PromoBase):
    id: str
