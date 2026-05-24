from pydantic import Field
from typing import Optional
from datetime import datetime
import uuid
from .user import DomainModel

class CartItemDomain(DomainModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    product_id: str
    quantity: int = 1
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    def increase_quantity(self, amount: int = 1):
        self.quantity += amount
        self.updated_at = datetime.utcnow()
        
    def decrease_quantity(self, amount: int = 1):
        if self.quantity - amount < 1:
            raise ValueError("Quantity cannot be less than 1")
        self.quantity -= amount
        self.updated_at = datetime.utcnow()
