from typing import AsyncGenerator, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Header, HTTPException, Depends

from app.db.database import AsyncSessionLocal
from app.repositories.user_repository import UserRepository
from app.repositories.product_repository import ProductRepository
from app.services.user_service import UserService
from app.services.product_service import ProductService
from app.core.security import decode_access_token

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session

def get_user_repository() -> UserRepository:
    return UserRepository()

def get_product_repository() -> ProductRepository:
    return ProductRepository()

def get_user_service(repo: UserRepository = Depends(get_user_repository)) -> UserService:
    return UserService(repo)

def get_product_service(repo: ProductRepository = Depends(get_product_repository)) -> ProductService:
    return ProductService(repo)

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

    user = await UserRepository().get(db, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user