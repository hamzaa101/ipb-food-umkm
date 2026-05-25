from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.dependencies import get_current_user, get_seller_application_service
from app.services.seller_application_service import SellerApplicationService
from app.schemas.seller_application import SellerApplicationCreate, SellerApplicationResponse
from app.domain.user import UserDomain

router = APIRouter()

class SellerApplicationController:
    def __init__(self, seller_application_service: SellerApplicationService):
        self.seller_application_service = seller_application_service

    async def submit_application(self, user: UserDomain, application_in: SellerApplicationCreate) -> SellerApplicationResponse:
        try:
            application = await self.seller_application_service.submit_application(user.id, application_in)
            return application
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    async def get_my_applications(self, user: UserDomain) -> List[SellerApplicationResponse]:
        applications = await self.seller_application_service.get_user_applications(user.id)
        return applications

    async def get_my_application(self, user: UserDomain, application_id: str) -> SellerApplicationResponse:
        application = await self.seller_application_service.get_application(application_id)
        if not application or application.user_id != user.id:
            raise HTTPException(status_code=404, detail="Application not found")
        return application


def get_seller_application_controller(
    seller_application_service: SellerApplicationService = Depends(get_seller_application_service),
) -> SellerApplicationController:
    return SellerApplicationController(seller_application_service)


@router.post("/", response_model=SellerApplicationResponse)
async def create_seller_application(
    application_in: SellerApplicationCreate,
    current_user: UserDomain = Depends(get_current_user),
    controller: SellerApplicationController = Depends(get_seller_application_controller),
):
    return await controller.submit_application(current_user, application_in)


@router.get("/", response_model=List[SellerApplicationResponse])
async def list_my_seller_applications(
    current_user: UserDomain = Depends(get_current_user),
    controller: SellerApplicationController = Depends(get_seller_application_controller),
):
    return await controller.get_my_applications(current_user)


@router.get("/{application_id}", response_model=SellerApplicationResponse)
async def get_seller_application(
    application_id: str,
    current_user: UserDomain = Depends(get_current_user),
    controller: SellerApplicationController = Depends(get_seller_application_controller),
):
    return await controller.get_my_application(current_user, application_id)
