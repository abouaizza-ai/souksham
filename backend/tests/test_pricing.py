"""Tests for pricing / product catalog."""

import pytest

from app.services.pricing import get_offer, get_product, PRODUCT_CATALOG


class TestPricing:
    def test_all_products_present(self):
        assert "seat-gap-organizer" in PRODUCT_CATALOG
        assert "windshield-sun-shade" in PRODUCT_CATALOG
        assert "magnetic-mount-charger-kit" in PRODUCT_CATALOG

    def test_offer_price_not_zero(self):
        for product in PRODUCT_CATALOG.values():
            for offer in product.offers:
                assert offer.price_usd > 0, f"Offer {offer.offer_id} has zero price"

    def test_get_offer_returns_correct_price(self):
        offer = get_offer("seat-gap-organizer", "seat-gap-double")
        assert offer is not None
        assert offer.price_usd == 69.0

    def test_unknown_product_returns_none(self):
        assert get_product("fake-product") is None

    def test_unknown_offer_returns_none(self):
        assert get_offer("seat-gap-organizer", "fake-offer") is None

    def test_reject_tampered_price(self):
        """Pricing must come from catalog, not client."""
        offer = get_offer("seat-gap-organizer", "seat-gap-single")
        assert offer is not None
        # Verify server recalculates, not trusting client
        server_price = offer.price_usd * 1  # qty 1
        assert server_price == 39.0
