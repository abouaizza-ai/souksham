"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import type { CheckoutLineView } from "@/components/checkout/CheckoutModal";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CrossSellSection } from "@/components/product/CrossSellSection";
import {
  cartLinesSubtotal,
  formatUsd,
  getCrossSellProducts,
  getProduct,
  lineSubtotal,
} from "@/lib/products";
import { site } from "@/lib/site";

export default function CartPage() {
  const { lines, setQty, removeLine, clear } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const resolved = useMemo(() => {
    return lines
      .map((line) => {
        const p = getProduct(line.slug);
        if (!p) return null;
        const b = p.bundle[line.bundleIndex];
        if (!b) return null;
        const v: CheckoutLineView = {
          line,
          title: `${p.marketingNameAr} (${p.marketingNameEn})`,
          bundleLabel: b.labelAr,
          subtotal: lineSubtotal(line),
        };
        return v;
      })
      .filter(Boolean) as CheckoutLineView[];
  }, [lines]);

  const cross = useMemo(() => getCrossSellProducts(lines), [lines]);
  const total = useMemo(() => cartLinesSubtotal(lines), [lines]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-stone-900">سلة التسوق</h1>
        <p className="mt-2 text-sm text-stone-600">
          راجع العروض والكميات — ثم أكمل الطلب. لا اشتراك ولا رسائل من الموقع.
        </p>

        {lines.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
            <p className="text-stone-700">السلة فارغة حاليًا.</p>
            <Link
              href="/collection"
              className="mt-4 inline-flex rounded-full bg-[#1e3a2f] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2d5a45]"
            >
              تصفّح المجموعة
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 space-y-4">
              {resolved.map((r) => {
                const p = getProduct(r.line.slug)!;
                const b = p.bundle[r.line.bundleIndex];
                return (
                  <li
                    key={`${r.line.slug}-${r.line.bundleIndex}`}
                    className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-semibold text-stone-900">{r.title}</p>
                        <p className="text-xs text-stone-500">{r.bundleLabel}</p>
                        <p className="mt-1 text-sm text-stone-600">
                          سعر العرض: {formatUsd(b.priceUsd)} × {r.line.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                        <label className="flex items-center gap-2 text-sm text-stone-700">
                          <span>الكمية</span>
                          <input
                            type="number"
                            min={1}
                            max={99}
                            value={r.line.quantity}
                            onChange={(e) =>
                              setQty(r.line.slug, r.line.bundleIndex, Number(e.target.value) || 1)
                            }
                            className="w-16 rounded border border-stone-300 px-2 py-1 text-end"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => removeLine(r.line.slug, r.line.bundleIndex)}
                          className="text-xs font-medium text-red-700 hover:underline"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 text-end text-sm font-bold text-stone-900">
                      المجموع: {formatUsd(r.subtotal)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-stone-200 bg-[#faf8f5] p-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-stone-600">الإجمالي المقدّر</p>
                <p className="text-2xl font-bold text-stone-900">{formatUsd(total)}</p>
                <p className="text-xs text-stone-500">الدفع عند الاستلام — {site.currency}</p>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="rounded-full bg-[#1e3a2f] px-8 py-3 text-sm font-bold text-white hover:bg-[#2d5a45]"
              >
                إتمام الطلب
              </button>
            </div>

            <CrossSellSection title="أكمل طلبك — مقترحات سريعة" items={cross} />
          </>
        )}
      </main>
      <SiteFooter />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        lines={resolved}
        onSuccess={() => clear()}
      />
    </>
  );
}
