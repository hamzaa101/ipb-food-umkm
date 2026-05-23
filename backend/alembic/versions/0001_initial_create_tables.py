"""create initial tables

Revision ID: 0001_initial
Revises: 
Create Date: 2026-05-23 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_initial'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # users
    op.create_table(
        'users',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('phone_number', sa.String(length=20), nullable=False),
        sa.Column('password', sa.String(length=255), nullable=False),
        sa.Column('user_type', sa.String(length=50), nullable=False),
        sa.Column('profile_image_url', sa.String(length=255), nullable=True),
    )

    # buyers
    op.create_table(
        'buyers',
        sa.Column('id', sa.String(), sa.ForeignKey('users.id'), primary_key=True),
        sa.Column('address', sa.String(length=255), nullable=True),
        sa.Column('latitude', sa.Float(), nullable=True),
        sa.Column('longitude', sa.Float(), nullable=True),
    )

    # sellers
    # create enum type sellerstatus if not exists
    op.execute("""
    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sellerstatus') THEN
            CREATE TYPE sellerstatus AS ENUM ('pending', 'active', 'rejected');
        END IF;
    END$$;
    """)
    op.create_table(
        'sellers',
        sa.Column('id', sa.String(), sa.ForeignKey('users.id'), primary_key=True),
        sa.Column('store_name', sa.String(length=100), nullable=False),
        sa.Column('address', sa.String(length=255), nullable=True),
        sa.Column('store_image_url', sa.String(length=255), nullable=True),
        sa.Column('verification_status', sa.String(length=50), nullable=True),
        sa.Column('open_time', sa.Time(), nullable=True),
        sa.Column('close_time', sa.Time(), nullable=True),
        sa.Column('latitude', sa.Float(), nullable=True),
        sa.Column('longitude', sa.Float(), nullable=True),
    )

    # locations
    op.create_table(
        'locations',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('name', sa.String(length=150), nullable=False, unique=True),
    )

    # products
    op.create_table(
        'products',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('description', sa.String(length=255), nullable=True),
        sa.Column('category', sa.String(length=100), nullable=True),
        sa.Column('image_url', sa.String(length=255), nullable=True),
        sa.Column('is_available', sa.Boolean(), nullable=True),
        sa.Column('seller_id', sa.String(), sa.ForeignKey('sellers.id'), nullable=False),
    )

    # promos
    op.create_table(
        'promos',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('title', sa.String(length=100), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('image_url', sa.String(length=255), nullable=True),
        sa.Column('promo_type', sa.String(length=50), nullable=True),
        sa.Column('discount_percent', sa.Float(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.Column('start_date', sa.Date(), nullable=True),
        sa.Column('end_date', sa.Date(), nullable=True),
    )

    # seller_applications
    # create enum type sellerapplicationstatus if not exists
    op.execute("""
    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sellerapplicationstatus') THEN
            CREATE TYPE sellerapplicationstatus AS ENUM ('pending', 'approved', 'rejected');
        END IF;
    END$$;
    """)
    op.create_table(
        'seller_applications',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('user_id', sa.String(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('store_name', sa.String(length=100), nullable=False),
        sa.Column('store_image_url', sa.String(length=255), nullable=True),
        sa.Column('location_id', sa.String(), sa.ForeignKey('locations.id'), nullable=False),
        sa.Column('status', sa.String(length=50), nullable=True),
        sa.Column('submitted_at', sa.DateTime(), nullable=True),
        sa.Column('reviewed_at', sa.DateTime(), nullable=True),
        sa.Column('rejected_reason', sa.Text(), nullable=True),
    )

    # notifications
    op.create_table(
        'notifications',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('user_id', sa.String(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('title', sa.String(length=150), nullable=False),
        sa.Column('message', sa.Text(), nullable=True),
        sa.Column('is_read', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
    )

    # cart_items
    op.create_table(
        'cart_items',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('user_id', sa.String(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('product_id', sa.String(), sa.ForeignKey('products.id'), nullable=False),
        sa.Column('quantity', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
    )


def downgrade():
    op.drop_table('cart_items')
    op.drop_table('notifications')
    op.drop_table('seller_applications')
    op.drop_table('promos')
    op.drop_table('products')
    op.drop_table('locations')
    op.drop_table('sellers')
    op.drop_table('buyers')
    op.drop_table('users')
    sa.Enum(name='sellerstatus').drop(op.get_bind(), checkfirst=True)
    sa.Enum(name='sellerapplicationstatus').drop(op.get_bind(), checkfirst=True)
