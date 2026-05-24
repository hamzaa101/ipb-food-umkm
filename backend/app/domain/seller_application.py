from pydantic import Field
from typing import Optional
from datetime import datetime
import uuid
from .user import DomainModel

class SellerApplicationDomain(DomainModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    store_name: str
    store_image_url: Optional[str] = None
    location_id: str
    status: str = "pending"
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    reviewed_at: Optional[datetime] = None
    rejected_reason: Optional[str] = None
    
    def approve(self):
        if self.status != "pending":
            raise ValueError("Only pending applications can be approved")
        self.status = "approved"
        self.reviewed_at = datetime.utcnow()
        
    def reject(self, reason: str):
        if self.status != "pending":
            raise ValueError("Only pending applications can be rejected")
        self.status = "rejected"
        self.rejected_reason = reason
        self.reviewed_at = datetime.utcnow()
