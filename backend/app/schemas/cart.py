from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from typing import Optional

class CartItemBase(BaseModel):
    product_id: str
    quantity: int

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(BaseModel):
    quantity: Optional[int] = None

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

class CartItemResponse(CartItemBase):
    id: str
    product_name: Optional[str] = None
    product_price: Optional[float] = None
    product_image_url: Optional[str] = None
