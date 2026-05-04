# Project Architecture

SoukSham should be rebuilt as a small but serious production monorepo:

```text
souksham/
  frontend/
    app/
    components/
    lib/
    public/
    Dockerfile
    package.json
    next.config.ts
    .env.example
  backend/
    app/
      api/
      core/
      db/
      models/
      schemas/
      services/
      workers/
      main.py
    alembic/
    Dockerfile
    pyproject.toml
    alembic.ini
    .env.example
  docs/
  docker-compose.yml
  README.md
```

## Runtime Responsibilities

### Frontend

- Owns UI, CRO, cart drawer, checkout popup, timed upsell UI, web pixels, and thank-you page.
- Does not talk directly to Google Sheets.
- Does not send raw ad platform access tokens to the browser.
- Sends orders and tracking metadata to backend API.

### Backend

- Owns order validation, Lebanese phone normalization, database persistence, Sheet webhook, and CAPI forwarding.
- Generates and stores server-side event records.
- Hashes customer identifiers before CAPI calls.
- Provides admin/export endpoints only if secured by API key.

### Database

PostgreSQL database name: `souksham`.

Internal EasyPanel URL:

```text
postgres://souksham:souksham@souksham_souksham:5432/souksham?sslmode=disable
```

Backend should convert it to SQLAlchemy async format internally:

```text
postgresql+asyncpg://souksham:souksham@souksham_souksham:5432/souksham
```

Do not put the raw URL in frontend env.

## Domains

| Surface | URL |
|---|---|
| Frontend | `https://souksham.shop` |
| Backend API | `https://api.souksham.shop` |
| API docs in production | disabled or protected |

## Recommended Stack

### Frontend

- Next.js App Router.
- React + TypeScript.
- Tailwind CSS.
- Zustand for cart and checkout UI state.
- TanStack Query for API mutations if needed.
- Zod for client validation shared with forms.
- React Hook Form for checkout form.
- Embla Carousel for galleries/testimonials if needed.
- Framer Motion only for small micro-interactions; do not animate conversion-critical UI heavily.

### Backend

- Python 3.12.
- FastAPI.
- Uvicorn/Gunicorn.
- Pydantic Settings.
- SQLAlchemy 2 async.
- asyncpg.
- Alembic migrations.
- httpx for outbound webhooks and CAPI.
- structlog or standard JSON logging.
- pytest + httpx test client.

## API Design

Base URL: `https://api.souksham.shop`.

Minimum endpoints:

- `GET /health`
- `GET /products`
- `GET /products/{slug}`
- `POST /orders/checkout`
- `POST /tracking/event`
- `POST /webhooks/sheet/test` protected by API key, optional

The frontend may also statically define products at first. If speed matters, hardcode products in `frontend/lib/products.ts` and keep backend product tables for order integrity.

## Deployment Model

EasyPanel should run:

- `frontend` container.
- `backend` container.
- existing Postgres service.

Each container needs its own `.env`.

Migrations:

- Preferred: separate migration command/service before backend starts.
- Acceptable for EasyPanel if no one can configure a pre-start job: entrypoint runs `alembic upgrade head` before starting Uvicorn. Use a single backend replica to avoid race conditions.

## Performance Budget

- LCP under 2.5s on 4G mid-range device.
- JS under control: defer pixels, lazy-load non-critical media, use `next/image`.
- Home page should not load all product gallery media.
- PDP hero image should be preloaded; below-fold assets lazy.
- Web pixels load after consent/interaction or after idle timeout, not blocking initial paint.

## Data Flow

```text
Ad click -> landing page -> product offer selected -> cart drawer opens
Cart checkout -> checkout popup -> name/phone valid -> timed upsell
Upsell accept/decline -> POST /orders/checkout
Backend validates -> DB transaction -> Sheet webhook -> CAPI Purchase events
Frontend thank-you page -> web pixel Purchase with same event_id for dedup
```

## Security Basics

- CORS allow only `https://souksham.shop` and local dev origin.
- Backend API secrets stay in backend env only.
- Rate-limit checkout endpoint by IP and phone.
- Store raw phone in DB only if needed operationally; store normalized phone and hashed phone for tracking.
- Validate every cart line server-side against known products/offers. Never trust client price.
