import asyncio
import asyncpg

async def main():
    conn = await asyncpg.connect('postgresql://postgres:emi1235@localhost:5432/ipbfoodhub')
    try:
        rows = await conn.fetch("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema='public';")
        for r in rows:
            print(r['table_schema'], r['table_name'])
    finally:
        await conn.close()

if __name__ == '__main__':
    asyncio.run(main())
