"""Google Sheets webhook service."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from typing import Any

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger(__name__)
settings = get_settings()


async def send_order_to_sheet(order_data: dict[str, Any]) -> tuple[bool, str]:
    """
    POST order data to the configured Google Sheets webhook.
    Returns (success, error_message).
    Never raises — errors are returned as a tuple.
    """
    url = settings.SHEET_WEBHOOK_URL
    if not url:
        return False, "SHEET_WEBHOOK_URL not configured"

    headers = {"Content-Type": "application/json"}
    if settings.SHEET_WEBHOOK_SECRET:
        headers["X-Webhook-Secret"] = settings.SHEET_WEBHOOK_SECRET

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, json=order_data, headers=headers)
            if resp.status_code < 300:
                logger.info("sheet_webhook_success", order_number=order_data.get("order_number"), status=resp.status_code)
                return True, ""
            else:
                error_text = resp.text[:500]
                logger.warning("sheet_webhook_failed", status=resp.status_code, body=error_text)
                return False, f"HTTP {resp.status_code}: {error_text}"
    except httpx.TimeoutException:
        logger.error("sheet_webhook_timeout")
        return False, "Webhook request timed out"
    except Exception as exc:
        logger.error("sheet_webhook_error", error=str(exc))
        return False, str(exc)


def build_sheet_payload(
    order_number: str,
    customer_name: str,
    phone_local: str,
    phone_e164: str,
    total_usd: float,
    items: list[dict[str, Any]],
    attribution: dict[str, Any],
    upsell: dict[str, Any],
) -> dict[str, Any]:
    """Build the payload sent to the Google Apps Script webhook."""
    return {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "store": "SoukSham",
        "order_number": order_number,
        "customer": {
            "name": customer_name,
            "phone_local": phone_local,
            "phone_e164": phone_e164,
        },
        "total_usd": total_usd,
        "currency": "USD",
        "lines": [
            {
                "product_slug": item["product_slug"],
                "offer_id": item["offer_id"],
                "title_ar": item["title_ar"],
                "offer_label_ar": item["offer_label_ar"],
                "quantity": item["quantity"],
                "unit_price_usd": item["unit_price_usd"],
                "line_total_usd": item["line_total_usd"],
                "is_upsell": item.get("is_upsell", False),
            }
            for item in items
        ],
        "upsell_decision": upsell.get("decision", "not_shown"),
        "utm_source": attribution.get("utm_source", ""),
        "utm_medium": attribution.get("utm_medium", ""),
        "utm_campaign": attribution.get("utm_campaign", ""),
        "landing_page": attribution.get("landing_page", ""),
    }
