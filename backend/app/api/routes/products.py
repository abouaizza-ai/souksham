"""Products route — returns static catalog."""

from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from app.services.pricing import PRODUCT_CATALOG

router = APIRouter()


class OfferOut(BaseModel):
    offer_id: str
    label_ar: str
    quantity: int
    price_usd: float
    compare_at_usd: float | None = None
    is_default: bool


class ProductOut(BaseModel):
    slug: str
    name_ar: str
    name_en: str
    base_price_usd: float
    offers: list[OfferOut]


@router.get("/products", response_model=list[ProductOut])
async def list_products() -> list[ProductOut]:
    return [
        ProductOut(
            slug=p.slug,
            name_ar=p.name_ar,
            name_en=p.name_en,
            base_price_usd=p.base_price_usd,
            offers=[
                OfferOut(
                    offer_id=o.offer_id,
                    label_ar=o.label_ar,
                    quantity=o.quantity,
                    price_usd=o.price_usd,
                    compare_at_usd=o.compare_at_usd,
                    is_default=o.is_default,
                )
                for o in p.offers
            ],
        )
        for p in PRODUCT_CATALOG.values()
    ]


@router.get("/products/{slug}", response_model=ProductOut)
async def get_product_route(slug: str) -> ProductOut:
    from fastapi import HTTPException
    p = PRODUCT_CATALOG.get(slug)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductOut(
        slug=p.slug,
        name_ar=p.name_ar,
        name_en=p.name_en,
        base_price_usd=p.base_price_usd,
        offers=[
            OfferOut(
                offer_id=o.offer_id,
                label_ar=o.label_ar,
                quantity=o.quantity,
                price_usd=o.price_usd,
                compare_at_usd=o.compare_at_usd,
                is_default=o.is_default,
            )
            for o in p.offers
        ],
    )
