from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import time
import uuid

class DomainModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

class UserDomain(DomainModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone_number: str
    password: str
    user_type: str
    profile_image_url: Optional[str] = None
    
    def change_name(self, new_name: str):
        if not new_name:
            raise ValueError("Name cannot be empty")
        self.name = new_name

class BuyerDomain(UserDomain):
    user_type: str = "buyer"
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class SellerDomain(UserDomain):
    user_type: str = "seller"
    store_name: str
    address: Optional[str] = None
    store_image_url: Optional[str] = None
    verification_status: str = "pending"
    open_time: Optional[time] = None
    close_time: Optional[time] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

    def verify(self):
        self.verification_status = "active"
        
    def reject(self):
        self.verification_status = "rejected"
        
    def is_open(self, current_time: time) -> bool:
        if not self.open_time or not self.close_time:
            return True # Assume open if no time specified
        if self.open_time <= self.close_time:
            return self.open_time <= current_time <= self.close_time
        else: # spans midnight
            return current_time >= self.open_time or current_time <= self.close_time
