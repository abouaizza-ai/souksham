# COD Operations — Lebanon

## Goal

Increase confirmation and delivery rate for Lebanon COD orders.

The website creates clean orders. The operations team confirms details by phone and updates Sheet/DB status.

## Order Status Flow

```text
new -> confirmed -> shipped -> delivered
new -> no_answer
new/confirmed -> cancelled
shipped -> returned
```

## What Website Collects

Only:

- Name.
- Lebanese mobile.
- Cart/order details.
- Attribution.

Do not collect full address in the first web form unless confirmation rate shows it is needed. Asking less increases lead completion.

## What Confirmation Team Collects

During call:

- City/area.
- Street/building.
- Delivery notes.
- Preferred delivery time.
- Confirmation yes/no.

## Confirmation Script

```text
مرحبا، معك فريق سوق الشام. وصلنا طلب باسم [NAME] لمنتج [PRODUCT/OFFER].
بدنا نأكد الطلب والتوصيل قبل التجهيز.
المجموع [TOTAL] دولار والدفع عند الاستلام.
ممكن تأكدلي المنطقة والعنوان؟
```

If customer asks "من وين جبتوا رقمي؟":

```text
حضرتك تركت الرقم على موقع سوق الشام لإتمام الطلب. منستخدمه فقط لتأكيد الطلب والتوصيل.
```

## No Answer Cadence

- Attempt 1: within 15–60 minutes if possible.
- Attempt 2: later same day.
- Attempt 3: next day.
- Then status `no_answer`.

## Delivery Rate Levers

- Confirm exact product and total.
- Repeat COD clearly.
- Ask for best delivery window.
- Avoid shipping unclear orders.
- Tag customers who sounded unsure.

## Sheet Status Columns

The Sheet should include:

- `order_status`
- `confirmation_attempts`
- `confirmed_at`
- `delivery_city`
- `delivery_area`
- `address_notes`
- `agent_notes`
- `delivered_at`
- `return_reason`

## Product Naming for Calls

Use simple names, not only brand names:

```text
بَيْنَة — منظم الفجوة بين المقاعد
بَرْق الظِلّ — مظلة/درع الزجاج
وَثِيق — حامل وشاحن مغناطيسي
```

## Upsell During Call

If customer accepted web upsell, confirm it naturally:

```text
شايف عندي كمان أضفت العرض الخاص [UPSELL]، صحيح؟
```

If customer did not accept:

- Do not hard-sell.
- Optional soft mention only if margin/ops supports it:

```text
في منتج بيكمل طلبك إذا بتحب/بتحبي شوفه لاحقًا، بس هلأ نثبت طلبك الأساسي.
```
