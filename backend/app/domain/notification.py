from pydantic import Field
from typing import Optional
from datetime import datetime
import uuid
from .user import DomainModel

class NotificationDomain(DomainModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    message: Optional[str] = None
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    def mark_as_read(self):
        self.is_read = True
