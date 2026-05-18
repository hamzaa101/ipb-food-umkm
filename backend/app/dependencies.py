from typing import AsyncGenerator, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Header, HTTPException, Depends

from app.db.database import AsyncSessionLocal
from app.repositories.user_repository import UserRepository
from app.repositories.product_repository import ProductRepository
from app.services.user_service import UserService
from app.services.product_service import ProductService

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