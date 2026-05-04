"""initial schema

Revision ID: 0001
Revises:
Create Date: 2026-05-04

"""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Enums
    op.execute("CREATE TYPE product_status AS ENUM ('active', 'draft', 'archived')")
    op.execute("CREATE TYPE order_status AS ENUM ('new', 'confirmed', 'no_answer', 'cancelled', 'shipped', 'delivered', 'returned')")
    op.execute("CREATE TYPE event_source AS ENUM ('web', 'server', 'sheet')")

    op.create_table(
        "products",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False, primary_key=True),
        sa.Column("slug", sa.String(100), nullable=False, unique=True),
        sa.Column("name_ar", sa.String(200), nullable=False),
        sa.Column("name_en", sa.String(200), nullable=False),
        sa.Column("category", sa.String(100), nullable=True),
        sa.Column("status", sa.Enum("active", "draft", "archived", name="product_status"), nullable=False, server_default="active"),
        sa.Column("base_price_usd", sa.Numeric(10, 2), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_products_slug", "products", ["slug"])

    op.create_table(
        "product_offers",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False, primary_key=True),
        sa.Column("product_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
        sa.Column("offer_id", sa.String(100), nullable=False),
        sa.Column("label_ar", sa.String(200), nullable=False),
        sa.Column("quantity", sa.Integer, nullable=False),
        sa.Column("price_usd", sa.Numeric(10, 2), nullable=False),
        sa.Column("compare_at_usd", sa.Numeric(10, 2), nullable=True),
        sa.Column("is_default", sa.Boolean, nullable=False, server_default="false"),
        sa.Column("is_upsell_only", sa.Boolean, nullable=False, server_default="false"),
        sa.Column("sort_order", sa.Integer, nullable=False, server_default="0"),
    )
    op.create_index("ix_product_offers_offer_id", "product_offers", ["offer_id"])

    op.create_table(
        "orders",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False, primary_key=True),
        sa.Column("order_number", sa.String(50), nullable=False, unique=True),
        sa.Column("status", sa.Enum("new", "confirmed", "no_answer", "cancelled", "shipped", "delivered", "returned", name="order_status"), nullable=False, server_default="new"),
        sa.Column("customer_name", sa.String(200), nullable=False),
        sa.Column("phone_local", sa.String(20), nullable=False),
        sa.Column("phone_e164", sa.String(20), nullable=False),
        sa.Column("phone_hash_sha256", sa.String(64), nullable=False),
        sa.Column("currency", sa.String(3), nullable=False, server_default="USD"),
        sa.Column("subtotal_usd", sa.Numeric(10, 2), nullable=False),
        sa.Column("discount_usd", sa.Numeric(10, 2), nullable=False, server_default="0"),
        sa.Column("total_usd", sa.Numeric(10, 2), nullable=False),
        sa.Column("source_channel", sa.String(50), nullable=True),
        sa.Column("landing_page", sa.Text, nullable=True),
        sa.Column("referrer", sa.Text, nullable=True),
        sa.Column("utm_source", sa.String(100), nullable=True),
        sa.Column("utm_medium", sa.String(100), nullable=True),
        sa.Column("utm_campaign", sa.String(200), nullable=True),
        sa.Column("utm_content", sa.String(200), nullable=True),
        sa.Column("utm_term", sa.String(200), nullable=True),
        sa.Column("fbclid", sa.String(200), nullable=True),
        sa.Column("ttclid", sa.String(200), nullable=True),
        sa.Column("sc_click_id", sa.String(200), nullable=True),
        sa.Column("fbp", sa.String(200), nullable=True),
        sa.Column("fbc", sa.String(200), nullable=True),
        sa.Column("event_id", sa.String(100), nullable=True),
        sa.Column("ip_address", sa.String(50), nullable=True),
        sa.Column("user_agent", sa.Text, nullable=True),
        sa.Column("sheet_synced_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("sheet_error", sa.Text, nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_orders_order_number", "orders", ["order_number"])
    op.create_index("ix_orders_event_id", "orders", ["event_id"])
    op.create_index("ix_orders_phone_hash_sha256", "orders", ["phone_hash_sha256"])

    op.create_table(
        "order_items",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False, primary_key=True),
        sa.Column("order_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("orders.id", ondelete="CASCADE"), nullable=False),
        sa.Column("product_slug", sa.String(100), nullable=False),
        sa.Column("offer_id", sa.String(100), nullable=False),
        sa.Column("title_ar", sa.String(200), nullable=False),
        sa.Column("offer_label_ar", sa.String(200), nullable=False),
        sa.Column("quantity", sa.Integer, nullable=False),
        sa.Column("unit_price_usd", sa.Numeric(10, 2), nullable=False),
        sa.Column("line_total_usd", sa.Numeric(10, 2), nullable=False),
        sa.Column("added_from", sa.String(50), nullable=True),
        sa.Column("is_upsell", sa.Boolean, nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=True),
    )

    op.create_table(
        "tracking_events",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False, primary_key=True),
        sa.Column("event_id", sa.String(100), nullable=True),
        sa.Column("event_name", sa.String(50), nullable=False),
        sa.Column("source", sa.Enum("web", "server", "sheet", name="event_source"), nullable=False),
        sa.Column("order_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("orders.id", ondelete="SET NULL"), nullable=True),
        sa.Column("payload_json", sa.Text, nullable=True),
        sa.Column("meta_status", sa.String(50), nullable=True),
        sa.Column("tiktok_status", sa.String(50), nullable=True),
        sa.Column("snap_status", sa.String(50), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_tracking_events_event_id", "tracking_events", ["event_id"])

    op.create_table(
        "sheet_delivery_logs",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False, primary_key=True),
        sa.Column("order_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("orders.id", ondelete="CASCADE"), nullable=False),
        sa.Column("status_code", sa.Integer, nullable=False),
        sa.Column("response_text", sa.Text, nullable=True),
        sa.Column("attempt", sa.Integer, nullable=False, server_default="1"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=True),
    )


def downgrade() -> None:
    op.drop_table("sheet_delivery_logs")
    op.drop_table("tracking_events")
    op.drop_table("order_items")
    op.drop_table("orders")
    op.drop_table("product_offers")
    op.drop_table("products")
    op.execute("DROP TYPE IF EXISTS event_source")
    op.execute("DROP TYPE IF EXISTS order_status")
    op.execute("DROP TYPE IF EXISTS product_status")
