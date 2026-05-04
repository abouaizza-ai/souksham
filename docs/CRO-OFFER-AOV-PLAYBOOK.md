# CRO + Offer + AOV Playbook

## North Star

Maximize profitable COD orders, confirmation rate, delivery rate, and AOV without fake claims.

Primary funnel:

```text
Ad -> PDP/landing page -> offer selected -> cart drawer -> checkout popup -> timed upsell -> thank-you
```

## Offer Architecture

Every product must have a premium offer ladder:

1. **Single:** high anchor but still acceptable.
2. **Best seller bundle:** recommended, visually highlighted, best conversion.
3. **Family/stock-up bundle:** highest AOV, strongest per-unit value.

Example structure:

```text
قطعة واحدة — 149 ر.س
عرض الأكثر طلبًا: قطعتين — 249 ر.س (وفري 49 ر.س)
عرض البيت/العائلة: 3 قطع — 329 ر.س (أفضل قيمة)
```

Rules:

- Default selected offer should usually be middle offer.
- CTA text changes with selected offer price.
- Show savings but avoid fake "was price" unless real.
- Mention COD below offer selector.

## Cart Drawer Cross-Sells

Cart drawer must always show relevant cross-sells:

- "يكمل طلبك"
- "العميلات غالبًا يضيفون معه"
- "إضافة سريعة قبل إتمام الطلب"

Each cross-sell card:

- Small product image.
- One pain-based headline.
- Price.
- Add button.
- Link to product page.

Do not overload: 2–4 cross-sells max.

## Timed Checkout Upsell

After valid name + phone and form CTA, before final order submission:

- Show a 10–15 second upsell modal.
- This is the only discounted product moment.
- Must be relevant to cart contents.
- If user accepts: add item, submit final order.
- If user declines or timer ends: submit original order.

Upsell copy:

```text
عرض خاص قبل تأكيد طلبك
ضيف [product] الآن بسعر خاص لأن طلبك جاهز للتأكيد.
ينتهي العرض خلال 15 ثانية.
```

Buttons:

- Primary: "ضيفه للطلب بسعر خاص"
- Secondary: "لا، كمّل طلبي"

## PDP Conversion Sections

Minimum section order:

1. Hero with offer selector.
2. Trust row: COD, Lebanese phone confirmation, exchange, privacy.
3. Problem story: painful situation.
4. Product mechanism: how it solves.
5. Visual proof: 3–4 image slots.
6. Offer stack repeated.
7. Social proof: review slots and UGC.
8. Authority/proof: materials, supplier verification, quality checks.
9. Comparison table: random marketplace vs SoukSham curated offer.
10. FAQ/objections.
11. Cross-sell.
12. Final CTA.

## CRO Microcopy

Use these near forms and CTAs:

- "بدون دفع مسبق"
- "الدفع عند الاستلام"
- "نحتاج الرقم فقط لتأكيد الطلب"
- "رقم صحيح يساعدنا نؤكد طلبك أسرع"
- "لا نشارك بياناتك مع طرف تسويقي"
- "بتقدر تضيف أو تحذف قبل التأكيد"

## Scarcity Rules

Allowed:

- Real stock count from backend.
- Campaign offer ending date if true.
- "كمية الدفعة الحالية محدودة" if inventory batch is actually limited.

Not allowed:

- Fake timers that reset every reload.
- Fake "12 people viewing now".
- Fake "last item" without stock data.

Implementation:

- Use backend `inventory_status` field: `in_stock`, `low_stock`, `sold_out`, `preorder`.
- Use copy based on actual state.

## Social Proof System

Use a two-layer system:

### Pre-launch placeholders

- "مكان تقييمات العملاء بعد أول دفعة طلبات"
- "لقطات UGC تُضاف هنا"
- "نتائج وتجارب فعلية تُضاف بعد الإطلاق"

### Post-launch real proof

- UGC video thumbnails.
- Customer photos.
- Review snippets.
- Confirmation/delivery stats.
- Reorder/add-on stats.

Never display fake stars as real if no real reviews exist. Use design placeholders labeled internally and, if public, avoid implying real customers.

## Confirmation Rate Levers

COD businesses fail when customers ignore confirmation. The site must reduce that:

- Phone validation before submission.
- "اكتبي رقمك بدون مسافات، يبدأ بـ 05".
- Thank-you page explains: "راح يصلك اتصال/تأكيد".
- Show order summary and expected delivery.
- Save source campaign and ad id for call center context.

## Delivery Rate Levers

- Ask only name + phone at first for speed.
- Backend/order team can collect city/address during confirmation.
- Store best time to call later if needed.
- Do not promise exact delivery if operationally uncertain.
- Send clear item names and bundles to Sheet so confirmation team knows what to say.

## AOV Levers

- Bundle default.
- Cart cross-sells.
- Timed upsell.
- Free delivery threshold if margin allows.
- "Complete the set" logic.
- Order bumps tied to same pain.

## Success Metrics

Track these in DB and Sheet:

- Product view.
- Add to cart.
- Checkout opened.
- Checkout valid submitted.
- Upsell shown.
- Upsell accepted.
- Order created.
- Confirmation status.
- Delivery status.
- AOV.
- CAC by channel/campaign/ad.
