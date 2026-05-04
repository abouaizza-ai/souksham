"""Snapchat Conversions API service."""

from __future__ import annotations

import time
from typing import Any, Optional

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger(__name__)
settings = get_settings()

SNAP_CAPI_URL = "https://tr.snapchat.com/v3/{pixel_id}/events"


async def send_snap_event(
    event_type: str,
    event_id: str,
    event_source_url: str,
    phone_hash_digits_only: Optional[str],  # Snap requires digits-only SHA-256
    ip_address: Optional[str],
    user_agent: Optional[str],
    value: Optional[float],
    currency: str = "USD",
    transaction_id: Optional[str] = None,
) -> str:
    """Send event to Snap Conversions API v3."""
    if not settings.SNAP_PIXEL_ID or not settings.SNAP_ACCESS_TOKEN:
        return "skipped_no_config"

    user_data: dict[str, Any] = {}
    if phone_hash_digits_only:
        user_data["hashed_phone_number"] = phone_hash_digits_only
    if ip_address:
        user_data["client_ip_address"] = ip_address
    if user_agent:
        user_data["user_agent"] = user_agent

    custom_data: dict[str, Any] = {"currency": currency}
    if value is not None:
        custom_data["price"] = value
    if transaction_id:
        custom_data["transaction_id"] = transaction_id

    payload = {
        "data": [
            {
                "event_type": event_type,
                "event_conversion_type": "WEB",
                "timestamp": str(int(time.time() * 1000)),
                "event_id": event_id,
                "page_url": event_source_url,
                "user_data": user_data,
                "custom_data": custom_data,
            }
        ]
    }

    url = SNAP_CAPI_URL.format(pixel_id=settings.SNAP_PIXEL_ID)
    params = {"access_token": settings.SNAP_ACCESS_TOKEN}

    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            resp = await client.post(url, json=payload, params=params)
            status = f"http_{resp.status_code}"
            if resp.status_code >= 400:
                logger.warning("snap_capi_error", status=resp.status_code, body=resp.text[:300])
            return status
    except Exception as exc:
        logger.error("snap_capi_exception", error=str(exc))
        return f"error: {str(exc)[:100]}"
