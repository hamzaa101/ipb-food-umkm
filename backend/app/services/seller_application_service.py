from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from datetime import datetime

from app.models.seller_application import SellerApplication, SellerApplicationStatus
from app.repositories.seller_application_repository import SellerApplicationRepository
from app.repositories.location_repository import LocationRepository
from app.services.notification_service import NotificationService
from app.schemas.seller_application import SellerApplicationCreate
from app.models.location import Location

class SellerApplicationService:
    def __init__(
        self,
        application_repo: SellerApplicationRepository,
        location_repo: LocationRepository,
        notification_service: NotificationService,
    ):
        self.application_repo = application_repo
        self.location_repo = location_repo
        self.notification_service = notification_service

    async def submit_application(self, db: AsyncSession, user_id: str, application_in: SellerApplicationCreate) -> SellerApplication:
        location = await self.location_repo.get_by_id(db, application_in.location_id)
        if not location:
            raise ValueError("Lokasi toko tidak ditemukan")

        existing = await self.application_repo.get_by_user(db, user_id)
        if any(app.status == SellerApplicationStatus.PENDING for app in existing):
            raise ValueError("Anda sudah mengajukan pendaftaran toko yang sedang diproses")

        application_data = {
            "user_id": user_id,
            "store_name": application_in.store_name,
            "store_image_url": application_in.store_image_url,
            "location_id": application_in.location_id,
            "status": SellerApplicationStatus.PENDING,
        }
        return await self.application_repo.create_application(db, application_data)

    async def get_user_applications(self, db: AsyncSession, user_id: str) -> List[SellerApplication]:
        return await self.application_repo.get_by_user(db, user_id)

    async def get_application(self, db: AsyncSession, application_id: str) -> Optional[SellerApplication]:
        return await self.application_repo.get_by_id(db, application_id)

    async def update_application_status(self, db: AsyncSession, application_id: str, status: SellerApplicationStatus, rejected_reason: Optional[str] = None) -> Optional[SellerApplication]:
        application = await self.application_repo.get_by_id(db, application_id)
        if not application:
            return None
        application.status = status
        application.rejected_reason = rejected_reason
        application.reviewed_at = datetime.utcnow()
        await db.commit()
        await db.refresh(application)

        if status != SellerApplicationStatus.PENDING:
            message = f"Pendaftaran toko Anda {'disetujui' if status == SellerApplicationStatus.APPROVED else 'ditolak'}"
            await self.notification_service.create_notification(
                db,
                data={
                    "user_id": application.user_id,
                    "title": "Status Pendaftaran Toko",
                    "message": message,
                },
            )
        return application
