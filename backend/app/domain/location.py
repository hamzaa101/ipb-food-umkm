from pydantic import Field
import uuid
from .user import DomainModel

class LocationDomain(DomainModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
