from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependencies import get_db
from sqlalchemy import text

router = APIRouter(prefix="/api/health", tags=["health"])

@router.get("/db-tables")
async def db_tables(db: AsyncSession = Depends(get_db)):
    """List all tables in the database"""
    try:
        result = await db.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema='public'
            ORDER BY table_name;
        """))
        tables = [row[0] for row in result.fetchall()]
        return {"status": "ok", "tables": tables, "count": len(tables)}
    except Exception as e:
        return {"status": "error", "message": str(e)}
