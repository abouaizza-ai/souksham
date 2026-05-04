"""Order schemas."""

from __future__ import annotations

from typing import Literal, Optional

from pydantic import BaseModel, Field


class CustomerIn(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    phone_local: str = Field(min_length=7, max_length=20)


class CartLineIn(BaseModel):
    product_slug: str
    offer_id: str
    quantity: int = Field(ge=1, le=99)
    added_from: Optional[str] = None


class UpsellIn(BaseModel):
    shown: bool
    decision: Literal["accepted", "declined", "timeout", "not_shown"]
    product_slug: Optional[str] = None
    offer_id: Optional[str] = None


class AttributionIn(BaseModel):
    landing_page: Optional[str] = None
    referrer: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_content: Optional[str] = None
    utm_term: Optional[str] = None
    fbclid: Optional[str] = None
    ttclid: Optional[str] = None
    sc_click_id: Optional[str] = None
    fbp: Optional[str] = None
    fbc: Optional[str] = None


class CheckoutRequest(BaseModel):
    event_id: str
    customer: CustomerIn
    cart: list[CartLineIn] = Field(min_length=1)
    upsell: Optional[UpsellIn] = None
    attribution: Optional[AttributionIn] = None


class CheckoutResponse(BaseModel):
    ok: bool
    order_id: str
    order_number: str
    total_usd: float
    event_id: str
