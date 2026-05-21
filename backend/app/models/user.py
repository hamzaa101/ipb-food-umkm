from sqlalchemy import String, Enum, Time, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
import enum
from typing import List, Optional, TYPE_CHECKING
from datetime import time
from app.models.base import Base, CoordinateMixin

if TYPE_CHECKING:
    from .product import Product

class SellerStatus(enum.Enum):
    PENDING = "pending"
    ACTIVE = "active"
    REJECTED = "rejected"

class User(Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    phone_number: Mapped[str] = mapped_column(String(20), nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    user_type: Mapped[str] = mapped_column(String(50), nullable=False)
    __mapper_args__ = {"polymorphic_identity": "user", "polymorphic_on": "user_type"}

class Buyer(User, CoordinateMixin):
    __tablename__ = "buyers"
    id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), primary_key=True)
    __mapper_args__ = {"polymorphic_identity": "buyer"}

class Seller(User, CoordinateMixin):
    __tablename__ = "sellers"
    id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), primary_key=True)
    store_name: Mapped[str] = mapped_column(String(100), nullable=False)
    products: Mapped[List["Product"]] = relationship("Product", back_populates="seller")
    __mapper_args__ = {"polymorphic_identity": "seller"}