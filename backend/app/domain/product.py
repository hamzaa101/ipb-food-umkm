from pydantic import Field
from typing import Optional
import uuid
from .user import DomainModel

class ProductDomain(DomainModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    seller_id: str
    name: str
    description: Optional[str] = None
    price: float
    stock: int = 0
    image_url: Optional[str] = None
    category: str
    
    def decrease_stock(self, quantity: int):
        if self.stock < quantity:
            raise ValueError("Insufficient stock")
        self.stock -= quantity
        
    def increase_stock(self, quantity: int):
        self.stock += quantity
        
    def update_price(self, new_price: float):
        if new_price < 0:
            raise ValueError("Price cannot be negative")
        self.price = new_price
