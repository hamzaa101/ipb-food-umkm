from fastapi import APIRouter, Depends, Query, HTTPException, UploadFile, File
from typing import List, Optional
import os
import shutil
import uuid

from app.dependencies import get_product_service, get_current_user
from app.services.product_service import ProductService
from app.schemas.product import ProductResponse, ProductCreate, ProductUpdate, SellerProductsResponse
from app.domain.user import UserDomain

router = APIRouter()

@router.post("/upload")
async def upload_product_image(
    file: UploadFile = File(...),
    current_user: UserDomain = Depends(get_current_user),
):
    if current_user.user_type != "seller":
        raise HTTPException(status_code=403, detail="Hanya penjual yang dapat mengunggah foto menu")
    
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar")
    
    # Ensure upload directory exists
    os.makedirs("static/uploads", exist_ok=True)
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1] if file.filename else ".png"
    if not file_extension:
        file_extension = ".png"
    
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join("static/uploads", unique_filename)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal menyimpan file: {str(e)}")
    
    return {"url": f"/static/uploads/{unique_filename}"}

@router.get("/", response_model=List[ProductResponse])
async def read_products(
    q: Optional[str] = Query(None, description="Search keyword for product name or description"),
    category: Optional[str] = Query(None, description="Product category filter"),
    seller_address: Optional[str] = Query(None, description="Filter by seller address or area"),
    seller_name: Optional[str] = Query(None, description="Filter by seller/store name"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    product_service: ProductService = Depends(get_product_service),
):
    products = await product_service.search_products(
        query=q,
        category=category,
        seller_address=seller_address,
        seller_name=seller_name,
        limit=limit,
        offset=offset,
    )
    return products

@router.get("/seller", response_model=SellerProductsResponse)
async def read_seller_products(
    status: Optional[str] = Query("all", description="Filter status: 'all' (semua), 'available' (tersedia), atau 'habis' (out_of_stock)"),
    current_user: UserDomain = Depends(get_current_user),
    product_service: ProductService = Depends(get_product_service),
):
    if current_user.user_type != "seller":
        raise HTTPException(status_code=403, detail="Hanya penjual yang dapat mengakses endpoint ini")
    
    result = await product_service.get_seller_products_with_counts(current_user.id, status)
    return result

@router.post("/", response_model=ProductResponse)
async def create_product(
    product_in: ProductCreate,
    current_user: UserDomain = Depends(get_current_user),
    product_service: ProductService = Depends(get_product_service),
):
    if current_user.user_type != "seller":
        raise HTTPException(status_code=403, detail="Hanya penjual yang dapat membuat menu baru")
    
    product = await product_service.create_product(product_in, current_user.id)
    return product

@router.patch("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: str,
    product_in: ProductUpdate,
    current_user: UserDomain = Depends(get_current_user),
    product_service: ProductService = Depends(get_product_service),
):
    if current_user.user_type != "seller":
        raise HTTPException(status_code=403, detail="Hanya penjual yang dapat mengubah menu")
    
    product = await product_service.update_product(product_id, product_in, current_user.id)
    if not product:
        raise HTTPException(status_code=404, detail="Menu tidak ditemukan atau Anda tidak memiliki akses")
    return product

@router.patch("/{product_id}/toggle-availability", response_model=ProductResponse)
async def toggle_product_availability(
    product_id: str,
    current_user: UserDomain = Depends(get_current_user),
    product_service: ProductService = Depends(get_product_service),
):
    if current_user.user_type != "seller":
        raise HTTPException(status_code=403, detail="Hanya penjual yang dapat mengubah ketersediaan menu")
    
    product = await product_service.toggle_product_availability(product_id, current_user.id)
    if not product:
        raise HTTPException(status_code=404, detail="Menu tidak ditemukan atau Anda tidak memiliki akses")
    return product

@router.delete("/{product_id}")
async def delete_product(
    product_id: str,
    current_user: UserDomain = Depends(get_current_user),
    product_service: ProductService = Depends(get_product_service),
):
    if current_user.user_type != "seller":
        raise HTTPException(status_code=403, detail="Hanya penjual yang dapat menghapus menu")
    
    success = await product_service.delete_product(product_id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Menu tidak ditemukan atau Anda tidak memiliki akses")
    return {"message": "Menu berhasil dihapus"}