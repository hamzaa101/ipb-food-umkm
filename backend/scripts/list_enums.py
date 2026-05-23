import asyncio
import asyncpg

async def main():
    conn = await asyncpg.connect('postgresql://postgres:emi1235@localhost:5432/ipbfoodhub')
    try:
        rows = await conn.fetch("SELECT n.nspname as schema, t.typname as name FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace WHERE t.typtype='e';")
        for r in rows:
            print(r['schema'], r['name'])
        if not rows:
            print('No enum types found')
    finally:
        await conn.close()

if __name__ == '__main__':
    asyncio.run(main())
