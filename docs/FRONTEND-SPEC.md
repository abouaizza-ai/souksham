# Frontend Spec

## Goal

Build `frontend/` as a responsive Arabic DTC storefront optimized for TikTok/Snapchat traffic and COD conversion.

## Stack

- Next.js App Router.
- React + TypeScript.
- Tailwind CSS.
- Zustand for cart drawer and checkout state.
- React Hook Form + Zod for checkout validation.
- TanStack Query optional for API mutations.
- `next/image` for images.
- No heavy UI framework.

## Environment

`frontend/.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://souksham.shop
NEXT_PUBLIC_API_BASE_URL=https://api.souksham.shop

NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
NEXT_PUBLIC_SNAP_PIXEL_ID=

NEXT_PUBLIC_TRACKING_ENABLED=true
NEXT_PUBLIC_DEBUG_TRACKING=false
```

Do not expose CAPI tokens in frontend env.

## Routes

| Route | Purpose |
|---|---|
| `/` | Brand home page |
| `/collection` | Product collection |
| `/products/[slug]` | Campaign-style product page |
| `/about` | Brand trust and story |
| `/contact` | Support/contact |
| `/policies` | Policy hub |
| `/policies/privacy` | Privacy |
| `/policies/terms` | Terms |
| `/policies/shipping` | Shipping |
| `/policies/returns` | Returns/exchange |
| `/thank-you` | Success page |

No separate checkout page.

## Layout

Root layout:

- `html lang="ar" dir="rtl"`.
- Metadata from brand constants.
- Deferred tracking provider.
- Cart provider.
- Header/footer on public routes.

## Header

RTL header:

- Right: circular monogram `س ش`, then text logo `سوق الشام`, English `souksham`.
- Center/left: nav.
- Cart icon with item count.
- Mobile menu drawer.

Header menu:

- الرئيسية
- المجموعة
- من نحن
- تواصل معنا
- السياسات
- السلة

## Footer

Footer groups:

- Brand promise.
- Shop links.
- Policies.
- Contact.
- Trust badges.
- Domain/copyright.

## Home Page Sections

1. Hero:
   - Premium brand promise.
   - CTA to collection.
   - COD/trust badges.
   - Hero image placeholder.
2. "ليش سوق الشام؟":
   - curation, clarity, COD, support.
3. Featured products:
   - cards with add-to-cart.
4. Selection standard:
   - how products are chosen.
5. Social proof/UGC preview slots.
6. COD explanation.
7. FAQ.

## Collection Page

- Page hero with brand positioning.
- Product grid.
- Sort/filter optional for later.
- Each card:
  - Image.
  - Product label.
  - Emotional headline.
  - Rating/proof placeholder.
  - Price from.
  - CTA add default offer to cart and open cart drawer.
  - Secondary link to PDP.

## Product Page

Use `ProductLandingPage` component with data-driven sections.

### Hero

- Breadcrumb/category.
- Headline.
- Subheadline.
- Rating/proof row.
- Scarcity/stock copy.
- Offer selector.
- CTA: add selected offer and open cart.
- COD microcopy.
- Image gallery placeholder.

### Required Sections

- Problem/pain story.
- Product mechanism.
- Benefits grid.
- Visual proof with 3–4 images.
- Offer repeated.
- Social proof/UGC.
- Authority/quality proof.
- Comparison table.
- FAQ.
- Cross-sell.
- Final CTA.

### Sticky CTA

Mobile sticky bottom:

- Selected offer price.
- CTA add to cart.
- Cart icon.

## Cart Drawer

State library: Zustand.

Cart item model:

```ts
type CartLine = {
  productSlug: string;
  offerId: string;
  quantity: number;
  addedFrom?: "home" | "collection" | "pdp" | "cart_cross_sell" | "upsell";
};
```

Drawer behavior:

- Opens automatically after add-to-cart.
- Shows item list with quantity controls.
- Shows subtotal.
- Shows cross-sells.
- CTA opens checkout modal.

Cross-sell logic:

- Pick products not in cart.
- Prefer products with `crossSellPriority` and matching category/problem.
- 2–4 items max.

## Checkout Modal

Form fields:

- `name`: min 2 characters.
- `phone`: Lebanese mobile only. Accept local forms such as `03123456`, `70123456`, `71123456`, `76123456`, `78123456`, `79123456`, `81123456`. Spaces, hyphens, parentheses, and `+961` may be normalized.

Validation:

```ts
const lebanonMobileRegex = /^(?:03|70|71|76|78|79|81)\d{6}$/;
```

On submit:

- Generate `event_id` UUID for checkout/order.
- Store tracking identifiers: `fbp`, `fbc`, TikTok cookies, Snap cookies where available.
- Show timed upsell first.

## Timed Upsell

State:

```ts
type UpsellDecision = "accepted" | "declined" | "timeout";
```

Display for 10–15s.

If accepted:

- Add discounted upsell line.
- Continue order submission.

If declined/timeout:

- Continue original order.

## Order Submit Payload

POST `${NEXT_PUBLIC_API_BASE_URL}/orders/checkout`

```json
{
  "event_id": "uuid",
  "customer": {
    "name": "string",
    "phone_local": "0501234567"
  },
  "cart": [
    {
      "product_slug": "string",
      "offer_id": "string",
      "quantity": 1,
      "added_from": "pdp"
    }
  ],
  "upsell": {
    "shown": true,
    "decision": "accepted",
    "product_slug": "string",
    "offer_id": "string"
  },
  "attribution": {
    "landing_page": "string",
    "referrer": "string",
    "utm_source": "string",
    "utm_medium": "string",
    "utm_campaign": "string",
    "utm_content": "string",
    "utm_term": "string",
    "fbclid": "string",
    "ttclid": "string",
    "sc_click_id": "string",
    "fbp": "string",
    "fbc": "string"
  }
}
```

Backend returns:

```json
{
  "ok": true,
  "order_id": "uuid",
  "order_number": "SS-2026-000001",
  "total_sar": 349,
  "event_id": "uuid"
}
```

Then:

- Fire web pixel Purchase with same `event_id`.
- Clear cart.
- Store summary in `sessionStorage`.
- Navigate `/thank-you?order=<order_number>`.

## Thank You Page

Must include:

- Confirmation heading.
- Order number.
- What happens next.
- Keep phone nearby.
- Delivery estimate.
- Recommended products.
- Soft "follow us" placeholder.

Do not show raw phone in full; mask it.

## Image Placeholder Component

Create `ImagePlaceholder`:

- Props: `label`, `ratio`, `tone`.
- Use gradient and border.
- Easy to replace later with `next/image`.

## Tracking Loading

Create `TrackingProvider`:

- Defers loading scripts until `requestIdleCallback`, first interaction, or 2500ms timeout.
- Handles web pixel events.
- Sends parallel backend `/tracking/event` for CAPI on meaningful events.

See `docs/TRACKING-PIXELS-CAPI.md`.
