# Backend Spec — FastAPI + PostgreSQL

## Goal

Build `backend/` as the operational core for a Lebanon COD DTC store:

- Validate checkout payloads.
- Normalize Lebanese mobile numbers.
- Recalculate prices server-side.
- Save orders, items, events, and attribution.
- Send orders to Google Sheets via webhook.
- Fire Meta/TikTok/Snap CAPI events.
- Run database migrations in deploy flow.

## Stack

- Python 3.12
- FastAPI
- Pydantic v2
- Pydantic Settings
- SQLAlchemy 2 async
- asyncpg
- Alembic
- httpx
- uvicorn/gunicorn
- pytest

## Environment

Create `backend/.env.example`:

```env
APP_ENV=production
API_BASE_URL=https://api.souksham.shop
FRONTEND_URL=https://souksham.shop
CORS_ORIGINS=https://souksham.shop,http://localhost:3000

DATABASE_URL=postgresql+asyncpg://souksham:souksham@souksham_souksham:5432/souksham

SHEET_WEBHOOK_URL=
SHEET_WEBHOOK_SECRET=

ORDER_NUMBER_PREFIX=SS
ORDER_CONFIRMATION_COUNTRY=LB

META_PIXEL_ID=
META_ACCESS_TOKEN=
TIKTOK_PIXEL_ID=
TIKTOK_ACCESS_TOKEN=
SNAP_PIXEL_ID=
SNAP_ACCESS_TOKEN=

BACKEND_API_KEY=
```

If EasyPanel gives:

```text
postgres://souksham:souksham@souksham_souksham:5432/souksham?sslmode=disable
```

convert in config to:

```text
postgresql+asyncpg://souksham:souksham@souksham_souksham:5432/souksham
```

## Project Structure

```text
backend/
  app/
    api/
      routes/
        health.py
        orders.py
        tracking.py
        products.py
    core/
      config.py
      logging.py
      security.py
    db/
      session.py
      base.py
    models/
      order.py
      product.py
      event.py
    schemas/
      orders.py
      tracking.py
      products.py
    services/
      pricing.py
      phone.py
      orders.py
      sheets.py
      capi_meta.py
      capi_tiktok.py
      capi_snap.py
      hashing.py
    main.py
  alembic/
  tests/
  Dockerfile
  pyproject.toml
  alembic.ini
  entrypoint.sh
  .env.example
```

## Database Tables

### products

Static products can live in frontend initially, but backend needs product/offer records for price integrity.

Columns:

- `id` uuid pk
- `slug` unique text
- `name_ar`
- `name_en`
- `category`
- `status` enum: `active`, `draft`, `archived`
- `base_price_usd`
- `created_at`, `updated_at`

### product_offers

- `id` uuid pk
- `product_id` fk
- `offer_id` text unique per product
- `label_ar`
- `quantity`
- `price_usd`
- `compare_at_usd` nullable
- `is_default`
- `is_upsell_only`
- `sort_order`

### orders

- `id` uuid pk
- `order_number` unique text
- `status` enum: `new`, `confirmed`, `no_answer`, `cancelled`, `shipped`, `delivered`, `returned`
- `customer_name`
- `phone_local` e.g. `70123456`
- `phone_e164` e.g. `+96170123456`
- `phone_hash_sha256`
- `currency` default `USD`
- `subtotal_usd`
- `discount_usd`
- `total_usd`
- `source_channel`
- `landing_page`
- `referrer`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `fbclid`, `ttclid`, `sc_click_id`
- `fbp`, `fbc`
- `event_id`
- `ip_address`
- `user_agent`
- `sheet_synced_at` nullable
- `sheet_error` nullable
- `created_at`, `updated_at`

### order_items

- `id` uuid pk
- `order_id` fk
- `product_slug`
- `offer_id`
- `title_ar`
- `offer_label_ar`
- `quantity`
- `unit_price_usd`
- `line_total_usd`
- `added_from`
- `is_upsell`
- `created_at`

### tracking_events

