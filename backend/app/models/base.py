from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Float

class Base(DeclarativeBase):
    pass

class CoordinateMixin:
    latitude: Mapped[float] = mapped_column(Float, nullable=True)
    longitude: Mapped[float] = mapped_column(Float, nullable=True)
