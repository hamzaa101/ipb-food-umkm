from typing import AsyncGenerator, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Header, HTTPException, Depends

from app.db.database import AsyncSessionLocal
from app.repositories.user_repository import UserRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.promo_repository import PromoRepository
from app.repositories.cart_repository import CartRepository
from app.repositories.notification_repository import NotificationRepository
from app.repositories.location_repository import LocationRepository
from app.repositories.seller_application_repository import SellerApplicationRepository
from app.repositories.order_repository import OrderRepository

from app.services.user_service import UserService
from app.services.product_service import ProductService
from app.services.promo_service import PromoService
from app.services.cart_service import CartService
from app.services.notification_service import NotificationService
from app.services.location_service import LocationService
from app.services.seller_application_service import SellerApplicationService
from app.services.order_service import OrderService
from app.core.security import decode_access_token

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session

# Repositories
def get_user_repository(db: AsyncSession = Depends(get_db)) -> UserRepository:
    return UserRepository(db)

def get_product_repository(db: AsyncSession = Depends(get_db)) -> ProductRepository:
    return ProductRepository(db)

def get_promo_repository(db: AsyncSession = Depends(get_db)) -> PromoRepository:
    return PromoRepository(db)

def get_cart_repository(db: AsyncSession = Depends(get_db)) -> CartRepository:
    return CartRepository(db)

def get_location_repository(db: AsyncSession = Depends(get_db)) -> LocationRepository:
    return LocationRepository(db)

def get_seller_application_repository(db: AsyncSession = Depends(get_db)) -> SellerApplicationRepository:
    return SellerApplicationRepository(db)

def get_notification_repository(db: AsyncSession = Depends(get_db)) -> NotificationRepository:
    return NotificationRepository(db)

def get_order_repository(db: AsyncSession = Depends(get_db)) -> OrderRepository:
    return OrderRepository(db)

# Services
def get_user_service(repo: UserRepository = Depends(get_user_repository)) -> UserService:
    return UserService(repo)

def get_product_service(repo: ProductRepository = Depends(get_product_repository)) -> ProductService:
    return ProductService(repo)

def get_promo_service(repo: PromoRepository = Depends(get_promo_repository)) -> PromoService:
    return PromoService(repo)

def get_cart_service(repo: CartRepository = Depends(get_cart_repository)) -> CartService:
    return CartService(repo)

def get_location_service(repo: LocationRepository = Depends(get_location_repository)) -> LocationService:
    return LocationService(repo)

def get_seller_application_service(
    repo: SellerApplicationRepository = Depends(get_seller_application_repository),
    location_repo: LocationRepository = Depends(get_location_repository),
    notification_repo: NotificationRepository = Depends(get_notification_repository),
) -> SellerApplicationService:
    return SellerApplicationService(repo, location_repo, notification_repo)

def get_notification_service(repo: NotificationRepository = Depends(get_notification_repository)) -> NotificationService:
    return NotificationService(repo)

def get_order_service(
    order_repo: OrderRepository = Depends(get_order_repository),
    cart_repo: CartRepository = Depends(get_cart_repository),
    product_repo: ProductRepository = Depends(get_product_repository),
    user_repo: UserRepository = Depends(get_user_repository)
) -> OrderService:
    return OrderService(order_repo, cart_repo, product_repo, user_repo)

async def get_current_user(
    db: AsyncSession = Depends(get_db),
    authorization: Optional[str] = Header(None)
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    try:
        payload = decode_access_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user_repo = UserRepository(db)
    user = await user_repo.get_by_id(user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user