- `id` uuid pk
- `event_id`
- `event_name`
- `source` enum: `web`, `server`, `sheet`
- `order_id` nullable fk
- `payload_json`
- `meta_status`, `tiktok_status`, `snap_status`
- `created_at`

### sheet_delivery_logs

- `id` uuid pk
- `order_id` fk
- `status_code`
- `response_text`
- `attempt`
- `created_at`

## Endpoints

### GET /health

Returns:

```json
{ "ok": true, "service": "souksham-api" }
```

### GET /products

Optional if frontend uses backend products.

### POST /orders/checkout

Validates checkout, creates order, sends sheet webhook, fires CAPI.

Rules:

- Never trust frontend price.
- Recalculate every line from `product_offers`.
- Reject unknown `product_slug` or `offer_id`.
- Reject empty cart.
- Validate Lebanese mobile.
- Normalize phone before saving.

Input:

```json
{
  "event_id": "uuid",
  "customer": {
    "name": "Ali Haddad",
    "phone_local": "70123456"
  },
  "cart": [
    {
      "product_slug": "seat-gap-organizer",
      "offer_id": "two-pack",
      "quantity": 1,
      "added_from": "pdp"
    }
  ],
  "upsell": {
    "shown": true,
    "decision": "accepted",
    "product_slug": "windshield-sun-shade",
    "offer_id": "upsell-one"
  },
  "attribution": {
    "landing_page": "https://souksham.shop/products/...",
    "referrer": "",
    "utm_source": "tiktok",
    "utm_medium": "paid",
    "utm_campaign": "campaign",
    "utm_content": "ad",
    "utm_term": "",
    "fbclid": "",
    "ttclid": "",
    "sc_click_id": "",
    "fbp": "",
    "fbc": ""
  }
}
```

Output:

```json
{
  "ok": true,
  "order_id": "uuid",
  "order_number": "SS-2026-000001",
  "total_usd": 149,
  "event_id": "uuid"
}
```

### POST /tracking/event

Receives non-purchase events for CAPI:

- `PageView`
- `ViewContent`
- `AddToCart`
- `InitiateCheckout`
- `Lead`

Use rate limiting. Do not block UX if this endpoint fails.

## Lebanese Phone Normalization

Accepted local mobile prefixes:

- `03`
- `70`
- `71`
- `76`
- `78`
- `79`
- `81`

Normalize:

- Remove spaces, hyphens, parentheses.
- Accept `+96170123456`, `96170123456`, `0096170123456`, `70123456`.
- Convert to local `70123456` or `03123456`.
- Convert to E.164:
  - `70123456` -> `+96170123456`
  - `03123456` -> `+9613123456` (remove local leading zero after country code)

Regex after local normalization:

```python
LEBANON_MOBILE_RE = re.compile(r"^(?:03|70|71|76|78|79|81)\d{6}$")
```

## Hashing for CAPI

Use SHA-256 lowercase hex.

Phone:

- Normalize to E.164 first.
- Meta/TikTok: hash `+961...` unless platform-specific docs require digits only.
- Snap: remove `+` and non-numeric characters before hashing, e.g. `96170123456`.

Email is optional; if added later, lowercase and trim before hashing.

## Migrations

Preferred in EasyPanel:

- Backend image includes Alembic.
- Add a deploy/pre-start command:

```bash
alembic upgrade head
```

If EasyPanel cannot run a separate migration job, `entrypoint.sh` may run migrations before Uvicorn:

```bash
#!/usr/bin/env sh
set -e
alembic upgrade head
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Only use one backend replica with this startup migration approach.

## Dockerfile Requirements

- Non-root user.
- Install dependencies with lockfile.
- Expose port `8000`.
- Healthcheck hits `/health`.

## Error Handling

Checkout must return user-safe errors:

- `INVALID_PHONE`
- `INVALID_CART`
- `OFFER_UNAVAILABLE`
- `ORDER_CREATE_FAILED`

Log full internal details server-side, never expose tokens or DB errors.
