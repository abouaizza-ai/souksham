"""Order creation service."""

from __future__ import annotations

import json
import uuid
from datetime import datetime
from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.logging import get_logger
from app.models.models import Order, OrderItem, SheetDeliveryLog, TrackingEvent
from app.schemas.orders import CheckoutRequest
from app.services.capi_meta import send_meta_event
from app.services.capi_snap import send_snap_event
from app.services.capi_tiktok import send_tiktok_event
from app.services.hashing import hash_phone_meta, hash_phone_snap, hash_phone_tiktok
from app.services.phone import normalize_lebanese_phone
from app.services.pricing import get_offer, get_product
from app.services.sheets import build_sheet_payload, send_order_to_sheet

logger = get_logger(__name__)
settings = get_settings()


class CheckoutError(Exception):
    def __init__(self, code: str, detail: str = ""):
        self.code = code
        self.detail = detail
        super().__init__(detail or code)


async def _generate_order_number(db: AsyncSession) -> str:
    """Generate a sequential order number like SS-2026-000001."""
    from sqlalchemy import func, select
    year = datetime.utcnow().year
    prefix = f"{settings.ORDER_NUMBER_PREFIX}-{year}-"
    result = await db.execute(
        select(func.count()).where(Order.order_number.like(f"{prefix}%"))
    )
    count = result.scalar() or 0
    return f"{prefix}{(count + 1):06d}"


