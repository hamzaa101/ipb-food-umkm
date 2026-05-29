import asyncio
from app.db.database import AsyncSessionLocal
from app.models.user import User, Buyer, Seller, SellerStatus
from app.models.product import Product
from app.models.order import Order, OrderItem
from app.models.cart import CartItem
from app.models.notification import Notification
from app.models.location import Location
from app.models.promo import Promo
from app.models.seller_application import SellerApplication
from app.core.security import hash_password
from app.services.product_service import ProductService
from app.repositories.product_repository import ProductRepository
from sqlalchemy import select, delete

async def clean_database(db):
    print("Cleaning test database...")
    # Delete test orders, products, and users to prevent conflicts
    await db.execute(delete(OrderItem))
    await db.execute(delete(Order))
    await db.execute(delete(Product))
    await db.execute(delete(Seller))
    await db.execute(delete(User).where(User.id.in_(["test-seller-id", "test-buyer-id"])))
    await db.commit()

async def run():
    async with AsyncSessionLocal() as db:
        await clean_database(db)

        # 1. Create a test seller
        print("Creating test seller...")
        seller_id = "test-seller-id"
        hashed = hash_password("password123")
        
        seller = Seller(
            id=seller_id,
            name="Pak Salman",
            phone_number="081234567890",
            password=hashed,
            user_type="seller",
            store_name="Nasi Goreng Pak Salman",
            address="Jl. Agatis, Dramaga",
            verification_status=SellerStatus.ACTIVE
        )
        db.add(seller)
        await db.commit()
        await db.refresh(seller)
        print(f"Created seller: {seller.store_name} ({seller.id})")

        # 2. Add mockup products
        print("Adding mockup products...")
        p1 = Product(
            id="p-nasgor-biasa",
            name="Nasi Goreng Biasa",
            price=12000.0,
            description="Nasi goreng lezat khas Pak Salman",
            category="Makanan",
            is_available=True,
            seller_id=seller_id
        )
        p2 = Product(
            id="p-esteh",
            name="Es teh Manis",
            price=5000.0,
            description="Segar manis dingin",
            category="Minuman",
            is_available=True,
            seller_id=seller_id
        )
        p3 = Product(
            id="p-nasgor-sosis",
            name="Nasi Goreng Sosis",
            price=15000.0,
            description="Nasi goreng dengan topping sosis melimpah",
            category="Makanan",
            is_available=False,
            seller_id=seller_id
        )
        
        db.add_all([p1, p2, p3])
        await db.commit()

        # 3. Add order items to match sold counts
        print("Adding mock order items for sold count...")
        # Create a mock buyer
        buyer = User(
            id="test-buyer-id",
            name="Test Buyer",
            phone_number="081111111111",
            password=hashed,
            user_type="buyer"
        )
        db.add(buyer)
        await db.commit()

        # Add mock orders and items
        # Nasi Goreng Biasa: 16 sold
        # Es teh Manis: 13 sold
        # Nasi Goreng Sosis: 9 sold
        o1 = Order(
            id="order-1",
            user_id="test-buyer-id",
            seller_id=seller_id,
            status="Selesai",
            total_price=12000.0 * 16 + 5000.0 * 13 + 15000.0 * 9,
            rating=5
        )
        db.add(o1)
        await db.commit()

        oi1 = OrderItem(
            id="oi-1",
            order_id="order-1",
            product_id="p-nasgor-biasa",
            quantity=16,
            price=12000.0
        )
        oi2 = OrderItem(
            id="oi-2",
            order_id="order-1",
            product_id="p-esteh",
            quantity=13,
            price=5000.0
        )
        oi3 = OrderItem(
            id="oi-3",
            order_id="order-1",
            product_id="p-nasgor-sosis",
            quantity=9,
            price=15000.0
        )
        db.add_all([oi1, oi2, oi3])
        await db.commit()
        print("Successfully seeded mockup products and orders!")

        # 4. Test ProductService methods
        print("\n--- Testing ProductService ---")
        repo = ProductRepository(db)
        service = ProductService(repo)

        # Test A: Status "all"
        res_all = await service.get_seller_products_with_counts(seller_id, status="all")
        print(f"Tab 'Semua':")
        print(f"  Count: {len(res_all['products'])} products")
        print(f"  Counts dict: {res_all['counts']}")
        for p in res_all['products']:
            print(f"    - {p.name}: Rp {p.price} | Terjual: {p.sold_count} | Rating: {p.average_rating} | Tersedia: {p.is_available}")
        
        # Validate counts
        assert res_all['counts']['all'] == 3
        assert res_all['counts']['available'] == 2
        assert res_all['counts']['out_of_stock'] == 1
        assert len(res_all['products']) == 3

        # Test B: Status "available" (tersedia)
        res_available = await service.get_seller_products_with_counts(seller_id, status="available")
        print(f"Tab 'Tersedia':")
        print(f"  Count: {len(res_available['products'])} products")
        for p in res_available['products']:
            print(f"    - {p.name} | Tersedia: {p.is_available}")
        assert len(res_available['products']) == 2
        assert all(p.is_available for p in res_available['products'])

        # Test C: Status "out_of_stock" (habis)
        res_habis = await service.get_seller_products_with_counts(seller_id, status="habis")
        print(f"Tab 'Habis':")
        print(f"  Count: {len(res_habis['products'])} products")
        for p in res_habis['products']:
            print(f"    - {p.name} | Tersedia: {p.is_available}")
        assert len(res_habis['products']) == 1
        assert not res_habis['products'][0].is_available

        # Test D: Toggle product availability
        print("\nToggling availability for 'Nasi Goreng Sosis' (currently Habis)...")
        updated = await service.toggle_product_availability("p-nasgor-sosis", seller_id)
        print(f"  Updated product 'Nasi Goreng Sosis' -> is_available: {updated.is_available}")
        assert updated.is_available == True

        # Re-fetch tab 'Tersedia'
        res_available_after = await service.get_seller_products_with_counts(seller_id, status="available")
        print(f"Tab 'Tersedia' after toggle:")
        print(f"  Count: {len(res_available_after['products'])} products (expected 3)")
        assert len(res_available_after['products']) == 3
        
        print("\nAll ProductService tests completed successfully and match mockup specification perfectly! [OK]")

if __name__ == '__main__':
    asyncio.run(run())
