# Tracking Pixels + CAPI

## Goal

Track the funnel accurately across Meta, TikTok, and Snapchat while keeping page speed high.

Use both:

- Browser pixels for real-time optimization.
- Server-side CAPI for resilience and match quality.

## Events

Minimum events:

| Funnel step | Web pixel | Backend CAPI |
|---|---:|---:|
| Page view | yes | optional |
| Product view | yes | yes |
| Add to cart | yes | yes |
| Checkout opened | yes | yes |
| Valid checkout submitted | yes (`Lead` or `InitiateCheckout`) | yes |
| Purchase/order created | yes | yes |
| Upsell accepted | custom event | backend event |

## Deferred Web Pixels

Pixels must not block LCP.

Load strategy:

1. Wait for `requestIdleCallback`, or
2. First user interaction, or
3. 2500ms fallback timeout.

Do not load ad scripts in the critical `<head>` path unless the business explicitly accepts the speed cost.

## Deduplication

Generate one UUID `event_id` per meaningful event in frontend.

Use same `event_id` for:

- Web pixel event.
- Backend `/tracking/event`.
- Backend CAPI call.

For Purchase:

- `event_id` generated before checkout submit.
- Send to backend in `/orders/checkout`.
- Backend sends CAPI Purchase using that event_id.
- Frontend fires web pixel Purchase after success with same event_id.

## User Data

Frontend may send raw customer phone only to backend checkout endpoint. It must not hash/send directly to CAPI endpoints.

Backend hashes identifiers:

- SHA-256 lowercase hex.
- Normalize before hashing.

## Lebanese Phone Normalization for Tracking

Input examples:

- `03123456`
- `70123456`
- `+96170123456`
- `0096170123456`

Local normalized:

- `03123456`
- `70123456`

E.164:

- `03123456` -> `+9613123456`
- `70123456` -> `+96170123456`

Digits-only country format:

- `9613123456`
- `96170123456`

Platform guidance:

- Meta CAPI accepts hashed phone in `ph`; normalize consistently before SHA-256. Use E.164 without spaces. Keep the plus sign if following E.164 convention.
- TikTok Events API should use SHA-256 hashed phone; use E.164 convention for normalization before hash.
- Snap CAPI phone normalization requires country code and digits only; remove `+` and non-numeric characters before hashing.

If a platform rejects plus-hashed values, create platform-specific normalizers in backend service and document with tests.

## Attribution Fields

Store and forward where possible:

- `fbp`
- `fbc`
- `fbclid`
- TikTok click id: `ttclid`
- Snapchat click id: `sc_click_id`
- landing page
- referrer
- UTMs
- IP address
- user agent

## Meta

Frontend:

- Pixel PageView, ViewContent, AddToCart, InitiateCheckout, Purchase.

Backend CAPI:

- Endpoint from Meta Marketing API.
- Send `event_name`, `event_time`, `event_id`, `action_source: "website"`, `event_source_url`, `user_data`, `custom_data`.

Dedup:

- Same `event_name` and `event_id` across pixel and CAPI.

## TikTok

Frontend:

- TikTok Pixel events: ViewContent, AddToCart, InitiateCheckout, CompletePayment/Purchase depending SDK mapping.

Backend:

- Events API with `event_id`.
- Include hashed phone if available.
- Include value/currency and content ids.

## Snapchat

Frontend:

- Snap Pixel events where configured.

Backend:

- Conversions API v3.
- Endpoint pattern: `https://tr.snapchat.com/v3/{PIXEL_ID}/events?access_token={TOKEN}`.
- Use `event_id` for dedup.
- For purchase, map to transaction/dedup ID as required by Snap docs.
- Phone hash should be digits-only with country code, no plus.

## Backend Service Shape

Create services:

- `services/hashing.py`
- `services/capi_meta.py`
- `services/capi_tiktok.py`
- `services/capi_snap.py`
- `services/tracking.py`

Each CAPI call:

- Has timeout.
- Retries once for transient errors.
- Logs response status.
- Never blocks order creation indefinitely. Use short timeouts or background task.

## Testing

Add unit tests for:

- Lebanese phone normalization.
- SHA-256 output stable.
- Event ID reused in request builders.
- Purchase payload includes total/currency/items.

## Privacy

Privacy page must say:

- The store uses pixels and server-side events to measure ads and improve service.
- Phone may be hashed and sent to advertising platforms for conversion measurement.
- No raw phone is sent to ad platforms.
- Customer can contact support for data requests.
