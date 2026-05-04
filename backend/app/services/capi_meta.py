"""Meta Conversions API service."""

from __future__ import annotations

import time
from typing import Any, Optional

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger(__name__)
settings = get_settings()

META_CAPI_URL = "https://graph.facebook.com/v19.0/{pixel_id}/events"


async def send_meta_event(
    event_name: str,
    event_id: str,
    event_source_url: str,
    phone_hash: Optional[str],
    ip_address: Optional[str],
    user_agent: Optional[str],
    fbp: Optional[str],
    fbc: Optional[str],
    value: Optional[float],
    currency: str = "USD",
    content_ids: Optional[list[str]] = None,
) -> str:
    """Send a CAPI event to Meta. Returns status string."""
    if not settings.META_PIXEL_ID or not settings.META_ACCESS_TOKEN:
        return "skipped_no_config"

    user_data: dict[str, Any] = {}
    if phone_hash:
        user_data["ph"] = [phone_hash]
    if ip_address:
        user_data["client_ip_address"] = ip_address
    if user_agent:
        user_data["client_user_agent"] = user_agent
    if fbp:
        user_data["fbp"] = fbp
    if fbc:
        user_data["fbc"] = fbc

    custom_data: dict[str, Any] = {"currency": currency}
    if value is not None:
        custom_data["value"] = value
    if content_ids:
        custom_data["content_ids"] = content_ids

    payload = {
        "data": [
            {
                "event_name": event_name,
                "event_time": int(time.time()),
                "event_id": event_id,
                "action_source": "website",
                "event_source_url": event_source_url,
                "user_data": user_data,
                "custom_data": custom_data,
            }
        ]
    }

    url = META_CAPI_URL.format(pixel_id=settings.META_PIXEL_ID)
    params = {"access_token": settings.META_ACCESS_TOKEN}

    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            resp = await client.post(url, json=payload, params=params)
            status = f"http_{resp.status_code}"
            if resp.status_code >= 400:
                logger.warning("meta_capi_error", status=resp.status_code, body=resp.text[:300])
            return status
    except Exception as exc:
        logger.error("meta_capi_exception", error=str(exc))
        return f"error: {str(exc)[:100]}"
