"""Hashing utilities for CAPI."""

from __future__ import annotations

import hashlib


def sha256_hex(value: str) -> str:
    """Return SHA-256 lowercase hex of the given string."""
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def hash_phone_meta(phone_e164: str) -> str:
    """Hash phone for Meta CAPI. Use E.164 form."""
    return sha256_hex(phone_e164.strip())


def hash_phone_tiktok(phone_e164: str) -> str:
    """Hash phone for TikTok Events API. Use E.164 form."""
    return sha256_hex(phone_e164.strip())


def hash_phone_snap(phone_e164: str) -> str:
    """Hash phone for Snap CAPI. Use digits-only country format (no +)."""
    import re
    digits_only = re.sub(r"[^\d]", "", phone_e164)
    return sha256_hex(digits_only)
