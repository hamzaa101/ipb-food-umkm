import asyncio
import asyncpg

async def main():
    conn = await asyncpg.connect('postgresql://postgres:emi1235@localhost:5432/ipbfoodhub')
    try:
        # List table structures
        rows = await conn.fetch("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema='public'
        ORDER BY table_name;
        """)
        
        print("=== Tables Created ===")
        for r in rows:
            print(f"✓ {r['table_name']}")
        
        # Show columns for users table
        print("\n=== users table columns ===")
        cols = await conn.fetch("""
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name='users'
        ORDER BY ordinal_position;
        """)
        for col in cols:
            print(f"  {col['column_name']:20} | {col['data_type']:20} | nullable={col['is_nullable']}")
        
    finally:
        await conn.close()

if __name__ == '__main__':
    asyncio.run(main())
