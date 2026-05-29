from sqlalchemy import String, Enum, Time, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
import enum
from typing import List, Optional, TYPE_CHECKING
from datetime import time
from app.models.base import Base, CoordinateMixin

if TYPE_CHECKING:
    from .product import Product
    from .order import Order
    from .cart import CartItem

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
    profile_image_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    orders: Mapped[List["Order"]] = relationship("Order", foreign_keys="Order.user_id", back_populates="user")
    cart_items: Mapped[List["CartItem"]] = relationship("CartItem", back_populates="user", cascade="all, delete-orphan")
    __mapper_args__ = {"polymorphic_identity": "user", "polymorphic_on": "user_type"}

class Buyer(User, CoordinateMixin):
    __tablename__ = "buyers"
    id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), primary_key=True)
    address: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    __mapper_args__ = {"polymorphic_identity": "buyer"}

class Seller(User, CoordinateMixin):
    __tablename__ = "sellers"
    id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), primary_key=True)
    store_name: Mapped[str] = mapped_column(String(100), nullable=False)
    address: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    store_image_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    verification_status: Mapped[SellerStatus] = mapped_column(
        Enum(SellerStatus, values_callable=lambda x: [e.value for e in x]), 
        default=SellerStatus.PENDING
    )
    open_time: Mapped[Optional[time]] = mapped_column(Time, nullable=True)
    close_time: Mapped[Optional[time]] = mapped_column(Time, nullable=True)
    is_accepting_orders: Mapped[bool] = mapped_column(Boolean, default=True)
    products: Mapped[List["Product"]] = relationship("Product", back_populates="seller")
    __mapper_args__ = {"polymorphic_identity": "seller"}