# Checkout + Order Flow

## Goal

COD checkout for Lebanon, optimized for speed, trust, AOV, and confirmation rate.

No checkout page. Checkout is a modal opened from cart drawer.

## Flow

```text
PDP/Collection CTA -> add offer to cart -> open cart drawer
Cart CTA -> checkout modal
Name + Lebanese phone valid -> timed upsell
Upsell accept/decline/timeout -> backend order submit
Backend -> DB + Sheet webhook + CAPI
Frontend -> web Purchase pixels + thank-you
```

## Cart Behavior

Any product CTA:

1. Adds selected offer to cart.
2. Opens cart drawer immediately.
3. Shows cross-sells.
4. Lets user add cross-sell or click product details.

Cart drawer must be fast and never navigate away.

## Checkout Modal

Fields:

- Name.
- Lebanese mobile number.

Copy:

```text
بيانات بسيطة لتأكيد طلبك
ما في دفع الآن. منحتاج الاسم ورقم الموبايل لتأكيد الطلب وتجهيز التوصيل.
```

Phone helper:

```text
مثال: 03123456 أو 70123456
```

Validation:

- Strip spaces/hyphens/parentheses.
- Accept `+961`, `961`, `00961`, or local.
- Convert to local format.
- Valid local prefixes: `03`, `70`, `71`, `76`, `78`, `79`, `81`.

Do not ask for address in first checkout. The confirmation team collects address by phone to keep form friction low.

## Timed Upsell

After valid form submit, show one relevant upsell for 10–15s.

This is the only discounted product location.

Rules:

- Upsell product should not already be in cart.
- If all relevant products are in cart, show no upsell and submit directly.
- Timer must not block indefinitely.
- User can decline clearly.

Payload records:

- `upsell.shown`
- `upsell.decision`: `accepted`, `declined`, `timeout`, `not_shown`
- `upsell.product_slug`
- `upsell.offer_id`

## Backend Order Creation

Backend must:

1. Validate payload.
2. Normalize phone.
3. Recalculate prices.
4. Create order in DB transaction.
5. Create order items.
6. Create tracking event record.
7. Send Sheet webhook.
8. Fire CAPI Purchase events.
9. Return order number.

If Sheet webhook fails:

- Do not lose order.
- Save `sheet_error`.
- Return success if DB order was saved.
- Provide admin retry later.

## Thank-You Page

Content:

- "تم استلام طلبك بنجاح"
- Order number.
- "راح نراجع الطلب ونتواصل معك للتأكيد قبل التجهيز."
- "خلي موبايلك قريب منك."
- Delivery expectation for Lebanon.
- Recommended products.

Mask phone:

```text
70***456
```

## Confirmation Team Sheet Needs

Sheet rows must include:

- Order number.
- Customer name.
- Phone local and E.164.
- Products/offers.
- Total USD.
- Source/campaign/ad.
- Upsell decision.
- Notes/status columns for call team.

See `docs/sheets/orders_template.csv` and `docs/sheets/order_items_template.csv`.
