"""TikTok Events API service."""

from __future__ import annotations

import time
from typing import Any, Optional

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger(__name__)
settings = get_settings()

TIKTOK_EVENTS_URL = "https://business-api.tiktok.com/open_api/v1.3/event/track/"


async def send_tiktok_event(
    event_name: str,
    event_id: str,
    event_source_url: str,
    phone_hash: Optional[str],
    ip_address: Optional[str],
    user_agent: Optional[str],
    value: Optional[float],
    currency: str = "USD",
    content_ids: Optional[list[str]] = None,
) -> str:
    """Send event to TikTok Events API."""
    if not settings.TIKTOK_PIXEL_ID or not settings.TIKTOK_ACCESS_TOKEN:
        return "skipped_no_config"

    properties: dict[str, Any] = {"currency": currency}
    if value is not None:
        properties["value"] = value
    if content_ids:
        properties["content_id"] = content_ids

    context: dict[str, Any] = {"page": {"url": event_source_url}}
    if ip_address:
        context["ip"] = ip_address
    if user_agent:
        context["user_agent"] = user_agent

    user: dict[str, Any] = {}
    if phone_hash:
        user["phone_number"] = phone_hash

    payload = {
        "pixel_code": settings.TIKTOK_PIXEL_ID,
        "event": event_name,
        "event_id": event_id,
        "timestamp": str(int(time.time())),
        "context": context,
        "properties": properties,
        "user": user,
    }

    headers = {"Access-Token": settings.TIKTOK_ACCESS_TOKEN, "Content-Type": "application/json"}

    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            resp = await client.post(TIKTOK_EVENTS_URL, json=payload, headers=headers)
            status = f"http_{resp.status_code}"
            if resp.status_code >= 400:
                logger.warning("tiktok_capi_error", status=resp.status_code, body=resp.text[:300])
            return status
    except Exception as exc:
        logger.error("tiktok_capi_exception", error=str(exc))
        return f"error: {str(exc)[:100]}"
