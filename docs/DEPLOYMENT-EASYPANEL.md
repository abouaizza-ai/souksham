# Deployment — EasyPanel

## Target

- Frontend: `https://souksham.shop`
- Backend: `https://api.souksham.shop`
- Database: existing PostgreSQL service named `souksham`

Internal database URL given:

```text
postgres://souksham:souksham@souksham_souksham:5432/souksham?sslmode=disable
```

Backend should use asyncpg format:

```text
postgresql+asyncpg://souksham:souksham@souksham_souksham:5432/souksham
```

## Services

Create two EasyPanel apps from the same GitHub repo:

1. `souksham-frontend`
2. `souksham-backend`

Each service builds from its folder:

- frontend context: `frontend/`
- backend context: `backend/`

## Root docker-compose.yml

AI coder should create a root compose for local dev:

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    env_file:
      - ./frontend/.env.local
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    env_file:
      - ./backend/.env
    depends_on:
      - postgres

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: souksham
      POSTGRES_USER: souksham
      POSTGRES_PASSWORD: souksham
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

EasyPanel can use its own managed Postgres instead of this local service.

## Frontend Dockerfile Requirements

- Build with `npm ci`.
- Run `npm run build`.
- Start with `npm run start`.
- Expose `3000`.
- Runtime env must include API base URL and pixel IDs.

## Backend Dockerfile Requirements

- Install dependencies.
- Copy Alembic files.
- Expose `8000`.
- Run `entrypoint.sh`.

`entrypoint.sh`:

```sh
#!/usr/bin/env sh
set -e
alembic upgrade head
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
```

If EasyPanel supports separate release commands, move `alembic upgrade head` there instead of startup.

## Frontend Env

```env
NEXT_PUBLIC_SITE_URL=https://souksham.shop
NEXT_PUBLIC_API_BASE_URL=https://api.souksham.shop
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
NEXT_PUBLIC_SNAP_PIXEL_ID=
NEXT_PUBLIC_TRACKING_ENABLED=true
NEXT_PUBLIC_DEBUG_TRACKING=false
```

## Backend Env

```env
APP_ENV=production
API_BASE_URL=https://api.souksham.shop
FRONTEND_URL=https://souksham.shop
CORS_ORIGINS=https://souksham.shop
DATABASE_URL=postgresql+asyncpg://souksham:souksham@souksham_souksham:5432/souksham
SHEET_WEBHOOK_URL=
SHEET_WEBHOOK_SECRET=
META_PIXEL_ID=
META_ACCESS_TOKEN=
TIKTOK_PIXEL_ID=
TIKTOK_ACCESS_TOKEN=
SNAP_PIXEL_ID=
SNAP_ACCESS_TOKEN=
BACKEND_API_KEY=
```

## DNS

At domain DNS provider:

| Host | Type | Target |
|---|---|---|
| `@` | A | EasyPanel server IP |
| `www` | CNAME or A | frontend target / server IP |
| `api` | A | EasyPanel server IP |

In EasyPanel:

- Attach `souksham.shop` to frontend.
- Attach `www.souksham.shop` to frontend and redirect to apex if possible.
- Attach `api.souksham.shop` to backend.
- Enable SSL certificates for all.

## Health Checks

Backend:

- `/health`

Frontend:

- `/`

## Release Checklist

- DB connected.
- Alembic migration runs.
- `/health` returns ok.
- Frontend can call backend.
- CORS allows frontend.
- Checkout creates DB order.
- Sheet receives row.
- Meta/TikTok/Snap test events accepted.
- `robots.txt` and `sitemap.xml` use `https://souksham.shop`.
