# Design System

## Direction

Premium Arabic DTC. Calm, trustworthy, high-margin, mobile-first. It should feel closer to a curated brand than a marketplace.

## Brand Colors

```css
:root {
  --color-primary: #123C2F;
  --color-primary-hover: #1D5644;
  --color-primary-soft: #EAF3EE;
  --color-gold: #C8972C;
  --color-gold-soft: #F7E8C1;
  --color-sand: #F7F1E8;
  --color-cream: #FFFCF6;
  --color-ink: #171412;
  --color-muted: #6B625C;
  --color-border: #E5DDD2;
  --color-danger: #B42318;
  --color-success: #18794E;
}
```

## Typography

Use:

- Arabic: `Noto Sans Arabic` or `IBM Plex Sans Arabic`.
- English small labels: Inter or same Arabic font.

Rules:

- Arabic pages `dir="rtl"`.
- Product prices can use LTR where needed.
- Headings large and confident.
- Body line-height generous.

## Logo/Header

Header layout RTL:

```text
[cart] [menu links]                         [سوق الشام / souksham] [circle monogram]
```

Because RTL UI reads right-to-left, brand sits on the right:

- Circle monogram in primary green.
- Letters inside: **س ش**.
- Next to it:
  - `سوق الشام`
  - `souksham` below, smaller.

Header must be sticky on mobile.

Desktop nav:

- الرئيسية
- المجموعة
- من نحن
- تواصل معنا
- السياسات
- السلة

Mobile:

- logo
- cart icon with badge
- menu drawer

## Components

### Product Card

Must include:

- Image placeholder.
- Category/routine label.
- Heading.
- Subheading.
- Star/rating row with truthful status.
- Price from.
- Scarcity/stock state if real.
- CTA: "ضيفه عالسلة" or "اختار العرض".

### Offer Selector

Use cards:

- Selected offer has primary border.
- Best offer badge in gold.
- Savings in green.
- COD reassurance below.

### Cart Drawer

Right-side drawer on desktop, bottom sheet on mobile.

Sections:

- Cart items.
- Offer savings summary.
- Cross-sells.
- Checkout CTA.
- COD trust microcopy.

### Checkout Modal

Should feel like final confirmation, not a long form:

- Order summary at top.
- Trust badges.
- Name field.
- Phone field.
- Example: `0501234567`.
- Error copy under field.
- Submit button.

### Timed Upsell Modal

Design:

- Countdown ring or simple timer bar.
- Product mini card.
- Discount badge.
- Two buttons.
- No dark-pattern close hiding; user can decline clearly.

## Image Placeholders

Until real images exist:

- Use styled gradient/image placeholders with clear labels.
- Ratio:
  - Hero: 4:5 mobile, 1:1 or 4:3 desktop.
  - Product gallery: 1:1.
  - Content sections: 4:3.

Example placeholder copy:

```text
صورة المنتج الرئيسية
استبدلها بصورة UGC/استوديو لاحقًا
```

## Section Layout

Desktop:

- Alternate content sections:
  - Text right, image left.
  - Image right, text left.
- Keep text max width around 540px.

Mobile:

- Image first for visual sections.
- CTA visible after first scroll and sticky at bottom on PDP.

## Motion

Allowed:

- Drawer slide.
- Modal fade/scale.
- Offer selected state.
- Countdown progress.

Avoid:

- Heavy parallax.
- Animations delaying CTA.
- Carousels as only proof access.

## Accessibility

- Buttons must be real `<button>`.
- Links are links.
- Use visible focus states.
- Modals trap focus.
- Cart drawer has ESC close.
- Input errors use `aria-describedby`.
