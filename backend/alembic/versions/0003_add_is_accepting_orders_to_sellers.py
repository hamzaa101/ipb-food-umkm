"""add is_accepting_orders to sellers

Revision ID: 0003_add_is_accepting_orders
Revises: 0002_add_orders
Create Date: 2026-05-29 07:20:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0003_add_is_accepting_orders'
down_revision = '0002_add_orders'
branch_labels = None
depends_on = None

def upgrade():
    op.add_column('sellers', sa.Column('is_accepting_orders', sa.Boolean(), nullable=False, server_default='true'))

def downgrade():
    op.drop_column('sellers', 'is_accepting_orders')
