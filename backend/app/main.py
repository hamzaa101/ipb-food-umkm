from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import products, auth, users

app = FastAPI(title="IPB Food & UMKM Student Hub")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hanya meregistrasikan router products untuk Sprint 1
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])

@app.get("/")
async def root():
    return {"message": "Welcome to IPB Food API - Sprint 1 (Auth & Dashboard Ready)"}