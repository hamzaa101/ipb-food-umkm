from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.models.user import Seller, SellerStatus
from app.repositories.user_repository import UserRepository
from app.core.security import hash_password, verify_password, create_access_token
from app.schemas.user import UserCreate
from app.models.user import Buyer

class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def get_seller_list(self, db: AsyncSession) -> List[Seller]:
        return await self.user_repo.get_sellers_by_status(db, SellerStatus.ACTIVE)

    async def get_seller_by_id(self, db: AsyncSession, seller_id: str) -> Optional[Seller]:
        return await self.user_repo.get_seller_by_id(db, seller_id)

    async def verify_seller(self, db: AsyncSession, seller_id: str, status: SellerStatus) -> Optional[Seller]:
        seller = await self.user_repo.get_seller_by_id(db, seller_id)
        if seller:
            seller.verification_status = status
            await db.commit()
            await db.refresh(seller)
        return seller

    async def get_dashboard_stats(self, db: AsyncSession) -> dict:
        total_sellers = await self.user_repo.count_sellers(db)
        total_buyers = await self.user_repo.count_buyers(db)
        total_products = await self.user_repo.count_products(db)

        return {
            "total_sellers": total_sellers,
            "total_buyers": total_buyers,
            "total_products": total_products
        }

    async def register_user(self, db: AsyncSession, user_create: UserCreate):
        existing = await self.user_repo.get_by_phone(db, user_create.phone_number)
        if existing:
            raise ValueError("Phone number already registered")

        hashed = hash_password(user_create.password)
        if user_create.user_type == "seller":
            user_obj = Seller(
                name=user_create.name,
                phone_number=user_create.phone_number,
                password=hashed,
                user_type="seller",
                store_name=getattr(user_create, "store_name", ""),
                address=getattr(user_create, "address", None),
            )
        else:
            user_obj = Buyer(
                name=user_create.name,
                phone_number=user_create.phone_number,
                password=hashed,
                user_type="buyer",
                address=getattr(user_create, "address", None),
            )

        return await self.user_repo.create_user(db, user_obj)

    async def authenticate_user(self, db: AsyncSession, phone_number: str, password: str):
        user = await self.user_repo.get_by_phone(db, phone_number)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user

    async def get_user_by_id(self, db: AsyncSession, user_id: str):
        return await self.user_repo.get(db, user_id)

    async def update_user(self, db: AsyncSession, user, updates: dict):
        return await self.user_repo.update(db, db_obj=user, obj_in=updates)

    def create_access_token(self, data: dict, expires_minutes: int | None = None) -> str:
        if expires_minutes:
            from datetime import timedelta

            return create_access_token(data, expires_delta=timedelta(minutes=expires_minutes))
        return create_access_token(data)
