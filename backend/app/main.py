from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.routers import products, auth, users, promos, cart, notifications, locations, seller_applications, orders

# Resolve path to backend/static directory
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
static_dir = os.path.join(base_dir, "static")
os.makedirs(static_dir, exist_ok=True)

app = FastAPI(title="IPB Food & UMKM Student Hub")

app.mount("/static", StaticFiles(directory=static_dir), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hanya meregistrasikan router products untuk Sprint 1
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(promos.router, prefix="/api/promos", tags=["promos"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(cart.router, prefix="/api/cart", tags=["cart"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["notifications"])
app.include_router(locations.router, prefix="/api/locations", tags=["locations"])
app.include_router(seller_applications.router, prefix="/api/seller-applications", tags=["seller-applications"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])

@app.get("/")
async def root():
    return {"message": "Welcome to IPB Food API - Sprint 1 (Auth & Dashboard Ready)"}