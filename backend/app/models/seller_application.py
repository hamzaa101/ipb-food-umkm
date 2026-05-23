from sqlalchemy import String, Enum, Text, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
import uuid
import enum
from typing import Optional
from app.models.base import Base

class SellerApplicationStatus(enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class SellerApplication(Base):
    __tablename__ = "seller_applications"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), nullable=False)
    store_name: Mapped[str] = mapped_column(String(100), nullable=False)
    store_image_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    location_id: Mapped[str] = mapped_column(String, ForeignKey("locations.id"), nullable=False)
    status: Mapped[SellerApplicationStatus] = mapped_column(Enum(SellerApplicationStatus), default=SellerApplicationStatus.PENDING)
    submitted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    reviewed_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    rejected_reason: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    user = relationship("User")
    location = relationship("Location", back_populates="seller_applications")
