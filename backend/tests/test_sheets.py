"""Tests for Sheet payload builder."""

import pytest

from app.services.sheets import build_sheet_payload


class TestSheetPayload:
    def test_payload_shape(self):
        payload = build_sheet_payload(
            order_number="SS-2026-000001",
            customer_name="أحمد الحسن",
            phone_local="70123456",
            phone_e164="+96170123456",
            total_usd=69.0,
            items=[
                {
                    "product_slug": "seat-gap-organizer",
                    "offer_id": "seat-gap-double",
                    "title_ar": "منظّم الفجوة",
                    "offer_label_ar": "قطعتان",
                    "quantity": 1,
                    "unit_price_usd": 69.0,
                    "line_total_usd": 69.0,
                    "is_upsell": False,
                }
            ],
            attribution={"utm_source": "tiktok", "utm_medium": "paid"},
            upsell={"decision": "not_shown"},
        )

        assert payload["order_number"] == "SS-2026-000001"
        assert payload["customer"]["phone_local"] == "70123456"
        assert payload["customer"]["phone_e164"] == "+96170123456"
        assert payload["total_usd"] == 69.0
        assert len(payload["lines"]) == 1
        assert payload["upsell_decision"] == "not_shown"
        assert payload["utm_source"] == "tiktok"
