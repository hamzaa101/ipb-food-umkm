from pydantic import Field
from typing import Optional, List
from datetime import datetime
import uuid
from .user import DomainModel

class OrderItemDomain(DomainModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str
    product_id: str
    quantity: int
    price: float

    @property
    def subtotal(self) -> float:
        return self.quantity * self.price

class OrderDomain(DomainModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    seller_id: str
    status: str = "Menunggu Konfirmasi"
    total_price: float = 0.0
    rating: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    items: List[OrderItemDomain] = Field(default_factory=list)

    def add_item(self, product_id: str, quantity: int, price: float):
        item = OrderItemDomain(
            order_id=self.id,
            product_id=product_id,
            quantity=quantity,
            price=price
        )
        self.items.append(item)
        self.recalculate_total()
        
    def recalculate_total(self):
        self.total_price = sum(item.subtotal for item in self.items)
        
    def update_status(self, new_status: str):
        valid_statuses = ["Menunggu Konfirmasi", "Diproses", "Selesai", "Dibatalkan"]
        if new_status not in valid_statuses:
            raise ValueError(f"Invalid status: {new_status}")
        self.status = new_status
        self.updated_at = datetime.utcnow()
        
    def add_rating(self, rating: int):
        if self.status != "Selesai":
            raise ValueError("Can only rate completed orders")
        if not 1 <= rating <= 5:
            raise ValueError("Rating must be between 1 and 5")
        self.rating = rating
        self.updated_at = datetime.utcnow()
