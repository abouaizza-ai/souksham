# سوق الشام · SoukSham

متجر DTC عربي متميز للسوق اللبناني — دفع عند الاستلام، أسعار بالدولار.

**النطاق الرسمي:** [souksham.shop](https://souksham.shop)

---

## البنية (Monorepo)

```
souksham/
  frontend/     # Next.js 15 App Router + React + TypeScript + Tailwind
  backend/      # Python 3.12 + FastAPI + PostgreSQL + Alembic
  docs/         # وثائق المشروع
  docker-compose.yml
```

---

## التشغيل المحلي

### متطلبات

- Node.js 20+
- Python 3.12+
- PostgreSQL 16 (أو عبر Docker)

### خطوات سريعة

```bash
# 1. استنساخ المستودع والانتقال للمجلد
cd souksham

# 2. تشغيل كل شيء بـ Docker
docker compose up --build

# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
# API docs: http://localhost:8000/docs
```

### تشغيل يدوي

**Frontend:**

```bash
cd frontend
cp .env.example .env.local
# عدّل .env.local بإضافة بيانات البيكسلات وعنوان API
npm install
npm run dev
# http://localhost:3000
```

**Backend:**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
cp .env.example .env
# عدّل .env بإضافة DATABASE_URL وبيانات الـ CAPI
alembic upgrade head
uvicorn app.main:app --reload --port 8000
# http://localhost:8000
```

---

## المسارات الرئيسية

| المسار | الوصف |
|--------|--------|
| `/` | الرئيسية |
| `/collection` | المجموعة |
| `/products/[slug]` | صفحة منتج مع عروض |
| `/about` | من نحن |
| `/contact` | تواصل معنا |
| `/policies` | السياسات |
| `/thank-you` | شكراً |

**المنتجات:** `seat-gap-organizer` · `windshield-sun-shade` · `magnetic-mount-charger-kit`

---

## API الرئيسية

| الطريقة | المسار | الوصف |
|---------|--------|--------|
| GET | `/health` | فحص الخدمة |
| GET | `/products` | قائمة المنتجات |
| POST | `/orders/checkout` | إنشاء طلب |
| POST | `/tracking/event` | إرسال حدث تتبع |

---

## الاختبارات

```bash
cd backend
pytest tests/ -v
```

---

## قبل الإطلاق

1. **Frontend `.env.local`:** أضف معرفات البيكسلات (`META_PIXEL_ID`, `TIKTOK_PIXEL_ID`, `SNAP_PIXEL_ID`).
2. **Backend `.env`:** أضف `DATABASE_URL`, `META_ACCESS_TOKEN`, `TIKTOK_ACCESS_TOKEN`, `SNAP_ACCESS_TOKEN`, `SHEET_WEBHOOK_URL`.
3. **`frontend/app/contact/page.tsx`:** استبدل البريد الإلكتروني بالحقيقي.
4. **السياسات** تحت `/policies/*`: مراجعة قانونية.
5. **الصور:** استبدل `ImagePlaceholder` بصور حقيقية عبر `next/image`.
6. **التقييمات:** أضف تقييمات حقيقية بعد أول دفعة طلبات.

---

## نشر EasyPanel

- Frontend container من `frontend/Dockerfile`.
- Backend container من `backend/Dockerfile` — يشغّل `alembic upgrade head` تلقائياً عند الإقلاع.
- استخدم `postgres://souksham:souksham@souksham_souksham:5432/souksham?sslmode=disable` كـ `DATABASE_URL` — يتحول تلقائياً لصيغة asyncpg.

---

## الوثائق

انظر مجلد `docs/` للمواصفات الكاملة:

- `docs/AI-CODER-START-HERE.md` — نقطة البداية
- `docs/FRONTEND-SPEC.md` — مواصفات الواجهة
- `docs/BACKEND-SPEC.md` — مواصفات الخادم
- `docs/CHECKOUT-ORDER-FLOW.md` — تدفق الطلب
- `docs/TRACKING-PIXELS-CAPI.md` — التتبع والـ CAPI
- `docs/DESIGN-SYSTEM.md` — نظام التصميم
