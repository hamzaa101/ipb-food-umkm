import asyncio
import asyncpg

async def main():
    conn = await asyncpg.connect('postgresql://postgres:emi1235@localhost:5432/ipbfoodhub')
    try:
        await conn.execute('DROP TYPE IF EXISTS sellerstatus;')
        await conn.execute('DROP TYPE IF EXISTS sellerapplicationstatus;')
        print('Dropped enum types if they existed.')
    finally:
        await conn.close()

if __name__ == '__main__':
    asyncio.run(main())
