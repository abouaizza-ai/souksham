# Brand Lock — SoukSham

**هذه الأسماء قُفلت. لا تعدّلها بدون تحديث هذا الملف و `lib/site.ts`.**

## الاسم الرسمي

| اللغة | الاسم |
|------|------|
| English | **SoukSham** |
| العربية | **سوق الشام** |
| Slug | `souksham` |
| Domain | **souksham.shop** |
| Canonical URL | **https://souksham.shop** |

### القواعد

1. **الإنجليزي يُكتب بـ CamelCase واحد:** `SoukSham` — وليس `Souk Sham` ولا `Souk-Sham` ولا `souk sham`.
2. **العربي يُكتب بفراغ واحد بين كلمتين:** `سوق الشام` — وليس `سوق شام` ولا `سوق-الشام`.
3. **النطاق دائمًا بصيغة `souksham.shop`** (lowercase). أي عرض على واجهة المتجر يستخدم `site.domain`.
4. **عناوين البريد:** استخدم `<role>@souksham.shop` (مثلاً `support@souksham.shop`, `orders@souksham.shop`).
5. **حسابات المنصات (احجزها مبكرًا):** Instagram / TikTok / X / YouTube → `souksham`. إن كان مأخوذًا، استخدم `souksham.shop` كبديل واحد متّسق عبر كل المنصات.

## مصدر الحقيقة (Source of Truth)

كل النصوص والـ metadata والـ sitemap والـ robots تستهلك القيم من:

- **`lib/site.ts`** → `site.nameAr`, `site.nameEn`, `site.brandSlug`, `site.domain`, `site.url`
- **`app/layout.tsx`** → `metadataBase`, OpenGraph, Twitter card, canonical
- **`app/robots.ts`** و **`app/sitemap.ts`** → يبنيان الروابط من `site.url`

## فحص بصري سريع قبل النشر

- شعار/Header → `سوق الشام · SoukSham` (لا تخلط الترتيب).
- Footer → `© <year> SoukSham. جميع الحقوق محفوظة.`
- Email في `app/contact/page.tsx` → بدّل `support@example.com` بـ `support@souksham.shop` عند تجهيز البريد.
- اطبع `<title>` و`og:url` على عينة من الصفحات وتأكد من وجود `souksham.shop` في كليهما.
