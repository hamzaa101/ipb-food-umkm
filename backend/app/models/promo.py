from sqlalchemy import String, Text, Float, Boolean, Date
from sqlalchemy.orm import Mapped, mapped_column
import uuid
from app.models.base import Base

class Promo(Base):
    __tablename__ = "promos"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)
    promo_type: Mapped[str] = mapped_column(String(50), nullable=True)
    discount_percent: Mapped[float] = mapped_column(Float, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    start_date: Mapped[Date] = mapped_column(Date, nullable=True)
    end_date: Mapped[Date] = mapped_column(Date, nullable=True)
