"""Tests for Lebanese phone normalization and hashing."""

import pytest

from app.services.phone import (
    normalize_lebanese_phone,
    is_valid_lebanese_phone,
    phone_digits_only,
)
from app.services.hashing import hash_phone_meta, hash_phone_snap, hash_phone_tiktok


class TestNormalizeLebansePhone:
    def test_local_70(self):
        local, e164 = normalize_lebanese_phone("70123456")
        assert local == "70123456"
        assert e164 == "+96170123456"

    def test_local_03(self):
        local, e164 = normalize_lebanese_phone("03123456")
        assert local == "03123456"
        assert e164 == "+9613123456"

    def test_with_plus961(self):
        local, e164 = normalize_lebanese_phone("+96170123456")
        assert local == "70123456"
        assert e164 == "+96170123456"

    def test_with_00961(self):
        local, e164 = normalize_lebanese_phone("0096170123456")
        assert local == "70123456"
        assert e164 == "+96170123456"

    def test_with_spaces(self):
        local, e164 = normalize_lebanese_phone("70 12 34 56")
        assert local == "70123456"

    def test_valid_prefixes(self):
        for prefix in ["03", "70", "71", "76", "78", "79", "81"]:
            local, _ = normalize_lebanese_phone(f"{prefix}123456")
            assert local == f"{prefix}123456"

    def test_invalid_prefix_05(self):
        with pytest.raises(ValueError):
            normalize_lebanese_phone("05123456")

    def test_invalid_prefix_00(self):
        with pytest.raises(ValueError):
            normalize_lebanese_phone("00123456")

    def test_too_short(self):
        with pytest.raises(ValueError):
            normalize_lebanese_phone("7012345")

    def test_too_long(self):
        with pytest.raises(ValueError):
            normalize_lebanese_phone("701234567")


class TestHashingStability:
    def test_meta_hash_stable(self):
        h = hash_phone_meta("+96170123456")
        assert h == hash_phone_meta("+96170123456")
        assert len(h) == 64

    def test_snap_hash_uses_digits_only(self):
        # Snap should strip +
        h_snap = hash_phone_snap("+96170123456")
        # Should hash "96170123456" not "+96170123456"
        import hashlib
        expected = hashlib.sha256("96170123456".encode()).hexdigest()
        assert h_snap == expected

    def test_meta_and_snap_differ(self):
        # Meta uses +96170123456, Snap uses 96170123456 — they should differ
        h_meta = hash_phone_meta("+96170123456")
        h_snap = hash_phone_snap("+96170123456")
        assert h_meta != h_snap

    def test_digits_only_format(self):
        result = phone_digits_only("+96170123456")
        assert result == "96170123456"


class TestIsValid:
    def test_valid(self):
        assert is_valid_lebanese_phone("70123456")
        assert is_valid_lebanese_phone("+96170123456")
        assert is_valid_lebanese_phone("03555555")

    def test_invalid(self):
        assert not is_valid_lebanese_phone("05123456")
        assert not is_valid_lebanese_phone("1234567890")
        assert not is_valid_lebanese_phone("")
