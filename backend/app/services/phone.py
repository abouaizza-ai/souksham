"""Lebanese phone normalization and validation."""

from __future__ import annotations

import re

# Valid local prefixes for Lebanon
LEBANON_PREFIXES = {"03", "70", "71", "76", "78", "79", "81"}
_LOCAL_RE = re.compile(r"^(03|70|71|76|78|79|81)\d{6}$")


def normalize_lebanese_phone(raw: str) -> tuple[str, str]:
    """
    Normalize a Lebanese mobile number.

    Returns (phone_local, phone_e164).
    phone_local: 8-digit local form e.g. "70123456"
    phone_e164: E.164 form e.g. "+96170123456"

    Raises ValueError if the number is not valid Lebanese mobile.
    """
    s = raw.strip().replace(" ", "").replace("-", "").replace("(", "").replace(")", "")

    # Strip international prefix
    if s.startswith("+961"):
        s = s[4:]
    elif s.startswith("00961"):
        s = s[5:]
    elif s.startswith("961") and len(s) >= 11:
        s = s[3:]

    # Validate local form
    if not _LOCAL_RE.match(s):
        raise ValueError(f"Invalid Lebanese mobile: {raw!r}")

    phone_local = s

    # Build E.164
    # Lebanon country code 961; for 03XXXXXX the leading 0 is a trunk prefix
    # and must be dropped: +9613XXXXXX. For 70/71/76/78/79/81 no trunk zero.
    subscriber = phone_local[1:] if phone_local.startswith("0") else phone_local
    phone_e164 = f"+961{subscriber}"

    return phone_local, phone_e164


def is_valid_lebanese_phone(raw: str) -> bool:
    try:
        normalize_lebanese_phone(raw)
        return True
    except ValueError:
        return False


def phone_digits_only(phone_e164: str) -> str:
    """Return digits-only country format for Snap CAPI: e.g. '96170123456'."""
    return re.sub(r"[^\d]", "", phone_e164)
