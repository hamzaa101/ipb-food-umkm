from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from typing import List
from app.models.base import Base

class Location(Base):
    __tablename__ = "locations"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(150), nullable=False, unique=True)

    seller_applications: Mapped[List["SellerApplication"]]
    seller_applications = relationship("SellerApplication", back_populates="location")
