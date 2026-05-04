"""Tracking event schemas."""

from __future__ import annotations

from typing import Any, Literal, Optional

from pydantic import BaseModel


EventName = Literal["PageView", "ViewContent", "AddToCart", "InitiateCheckout", "Lead", "Purchase"]


class TrackingEventRequest(BaseModel):
    event_id: str
    event_name: EventName
    product_slug: Optional[str] = None
    value: Optional[float] = None
    currency: Optional[str] = "USD"
    attribution: Optional[dict[str, Any]] = None


class TrackingEventResponse(BaseModel):
    ok: bool
