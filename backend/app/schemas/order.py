from pydantic import BaseModel, ConfigDict, Field
from typing import List, Optional
from datetime import datetime

class OrderItemResponse(BaseModel):
    id: str
    order_id: str
    product_id: str
    quantity: int
    price: float
    product_name: Optional[str] = None
    product_image_url: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)

class OrderResponse(BaseModel):
    id: str
    user_id: str
    seller_id: str
    status: str
    total_price: float
    rating: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    seller_name: Optional[str] = None
    items: List[OrderItemResponse] = []

    model_config = ConfigDict(from_attributes=True)

class OrderRatingUpdate(BaseModel):
    rating: int = Field(..., ge=1, le=5, description="Rating harus antara 1 sampai 5")
