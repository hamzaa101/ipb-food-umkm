from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Optional

from app.models.user import User as UserModel, Seller as SellerModel, Buyer as BuyerModel, SellerStatus
from app.models.product import Product as ProductModel
from app.domain.user import UserDomain, SellerDomain, BuyerDomain
from app.repositories.base import BaseRepository
from app.domain.mappers import Mapper

class UserRepository(BaseRepository[UserDomain, UserModel]):
    def __init__(self, db: AsyncSession):
        super().__init__(UserDomain, UserModel, db)

    async def get_sellers_by_status(self, status: SellerStatus) -> List[SellerDomain]:
        result = await self.db.execute(
            select(SellerModel).where(SellerModel.verification_status == status)
        )
        sellers = result.scalars().all()
        return [Mapper.to_domain(s, SellerDomain) for s in sellers]

    async def get_seller_by_id(self, seller_id: str) -> Optional[SellerDomain]:
        result = await self.db.execute(
            select(SellerModel).where(SellerModel.id == seller_id)
        )
        seller = result.scalars().first()
        return Mapper.to_domain(seller, SellerDomain) if seller else None

    async def count_sellers(self) -> int:
        result = await self.db.scalar(select(func.count(SellerModel.id)))
        return result or 0

    async def count_buyers(self) -> int:
        result = await self.db.scalar(select(func.count(BuyerModel.id)))
        return result or 0

    async def count_products(self) -> int:
        result = await self.db.scalar(select(func.count(ProductModel.id)))
        return result or 0

    async def get_by_phone(self, phone_number: str) -> Optional[UserDomain]:
        result = await self.db.execute(
            select(UserModel).where(UserModel.phone_number == phone_number)
        )
        user = result.scalars().first()
        if not user:
            return None
        if user.user_type == "seller":
            return Mapper.to_domain(user, SellerDomain)
        return Mapper.to_domain(user, BuyerDomain)
