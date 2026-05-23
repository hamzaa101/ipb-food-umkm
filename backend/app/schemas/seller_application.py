from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from typing import Optional
from datetime import datetime

class SellerApplicationCreate(BaseModel):
    store_name: str
    store_image_url: Optional[str] = None
    location_id: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

class SellerApplicationResponse(BaseModel):
    id: str
    user_id: str
    store_name: str
    store_image_url: Optional[str] = None
    location_id: str
    location_name: Optional[str] = None
    status: str
    submitted_at: datetime
    reviewed_at: Optional[datetime] = None
    rejected_reason: Optional[str] = None

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )
