from sqlalchemy import String, Enum, Time, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
import enum
from typing import List, Optional, TYPE_CHECKING
from datetime import time

from .base import Base, CoordinateMixin

if TYPE_CHECKING:
    from .order import Order
    from .product import Product, Promo, Rating

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

    __mapper_args__ = {
        "polymorphic_identity": "user",
        "polymorphic_on": "user_type",
    }

class Buyer(User, CoordinateMixin):
    __tablename__ = "buyers"

    id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), primary_key=True)

    orders: Mapped[List["Order"]] = relationship("Order", back_populates="buyer", cascade="all, delete-orphan")
    ratings: Mapped[List["Rating"]] = relationship("Rating", back_populates="buyer", cascade="all, delete-orphan")

    __mapper_args__ = {
        "polymorphic_identity": "buyer",
    }

class Seller(User, CoordinateMixin):
    __tablename__ = "sellers"

    id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), primary_key=True)
    store_name: Mapped[str] = mapped_column(String(100), nullable=False)
    open_time: Mapped[Optional[time]] = mapped_column(Time, nullable=True)
    close_time: Mapped[Optional[time]] = mapped_column(Time, nullable=True)
    address: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    verification_status: Mapped[SellerStatus] = mapped_column(Enum(SellerStatus), default=SellerStatus.PENDING, nullable=False)

    products: Mapped[List["Product"]] = relationship("Product", back_populates="seller", cascade="all, delete-orphan")
    promos: Mapped[List["Promo"]] = relationship("Promo", back_populates="seller", cascade="all, delete-orphan")

    __mapper_args__ = {
        "polymorphic_identity": "seller",
    }

class Admin(User):
    __tablename__ = "admins"

    id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), primary_key=True)
    role: Mapped[str] = mapped_column(String(50), nullable=False, default="admin")

    __mapper_args__ = {
        "polymorphic_identity": "admin",
    }

class Stakeholder(User):
    __tablename__ = "stakeholders"

    id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), primary_key=True)
    position: Mapped[str] = mapped_column(String(100), nullable=False)

    __mapper_args__ = {
        "polymorphic_identity": "stakeholder",
    }