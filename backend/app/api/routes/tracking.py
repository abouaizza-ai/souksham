"""Tracking events route."""

from __future__ import annotations

import json
import uuid

from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.logging import get_logger
from app.db.session import get_db
from app.models.models import TrackingEvent
from app.schemas.tracking import TrackingEventRequest, TrackingEventResponse
from app.services.capi_meta import send_meta_event
from app.services.capi_snap import send_snap_event
from app.services.capi_tiktok import send_tiktok_event
from app.services.hashing import hash_phone_meta, hash_phone_snap, hash_phone_tiktok

logger = get_logger(__name__)
router = APIRouter()
settings = get_settings()


@router.post("/tracking/event", response_model=TrackingEventResponse)
async def track_event(
    body: TrackingEventRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> TrackingEventResponse:
    """Receive non-purchase events for CAPI forwarding."""
    ip = request.client.host if request.client else None
    ua = request.headers.get("user-agent")
    attribution = body.attribution or {}

    event_source_url = attribution.get("landing_page") or settings.FRONTEND_URL

    meta_status = await send_meta_event(
        event_name=body.event_name,
        event_id=body.event_id,
        event_source_url=event_source_url,
        phone_hash=None,
        ip_address=ip,
        user_agent=ua,
        fbp=attribution.get("fbp"),
        fbc=attribution.get("fbc"),
        value=body.value,
        content_ids=[body.product_slug] if body.product_slug else None,
    )

    tiktok_status = await send_tiktok_event(
        event_name=body.event_name,
        event_id=body.event_id,
        event_source_url=event_source_url,
        phone_hash=None,
        ip_address=ip,
        user_agent=ua,
        value=body.value,
        content_ids=[body.product_slug] if body.product_slug else None,
    )

    snap_status = await send_snap_event(
        event_type=body.event_name,
        event_id=body.event_id,
        event_source_url=event_source_url,
        phone_hash_digits_only=None,
        ip_address=ip,
        user_agent=ua,
        value=body.value,
    )

    db.add(TrackingEvent(
        id=uuid.uuid4(),
        event_id=body.event_id,
        event_name=body.event_name,
        source="server",
        payload_json=json.dumps({"product_slug": body.product_slug, "value": body.value}),
        meta_status=meta_status,
        tiktok_status=tiktok_status,
        snap_status=snap_status,
    ))

    return TrackingEventResponse(ok=True)
