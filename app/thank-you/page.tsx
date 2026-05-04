"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CrossSellSection } from "@/components/product/CrossSellSection";
import { formatUsd, products } from "@/lib/products";
import { site } from "@/lib/site";

type StoredOrder = {
  customer?: { name?: string; phone?: string };
  totalUsd?: number;
  lines?: Array<{
    slug: string;
    quantity: number;
    bundleLabel?: string;
    title?: string;
    subtotalUsd?: number;
  }>;
};

export default function ThankYouPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("souksham_last_order");
      if (!raw) {
        setOrder(null);
        return;
      }
      setOrder(JSON.parse(raw) as StoredOrder);
    } catch {
      setOrder(null);
    }
  }, []);

  const recommended = useMemo(() => {
    const slugs = order?.lines?.map((l) => l.slug) ?? [];
    if (slugs.length === 0) return products;
    const set = new Set(slugs);
    const rest = products.filter((p) => !set.has(p.slug));
    return rest.length ? rest : products;
  }, [order]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center">
          <p className="text-sm font-semibold text-emerald-900">تم استلام طلبك</p>
          <h1 className="mt-2 text-2xl font-bold text-stone-900">شكرًا لثقتك في {site.nameAr}</h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-700">
            سيُراجع فريقنا البيانات ويتواصل معك لتأكيد العنوان والدفع عند الاستلام داخل {site.countryNameAr}.
            لا يوجد اشتراك ولا رسائل تلقائية من الموقع.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-900">ماذا يحدث الآن؟ (CRO — تقليل القلق)</h2>
          <ul className="mt-4 space-y-3 text-sm text-stone-700">
            <li className="flex gap-2">
              <span className="text-emerald-600">①</span>
              <span>
                <strong>تأكيد الطلب:</strong> هدفنا التشغيلي{" "}
                <strong>{site.cro.confirmationRateValueAr}</strong> {site.cro.confirmationRateLabelAr} عندما تكون
                بياناتك واضحة وسريعة الرد.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">②</span>
              <span>
                <strong>التسليم بعد التأكيد:</strong> نستهدف{" "}
                <strong>{site.cro.deliveryRateValueAr}</strong> {site.cro.deliveryRateLabelAr} — يعتمد على عنوانك
                والناقل.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">③</span>
              <span>{site.cro.croNoteAr}</span>
            </li>
          </ul>
        </section>

        {order?.customer ? (
          <section className="mt-8 rounded-2xl border border-stone-200 bg-[#faf8f5] p-5">
            <h2 className="text-base font-bold text-stone-900">ملخص سريع</h2>
            <p className="mt-2 text-sm text-stone-700">
              الاسم: <strong>{order.customer.name}</strong>
            </p>
            <p className="text-sm text-stone-700">
              الجوال: <strong dir="ltr">{order.customer.phone}</strong>
            </p>
            {typeof order.totalUsd === "number" ? (
              <p className="mt-2 text-sm text-stone-700">
                الإجمالي: <strong>{formatUsd(order.totalUsd)}</strong>
              </p>
            ) : null}
            {order.lines?.length ? (
              <ul className="mt-3 space-y-1 border-t border-stone-200 pt-3 text-xs text-stone-600">
                {order.lines.map((l, i) => (
                  <li key={i}>
                    {l.title} — {l.bundleLabel} × {l.quantity}{" "}
                    {typeof l.subtotalUsd === "number" ? `(${formatUsd(l.subtotalUsd)})` : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : (
          <p className="mt-8 text-center text-sm text-stone-500">
            إن لم يظهر الملخص هنا، افتح هذه الصفحة مباشرة بعد إتمام الطلب من نفس الجهاز والمتصفح.
          </p>
        )}

        <CrossSellSection title="قد يعجبك أيضًا — أكمل نظام المقصورة" items={recommended} />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/collection"
            className="rounded-full border border-stone-300 bg-white px-6 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            العودة للمجموعة
          </Link>
          <Link
            href="/"
            className="rounded-full bg-[#1e3a2f] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2d5a45]"
          >
            الرئيسية
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
