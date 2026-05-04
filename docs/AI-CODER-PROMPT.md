# Prompt To Give Your AI Coder

You are building SoukSham / سوق الشام as a premium Lebanon-market Arabic DTC store. Read all docs in `docs/` before coding, starting with `docs/AI-CODER-START-HERE.md`.

## Non-Negotiables

- Market is **Lebanon**, not KSA.
- Copy must be Lebanese-friendly Arabic.
- COD-only. No online payment in this build.
- Domain: `https://souksham.shop`.
- Backend domain: `https://api.souksham.shop`.
- Monorepo folders required: `frontend/` and `backend/`.
- Frontend: Next.js App Router + React + TypeScript + Tailwind.
- Backend: Python FastAPI + PostgreSQL + SQLAlchemy async + Alembic.
- Database name: `souksham`.
- EasyPanel Postgres internal URL: `postgres://souksham:souksham@souksham_souksham:5432/souksham?sslmode=disable`; convert to asyncpg format in backend config.

## Docs You Must Follow

Read and implement from:

- `docs/PROJECT-ARCHITECTURE.md`
- `docs/BRAND-POSITIONING-LEBANON-ICP.md`
- `docs/COPYWRITING-LEBANESE-ARABIC.md`
- `docs/CRO-OFFER-AOV-PLAYBOOK.md`
- `docs/DESIGN-SYSTEM.md`
- `docs/FRONTEND-SPEC.md`
- `docs/BACKEND-SPEC.md`
- `docs/CHECKOUT-ORDER-FLOW.md`
- `docs/TRACKING-PIXELS-CAPI.md`
- `docs/DEPLOYMENT-EASYPANEL.md`
- `docs/COD-OPERATIONS-LEBANON.md`
- `docs/CODING-RULES.md`

Sheet files:

- `docs/sheets/google_apps_script_webhook.js`
- `docs/sheets/orders_template.csv`
- `docs/sheets/order_items_template.csv`
- `docs/sheets/events_template.csv`

## Build Requirements

Create:

```text
frontend/
backend/
docker-compose.yml
README.md
```

### Frontend

Build:

- Home page.
- Collection page.
- 3 product landing/PDP pages.
- About page.
- Contact page.
- Policies pages.
- Cart drawer.
- Checkout popup.
- Timed upsell popup.
- Thank-you page.
- Deferred web pixels for Meta, TikTok, Snap.

Product CTAs:

- Add selected offer to cart.
- Open cart drawer.
- Show cross-sells.

Checkout:

- Name + Lebanese mobile.
- Accept local mobile examples: `03123456`, `70123456`, `71123456`, `76123456`, `78123456`, `79123456`, `81123456`.
- Normalize in frontend only enough for display/validation; backend is source of truth.

### Backend

Build:

- `/health`
- `/orders/checkout`
- `/tracking/event`
- optional `/products`

Backend must:

- Normalize Lebanese mobile to local and E.164 (`+961...`).
- Recalculate prices server-side.
- Save orders/items/events to PostgreSQL.
- Send order to Google Sheet webhook.
- Fire CAPI events for Meta, TikTok, Snap with hashed identifiers.
- Deduplicate with same `event_id` as frontend web pixels.
- Run Alembic migrations in EasyPanel deployment flow.

### Tracking

Implement:

- Meta Pixel + CAPI.
- TikTok Pixel + Events API.
- Snap Pixel + CAPI.
- Web pixels deferred for speed.
- Backend hashes phone for CAPI.
- For Snap phone hash, use digits-only country format (`961...`) before SHA-256.
- Store event payload/status in DB.

### Design / Copy

Use:

- Primary color `#123C2F`.
- Arabic RTL.
- Header with circle monogram `SS`, text `سوق الشام`, smaller `souksham`.
- Premium, credible layout.
- Desktop alternating text/image sections.
- Mobile-first sticky CTA.
- Placeholder images for hero/product/gallery until real images are provided.

Do not invent:

- Reviews.
- Certifications.
- Delivery rates.
- Doctor/expert endorsements.
- Fake scarcity.

Use labeled placeholders where real proof is pending.

## Completion Criteria

- `frontend` builds successfully.
- `backend` tests pass.
- Dockerfiles exist for both.
- `docker-compose.yml` runs locally.
- `.env.example` exists for frontend and backend.
- Backend migration creates all tables.
- Checkout creates order in DB and sends Sheet payload.
- Tracking builders have tests for phone normalization/hash/dedup.
- Documentation remains updated if implementation differs.
