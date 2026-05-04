"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { products, formatUsd } from "@/lib/products";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

type LastOrder = {
  order_number?: string;
  total_usd?: number;
  customer_name?: string;
  phone_masked?: string;
  lines?: { title: string; offer_label: string; quantity: number; subtotal: number }[];
};

export default function ThankYouPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("souksham_last_order");
      if (raw) setOrder(JSON.parse(raw) as LastOrder);
    } catch {
      // ignore
    }
  }, []);

  // Cross-sells: products not in order
  const orderedSlugs = new Set(
    order?.lines?.map((l) =>
      products.find((p) => p.marketingNameAr === l.title)?.slug ?? "",
    ) ?? [],
  );
  const recommended = products.filter((p) => !orderedSlugs.has(p.slug)).slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Confirmation */}
        <section className="border-b border-[#E5DDD2] bg-[#EAF3EE] py-16 sm:py-20">
          <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#18794E]">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#171412] sm:text-3xl">
              تم استلام طلبك بنجاح!
            </h1>
            {order?.order_number && (
              <p className="mt-2 text-base font-semibold text-[#123C2F]">
                رقم الطلب: {order.order_number}
              </p>
            )}
            {order?.phone_masked && (
              <p className="mt-1 text-sm text-[#6B625C]">
                موبايلك المسجّل: <span dir="ltr">{order.phone_masked}</span>
              </p>
            )}
          </div>
        </section>

        {/* What next */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-xl px-4 sm:px-6">
            <div className="rounded-2xl border border-[#E5DDD2] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#171412]">شو بيصير هلأ؟</h2>
              <ol className="mt-4 space-y-3">
                {[
                  { title: "مراجعة الطلب", body: "راح نراجع الطلب ونتواصل معك للتأكيد قبل التجهيز." },
                  { title: "تأكيد هاتفي", body: "خلي موبايلك قريب منك — التأكيد السريع بيساعدنا نجهّز الطلب أسرع." },
                  { title: "التوصيل", body: "بعد التأكيد، بيتجهّز الطلب ويُرسل إليك. مدة التوصيل داخل لبنان غالباً ٢–٥ أيام عمل." },
                  { title: "الدفع عند الاستلام", body: "بتدفع نقداً بالدولار للمندوب عند استلام الطلب." },
                ].map((step, i) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123C2F] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-[#171412]">{step.title}</p>
                      <p className="text-sm text-[#6B625C]">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Order summary */}
            {order?.lines && order.lines.length > 0 && (
              <div className="mt-5 rounded-xl border border-[#E5DDD2] bg-[#F7F1E8] p-5">
                <p className="text-sm font-semibold text-[#6B625C] uppercase tracking-wide mb-3">ملخص طلبك</p>
                <ul className="space-y-2">
                  {order.lines.map((l, i) => (
                    <li key={i} className="flex justify-between text-sm">
                      <span className="text-[#171412]">
                        {l.title} × {l.quantity}
                        <span className="block text-xs text-[#6B625C]">{l.offer_label}</span>
                      </span>
                      <span className="font-medium text-[#171412]">{formatUsd(l.subtotal)}</span>
                    </li>
                  ))}
                </ul>
                {order.total_usd != null && (
                  <div className="mt-3 flex justify-between border-t border-[#E5DDD2] pt-2 text-base font-bold text-[#171412]">
                    <span>الإجمالي</span>
                    <span className="text-[#123C2F]">{formatUsd(order.total_usd)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Recommended */}
        {recommended.length > 0 && (
          <section className="border-t border-[#E5DDD2] bg-[#F7F1E8] py-12 sm:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <h2 className="text-center text-xl font-bold text-[#171412]">
                منتجات قد تعجبك أيضاً
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {recommended.map((p) => {
                  const defaultOffer = p.offers.find((o) => o.id === p.defaultOfferId) ?? p.offers[0];
                  return (
                    <article key={p.slug} className="rounded-2xl border border-[#E5DDD2] bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#123C2F]">{p.routineNameAr}</p>
                      <h3 className="mt-1 text-lg font-bold text-[#171412]">{p.marketingNameAr}</h3>
                      <p className="mt-1 text-sm text-[#6B625C]">{p.shortProblemAr}</p>
                      {defaultOffer && (
                        <p className="mt-2 text-sm font-bold text-[#123C2F]">{formatUsd(defaultOffer.priceUsd)}</p>
                      )}
                      <div className="mt-4 flex gap-2">
                        {defaultOffer && (
                          <AddToCartButton
                            productSlug={p.slug}
                            offerId={defaultOffer.id}
                            label="ضيفه عالسلة"
                            addedFrom="home"
                            className="flex-1"
                          />
                        )}
                        <Link
                          href={`/products/${p.slug}`}
                          className="rounded-full border border-[#E5DDD2] px-4 py-2 text-sm font-semibold text-[#171412] hover:bg-[#F7F1E8]"
                        >
                          التفاصيل
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