async def process_checkout(
    request: CheckoutRequest,
    db: AsyncSession,
    ip_address: str | None = None,
    user_agent: str | None = None,
) -> dict[str, Any]:
    """
    Full checkout pipeline:
    1. Validate phone
    2. Validate + reprice cart
    3. Save order to DB
    4. Send Sheet webhook (non-blocking failure)
    5. Fire CAPI events (non-blocking failure)
    6. Return order summary
    """
    # 1. Phone normalization
    try:
        phone_local, phone_e164 = normalize_lebanese_phone(request.customer.phone_local)
    except ValueError:
        raise CheckoutError("INVALID_PHONE")

    # Hash for CAPI
    phone_hash_meta = hash_phone_meta(phone_e164)
    phone_hash_snap = hash_phone_snap(phone_e164)
    phone_hash_sha256 = phone_hash_meta

    # 2. Validate + reprice cart
    if not request.cart:
        raise CheckoutError("INVALID_CART")

    cart_lines_data = []
    for line in request.cart:
        product = get_product(line.product_slug)
        if not product:
            raise CheckoutError("OFFER_UNAVAILABLE", f"Unknown product: {line.product_slug}")
        offer = get_offer(line.product_slug, line.offer_id)
        if not offer:
            raise CheckoutError("OFFER_UNAVAILABLE", f"Unknown offer: {line.offer_id}")
        line_total = round(offer.price_usd * line.quantity, 2)
        is_upsell = (
            request.upsell is not None
            and request.upsell.decision == "accepted"
            and line.product_slug == request.upsell.product_slug
            and line.offer_id == request.upsell.offer_id
        )
        cart_lines_data.append({
            "product_slug": line.product_slug,
            "offer_id": line.offer_id,
            "title_ar": product.name_ar,
            "offer_label_ar": offer.label_ar,
            "quantity": line.quantity,
            "unit_price_usd": offer.price_usd,
            "line_total_usd": line_total,
            "added_from": line.added_from or "pdp",
            "is_upsell": is_upsell,
        })

    subtotal_usd = round(sum(d["line_total_usd"] for d in cart_lines_data), 2)
    total_usd = subtotal_usd

    # 3. DB transaction
    try:
        order_number = await _generate_order_number(db)
        attribution = request.attribution
        order = Order(
            id=uuid.uuid4(),
            order_number=order_number,
            status="new",
            customer_name=request.customer.name.strip(),
            phone_local=phone_local,
            phone_e164=phone_e164,
            phone_hash_sha256=phone_hash_sha256,
            currency="USD",
            subtotal_usd=subtotal_usd,
            discount_usd=0.0,
            total_usd=total_usd,
            source_channel=attribution.utm_source if attribution else None,
            landing_page=attribution.landing_page if attribution else None,
            referrer=attribution.referrer if attribution else None,
            utm_source=attribution.utm_source if attribution else None,
            utm_medium=attribution.utm_medium if attribution else None,
            utm_campaign=attribution.utm_campaign if attribution else None,
            utm_content=attribution.utm_content if attribution else None,
            utm_term=attribution.utm_term if attribution else None,
            fbclid=attribution.fbclid if attribution else None,
            ttclid=attribution.ttclid if attribution else None,
            sc_click_id=attribution.sc_click_id if attribution else None,
            fbp=attribution.fbp if attribution else None,
            fbc=attribution.fbc if attribution else None,
            event_id=request.event_id,
            ip_address=ip_address,
            user_agent=user_agent,
        )
        db.add(order)
        await db.flush()  # Get order.id

        for line_data in cart_lines_data:
            item = OrderItem(
                id=uuid.uuid4(),
                order_id=order.id,
                **line_data,
            )
            db.add(item)

        await db.flush()
        order_id_str = str(order.id)
    except Exception as exc:
        logger.error("order_create_failed", error=str(exc))
        raise CheckoutError("ORDER_CREATE_FAILED")

    # 4. Sheet webhook (non-blocking)
    sheet_payload = build_sheet_payload(
        order_number=order_number,
        customer_name=request.customer.name.strip(),
        phone_local=phone_local,
        phone_e164=phone_e164,
        total_usd=total_usd,
        items=cart_lines_data,
        attribution=attribution.model_dump() if attribution else {},
        upsell=request.upsell.model_dump() if request.upsell else {"decision": "not_shown"},
    )
    sheet_ok, sheet_error = await send_order_to_sheet(sheet_payload)

    if sheet_ok:
        order.sheet_synced_at = datetime.utcnow()
    else:
        order.sheet_error = sheet_error[:500]

    # Log sheet attempt
    db.add(SheetDeliveryLog(
        id=uuid.uuid4(),
        order_id=order.id,
        status_code=200 if sheet_ok else 0,
        response_text=sheet_error or "OK",
        attempt=1,
    ))

    # 5. CAPI events
    event_source_url = attribution.landing_page if attribution and attribution.landing_page else settings.FRONTEND_URL
    fbp = attribution.fbp if attribution else None
    fbc = attribution.fbc if attribution else None

    meta_status = await send_meta_event(
        event_name="Purchase",
        event_id=request.event_id,
        event_source_url=event_source_url,
        phone_hash=phone_hash_meta,
        ip_address=ip_address,
        user_agent=user_agent,
        fbp=fbp,
        fbc=fbc,
        value=total_usd,
        content_ids=[d["product_slug"] for d in cart_lines_data],
    )

    tiktok_status = await send_tiktok_event(
        event_name="CompletePayment",
        event_id=request.event_id,
        event_source_url=event_source_url,
        phone_hash=hash_phone_tiktok(phone_e164),
        ip_address=ip_address,
        user_agent=user_agent,
        value=total_usd,
        content_ids=[d["product_slug"] for d in cart_lines_data],
    )

    snap_status = await send_snap_event(
        event_type="PURCHASE",
        event_id=request.event_id,
        event_source_url=event_source_url,
        phone_hash_digits_only=phone_hash_snap,
        ip_address=ip_address,
        user_agent=user_agent,
        value=total_usd,
        transaction_id=order_number,
    )

    # Save tracking event record
    db.add(TrackingEvent(
        id=uuid.uuid4(),
        event_id=request.event_id,
        event_name="Purchase",
        source="server",
        order_id=order.id,
        payload_json=json.dumps({"total_usd": total_usd, "order_number": order_number}),
        meta_status=meta_status,
        tiktok_status=tiktok_status,
        snap_status=snap_status,
    ))

    logger.info(
        "order_created",
        order_number=order_number,
        total_usd=total_usd,
        meta_status=meta_status,
        sheet_ok=sheet_ok,
    )

    return {
        "ok": True,
        "order_id": order_id_str,
        "order_number": order_number,
        "total_usd": total_usd,
        "event_id": request.event_id,
    }
