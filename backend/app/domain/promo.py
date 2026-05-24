from pydantic import Field
from typing import Optional
from datetime import date
import uuid
from .user import DomainModel

class PromoDomain(DomainModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    promo_type: Optional[str] = None
    discount_percent: Optional[float] = None
    is_active: bool = True
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    
    def is_valid(self, current_date: date) -> bool:
        if not self.is_active:
            return False
        if self.start_date and current_date < self.start_date:
            return False
        if self.end_date and current_date > self.end_date:
            return False
        return True
        
    def deactivate(self):
        self.is_active = False
        
    def activate(self):
        self.is_active = True
