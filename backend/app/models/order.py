from sqlalchemy import String, Integer, ForeignKey, DateTime, Float, Double
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
import uuid
from app.models.base import Base

class Order(Base):
    __tablename__ = "orders"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), nullable=False)
    seller_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), nullable=False) # Seller is also a user
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="Menunggu Konfirmasi")
    total_price: Mapped[float] = mapped_column(Double, nullable=False)
    rating: Mapped[int] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", foreign_keys="Order.user_id", back_populates="orders")
    seller = relationship("User", foreign_keys="Order.seller_id")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base):
    __tablename__ = "order_items"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id: Mapped[str] = mapped_column(String, ForeignKey("orders.id"), nullable=False)
    product_id: Mapped[str] = mapped_column(String, ForeignKey("products.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    price: Mapped[float] = mapped_column(Double, nullable=False) # Harga saat dipesan

    order = relationship("Order", back_populates="items")
    product = relationship("Product")
