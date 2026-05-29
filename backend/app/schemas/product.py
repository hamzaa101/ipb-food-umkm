from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel
from typing import Optional, List

class ProductBase(BaseModel):
    name: str
    price: float
    description: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    is_available: bool = True
    seller_id: Optional[str] = None
    stock: int = 0

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    is_available: Optional[bool] = None

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

class ProductResponse(ProductBase):
    id: str
    sold_count: int
    average_rating: float
    # We map seller_id to storeId for frontend using Field or alias generator handles it mostly, 
    # but frontend expects storeId instead of sellerId. Let's explicit alias it or just use store_id
    store_id: str = Field(validation_alias='seller_id', serialization_alias='storeId')
    
    # ensure it uses storeId via serialization
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )
    
    @classmethod
    def from_orm(cls, obj):
        from pydantic import BaseModel
        # Safely handle both ORM objects and Pydantic domain models
        if isinstance(obj, BaseModel):
            # If it's a domain model, we can return model_validate directly
            return super().model_validate(obj)
        # For SQLAlchemy ORM
        try:
            setattr(obj, 'store_id', obj.seller_id)
        except Exception:
            pass
        return super().model_validate(obj)


class SellerProductsResponse(BaseModel):
    products: List[ProductResponse]
    counts: dict

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

