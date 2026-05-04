# AI Coder Start Here — SoukSham 2026 DTC Build

This is the source-of-truth brief for rebuilding **SoukSham / سوق الشام** as a premium Arabic DTC store for high-ticket dropshipping products.

## Non-Negotiable Outcome

Build a branded commerce system that makes dropshipped products feel like owned, curated, proof-backed SoukSham products:

- Arabic-first, Lebanon-market conversion copy.
- Premium DTC feel, not AliExpress/catalog feel.
- COD-only checkout.
- High AOV via bundles, cart cross-sells, and a single post-submit timed upsell.
- Strong authority and social proof, but never fake certifications, reviews, or claims. Use placeholders clearly marked as pending until real assets arrive.
- Frontend and backend split into two deployable folders: `frontend/` and `backend/`.
- Backend: Python FastAPI + PostgreSQL database `souksham`.
- Domain: `https://souksham.shop`.
- API domain: `https://api.souksham.shop`.

## Build Order

1. Read every file in `docs/` before coding.
2. Create a monorepo structure:
   - `frontend/`: Next.js + React + TypeScript + Tailwind.
   - `backend/`: FastAPI + SQLAlchemy + Alembic + PostgreSQL.
   - `docs/`: keep these docs.
3. Implement the data model and API contracts in `docs/BACKEND-SPEC.md`.
4. Implement the frontend routes and sections in `docs/FRONTEND-SPEC.md`.
5. Implement checkout, upsell, order submission, Sheet webhook, and CAPI events in `docs/CHECKOUT-ORDER-FLOW.md` and `docs/TRACKING-PIXELS-CAPI.md`.
6. Keep copy, UX, and design aligned with:
   - `docs/BRAND-POSITIONING-LEBANON-ICP.md`
   - `docs/COPYWRITING-LEBANESE-ARABIC.md`
   - `docs/CRO-OFFER-AOV-PLAYBOOK.md`
   - `docs/DESIGN-SYSTEM.md`

## Product Pages Required

Create product/landing pages that sell one product at a time and look like campaign landing pages, not simple PDPs.

Each page must include:

- Product hero: headline, subheadline, rating row, scarcity, best offer selector, CTA.
- Sticky mobile CTA.
- Offer ladder: single, bundle, family/stock-up offer.
- Proof stack: UGC quote slots, before/after or situation images, expert/supplier proof slots, guarantee.
- Pain-to-relief sections.
- Science/mechanism section where appropriate, using accurate language only.
- Trust strip: COD, delivery, secure data, guarantee, support.
- FAQ and objection handling.
- Cross-sell section.
- CTA adds selected offer to cart and opens cart drawer.

## Key Conversion Rule

No checkout page. Checkout happens in a popup from the cart drawer:

1. Cart drawer shows selected items and cross-sells.
2. Checkout CTA opens popup.
3. Popup has order summary, social proof, scarcity, name and Lebanese mobile phone.
4. Validate Lebanese mobile only: `03XXXXXX`, `70XXXXXX`, `71XXXXXX`, `76XXXXXX`, `78XXXXXX`, `79XXXXXX`, or `81XXXXXX`; normalize server-side to `+961...`.
5. On valid submit, show a 10–15s timed relevant upsell with the only discount on the site.
6. If accepted, add upsell and submit final order.
7. If declined or timer ends, submit original order.
8. Send order to backend, backend saves DB, sends Sheet webhook, fires CAPI events, returns success.
9. Redirect to thank-you page.

## Source Files

- Sheet webhook script: `docs/sheets/google_apps_script_webhook.js`
- Sheet templates:
  - `docs/sheets/orders_template.csv`
  - `docs/sheets/order_items_template.csv`
  - `docs/sheets/events_template.csv`
- AI implementation prompt: `docs/AI-CODER-PROMPT.md`

## Important Ethics / Compliance

Authority must be true. Never invent:

- Real certifications.
- Ministry approvals.
- Dermatologist/doctor endorsements.
- Customer reviews.
- Before/after results.
- Delivery rates.

Use labeled placeholders until the business has real proof. Premium pricing comes from curation, presentation, offer, proof architecture, and operational trust, not fake claims.
