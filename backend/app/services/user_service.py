from typing import List, Optional

from app.domain.user import SellerDomain, BuyerDomain, UserDomain
from app.models.user import SellerStatus
from app.repositories.user_repository import UserRepository
from app.core.security import hash_password, verify_password, create_access_token
from app.schemas.user import UserCreate

class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def get_seller_list(self) -> List[SellerDomain]:
        return await self.user_repo.get_sellers_by_status(SellerStatus.ACTIVE)

    async def get_seller_by_id(self, seller_id: str) -> Optional[SellerDomain]:
        return await self.user_repo.get_seller_by_id(seller_id)

    async def verify_seller(self, seller_id: str, status: SellerStatus) -> Optional[SellerDomain]:
        seller = await self.user_repo.get_seller_by_id(seller_id)
        if seller:
            if status == SellerStatus.ACTIVE:
                seller.verify()
            elif status == SellerStatus.REJECTED:
                seller.reject()
            await self.user_repo.update(seller)
        return seller

    async def get_dashboard_stats(self) -> dict:
        total_sellers = await self.user_repo.count_sellers()
        total_buyers = await self.user_repo.count_buyers()
        total_products = await self.user_repo.count_products()

        return {
            "total_sellers": total_sellers,
            "total_buyers": total_buyers,
            "total_products": total_products
        }

    async def register_user(self, user_create: UserCreate):
        existing = await self.user_repo.get_by_phone(user_create.phone_number)
        if existing:
            raise ValueError("Phone number already registered")

        hashed = hash_password(user_create.password)
        if user_create.user_type == "seller":
            user_domain = SellerDomain(
                name=user_create.name,
                phone_number=user_create.phone_number,
                password=hashed,
                user_type="seller",
                store_name=getattr(user_create, "store_name", ""),
                address=getattr(user_create, "address", None),
            )
        else:
            user_domain = BuyerDomain(
                name=user_create.name,
                phone_number=user_create.phone_number,
                password=hashed,
                user_type="buyer",
                address=getattr(user_create, "address", None),
            )

        created_user = await self.user_repo.save(user_domain)
        return created_user

    async def authenticate_user(self, phone_number: str, password: str):
        user = await self.user_repo.get_by_phone(phone_number)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user

    async def get_user_by_id(self, user_id: str):
        return await self.user_repo.get_by_id(user_id)

    async def update_user(self, user: UserDomain, updates: dict):
        for key, value in updates.items():
            if hasattr(user, key):
                setattr(user, key, value)
        updated_user = await self.user_repo.update(user)
        return updated_user

    async def change_password(self, user: UserDomain, current_password: str, new_password: str) -> bool:
        if not verify_password(current_password, user.password):
            return False
        user.password = hash_password(new_password)
        await self.user_repo.update(user)
        return True

    async def delete_user(self, user: UserDomain, password: str) -> bool:
        if not verify_password(password, user.password):
            return False
        await self.user_repo.delete(user)
        return True

    def create_access_token(self, data: dict, expires_minutes: int | None = None) -> str:
        if expires_minutes:
            from datetime import timedelta
            return create_access_token(data, expires_delta=timedelta(minutes=expires_minutes))
        return create_access_token(data)
