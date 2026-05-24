"""add orders tables

Revision ID: 0002_add_orders
Revises: 0001_initial
Create Date: 2026-05-24 15:45:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0002_add_orders'
down_revision = '0001_initial'
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'orders',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('user_id', sa.String(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('seller_id', sa.String(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='Menunggu Konfirmasi'),
        sa.Column('total_price', sa.Float(), nullable=False),
        sa.Column('rating', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
    )

    op.create_table(
        'order_items',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('order_id', sa.String(), sa.ForeignKey('orders.id'), nullable=False),
        sa.Column('product_id', sa.String(), sa.ForeignKey('products.id'), nullable=False),
        sa.Column('quantity', sa.Integer(), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
    )

def downgrade():
    op.drop_table('order_items')
    op.drop_table('orders')
