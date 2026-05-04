"""Static product catalog — source of truth for price validation."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class OfferRecord:
    offer_id: str
    label_ar: str
    quantity: int
    price_usd: float
    compare_at_usd: Optional[float] = None
    is_default: bool = False
    is_upsell_only: bool = False


@dataclass
class ProductRecord:
    slug: str
    name_ar: str
    name_en: str
    base_price_usd: float
    offers: list[OfferRecord] = field(default_factory=list)

    def get_offer(self, offer_id: str) -> Optional[OfferRecord]:
        return next((o for o in self.offers if o.offer_id == offer_id), None)


PRODUCT_CATALOG: dict[str, ProductRecord] = {
    "seat-gap-organizer": ProductRecord(
        slug="seat-gap-organizer",
        name_ar="منظّم الفجوة بين المقاعد — بَيْنَة",
        name_en="SoukSham BAYNA™",
        base_price_usd=39.0,
        offers=[
            OfferRecord("seat-gap-single", "قطعة واحدة", 1, 39.0),
            OfferRecord("seat-gap-double", "قطعتان — الأكثر طلباً", 2, 69.0, 78.0, is_default=True),
            OfferRecord("seat-gap-triple", "ثلاث قطع — الأكثر توفيراً", 3, 99.0, 117.0),
        ],
    ),
    "windshield-sun-shade": ProductRecord(
        slug="windshield-sun-shade",
        name_ar="درع حراري للزجاج الأمامي — بَرْق الظِلّ",
        name_en="SoukSham BARQ SHADE™",
        base_price_usd=39.0,
        offers=[
            OfferRecord("shade-single", "واحدة", 1, 39.0),
            OfferRecord("shade-double", "اثنتان — سيارتين أو احتياط", 2, 69.0, 78.0, is_default=True),
            OfferRecord("shade-triple", "ثلاث + حافظة حمل", 3, 99.0, 117.0),
        ],
    ),
    "magnetic-mount-charger-kit": ProductRecord(
        slug="magnetic-mount-charger-kit",
        name_ar="حامل مغناطيسي + شاحن سيارة — وَثِيق",
        name_en="SoukSham WATHIQ™",
        base_price_usd=39.0,
        offers=[
            OfferRecord("mount-single", "طقم واحد", 1, 39.0),
            OfferRecord("mount-double", "طقمان — سيارة ثانية أو هدية", 2, 69.0, 78.0, is_default=True),
            OfferRecord("mount-triple", "ثلاثة أطقم", 3, 99.0, 117.0),
        ],
    ),
}


def get_product(slug: str) -> Optional[ProductRecord]:
    return PRODUCT_CATALOG.get(slug)


def get_offer(product_slug: str, offer_id: str) -> Optional[OfferRecord]:
    product = get_product(product_slug)
    if not product:
        return None
    return product.get_offer(offer_id)
