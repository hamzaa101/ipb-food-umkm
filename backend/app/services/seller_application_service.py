from typing import List, Optional

from app.repositories.seller_application_repository import SellerApplicationRepository
from app.repositories.location_repository import LocationRepository
from app.repositories.notification_repository import NotificationRepository
from app.domain.seller_application import SellerApplicationDomain
from app.domain.notification import NotificationDomain
from app.schemas.seller_application import SellerApplicationCreate

class SellerApplicationService:
    def __init__(self, seller_app_repo: SellerApplicationRepository, location_repo: LocationRepository, notification_repo: NotificationRepository):
        self.seller_app_repo = seller_app_repo
        self.location_repo = location_repo
        self.notification_repo = notification_repo

    async def submit_application(self, user_id: str, application_in: SellerApplicationCreate) -> SellerApplicationDomain:
        location = await self.location_repo.get_by_id(application_in.location_id)
        if not location:
            raise ValueError("Lokasi toko tidak ditemukan")

        existing = await self.seller_app_repo.get_by_user(user_id)
        if any(app.status == "pending" for app in existing):
            raise ValueError("Anda sudah mengajukan pendaftaran toko yang sedang diproses")

        application_domain = SellerApplicationDomain(
            user_id=user_id,
            store_name=application_in.store_name,
            store_image_url=application_in.store_image_url,
            location_id=application_in.location_id,
        )
        return await self.seller_app_repo.save(application_domain)

    async def get_user_applications(self, user_id: str) -> List[SellerApplicationDomain]:
        return await self.seller_app_repo.get_by_user(user_id)

    async def get_application(self, application_id: str) -> Optional[SellerApplicationDomain]:
        return await self.seller_app_repo.get_by_id(application_id)

    async def update_application_status(self, application_id: str, status: str, rejected_reason: Optional[str] = None) -> Optional[SellerApplicationDomain]:
        application = await self.seller_app_repo.get_by_id(application_id)
        if not application:
            return None
        
        if status == "approved":
            application.approve()
        elif status == "rejected":
            application.reject(rejected_reason)
            
        updated_app = await self.seller_app_repo.update(application)

        if status in ["approved", "rejected"]:
            message = f"Pendaftaran toko Anda {'disetujui' if status == 'approved' else 'ditolak'}"
            notification = NotificationDomain(
                user_id=application.user_id,
                title="Status Pendaftaran Toko",
                message=message
            )
            await self.notification_repo.save(notification)

        return updated_app
