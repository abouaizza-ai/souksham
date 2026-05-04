"""Database models."""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


def now_utc() -> datetime:
    return datetime.utcnow()


class Product(Base):
    __tablename__ = "products"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    name_ar: Mapped[str] = mapped_column(String(200), nullable=False)
    name_en: Mapped[str] = mapped_column(String(200), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=True)
    status: Mapped[str] = mapped_column(
        Enum("active", "draft", "archived", name="product_status"), default="active", nullable=False
    )
    base_price_usd: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=now_utc, onupdate=now_utc
    )

    offers: Mapped[list[ProductOffer]] = relationship("ProductOffer", back_populates="product")


class ProductOffer(Base):
    __tablename__ = "product_offers"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("products.id", ondelete="CASCADE"), nullable=False
    )
    offer_id: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    label_ar: Mapped[str] = mapped_column(String(200), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    price_usd: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    compare_at_usd: Mapped[Optional[float]] = mapped_column(Numeric(10, 2), nullable=True)
    is_default: Mapped[bool] = mapped_column(Boolean, default=False)
    is_upsell_only: Mapped[bool] = mapped_column(Boolean, default=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    product: Mapped[Product] = relationship("Product", back_populates="offers")


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_number: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    status: Mapped[str] = mapped_column(
        Enum("new", "confirmed", "no_answer", "cancelled", "shipped", "delivered", "returned",
             name="order_status"),
        default="new", nullable=False
    )
    customer_name: Mapped[str] = mapped_column(String(200), nullable=False)
    phone_local: Mapped[str] = mapped_column(String(20), nullable=False)
    phone_e164: Mapped[str] = mapped_column(String(20), nullable=False)
    phone_hash_sha256: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    currency: Mapped[str] = mapped_column(String(3), default="USD")
    subtotal_usd: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    discount_usd: Mapped[float] = mapped_column(Numeric(10, 2), default=0.0)
    total_usd: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    source_channel: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    landing_page: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    referrer: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    utm_source: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    utm_medium: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    utm_campaign: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    utm_content: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    utm_term: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    fbclid: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    ttclid: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    sc_click_id: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    fbp: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    fbc: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    event_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True, index=True)
    ip_address: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    user_agent: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    sheet_synced_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    sheet_error: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=now_utc, onupdate=now_utc
    )

    items: Mapped[list[OrderItem]] = relationship("OrderItem", back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False
    )
    product_slug: Mapped[str] = mapped_column(String(100), nullable=False)
    offer_id: Mapped[str] = mapped_column(String(100), nullable=False)
    title_ar: Mapped[str] = mapped_column(String(200), nullable=False)
    offer_label_ar: Mapped[str] = mapped_column(String(200), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_price_usd: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    line_total_usd: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    added_from: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    is_upsell: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)

    order: Mapped[Order] = relationship("Order", back_populates="items")


class TrackingEvent(Base):
    __tablename__ = "tracking_events"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True, index=True)
    event_name: Mapped[str] = mapped_column(String(50), nullable=False)
    source: Mapped[str] = mapped_column(
        Enum("web", "server", "sheet", name="event_source"), nullable=False
    )
    order_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("orders.id", ondelete="SET NULL"), nullable=True
    )
    payload_json: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    meta_status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    tiktok_status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    snap_status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)


class SheetDeliveryLog(Base):
    __tablename__ = "sheet_delivery_logs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False
    )
    status_code: Mapped[int] = mapped_column(Integer, nullable=False)
    response_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    attempt: Mapped[int] = mapped_column(Integer, default=1)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)
