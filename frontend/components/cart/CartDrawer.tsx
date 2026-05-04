"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatUsd, getCrossSellProducts, getProduct, getOfferById, cartLinesSubtotal } from "@/lib/products";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function CartDrawer() {
  const { isOpen, closeCart, lines, setQty, removeLine } = useCartStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const crossSells = getCrossSellProducts(lines);
  const subtotal = cartLinesSubtotal(lines);

  // ESC to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setCheckoutOpen(false);
        closeCart();
      }
    }
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  // Focus trap
  useEffect(() => {
    if (isOpen) drawerRef.current?.focus();
  }, [isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={() => { if (!checkoutOpen) closeCart(); }}
        aria-hidden="true"
      />

      {/* Drawer — right side on desktop, bottom sheet on mobile */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white shadow-2xl outline-none sm:bottom-auto sm:left-auto sm:top-0 sm:w-[420px] sm:h-screen"
        style={{ maxHeight: "92vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5DDD2] px-4 py-3 sm:px-5">
          <h2 id="cart-title" className="text-lg font-bold text-[#171412]">
            سلتك {lines.length > 0 && <span className="text-sm font-normal text-[#6B625C]">({lines.reduce((s, l) => s + l.quantity, 0)} قطعة)</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-2 text-[#6B625C] hover:bg-[#EAF3EE]"
            aria-label="أغلق السلة"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <svg className="h-14 w-14 text-[#E5DDD2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <p className="mt-4 font-semibold text-[#171412]">السلة فارغة</p>
              <p className="mt-1 text-sm text-[#6B625C]">أضف منتجاً لتبدأ الطلب</p>
              <Link
                href="/collection"
                onClick={closeCart}
                className="mt-5 rounded-full bg-[#123C2F] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1D5644]"
              >
                تصفّح المجموعة
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Lines */}
              <ul className="space-y-3">
                {lines.map((line) => {
                  const product = getProduct(line.productSlug);
                  const offer = getOfferById(line.productSlug, line.offerId);
                  if (!product || !offer) return null;
                  const subtotalLine = offer.priceUsd * line.quantity;
                  return (
                    <li key={`${line.productSlug}:${line.offerId}`} className="flex gap-3 rounded-xl border border-[#E5DDD2] p-3">
                      <div className="h-16 w-16 shrink-0">
                        <ImagePlaceholder ratio="1:1" label="" subLabel="" tone="sand" className="!rounded-lg h-16 w-16" />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm font-semibold text-[#171412]">{product.marketingNameAr}</p>
                        <p className="text-xs text-[#6B625C]">{offer.labelAr}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-lg border border-[#E5DDD2]">
                            <button
                              type="button"
                              onClick={() => setQty(line.productSlug, line.offerId, line.quantity - 1)}
                              className="px-2 py-1 text-[#123C2F] hover:bg-[#EAF3EE]"
                              aria-label="أقل"
                            >−</button>
                            <span className="min-w-[24px] text-center text-sm font-medium">{line.quantity}</span>
                            <button
                              type="button"
                              onClick={() => setQty(line.productSlug, line.offerId, line.quantity + 1)}
                              className="px-2 py-1 text-[#123C2F] hover:bg-[#EAF3EE]"
                              aria-label="أكثر"
                            >+</button>
                          </div>
                          <span className="text-sm font-bold text-[#123C2F]">{formatUsd(subtotalLine)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.productSlug, line.offerId)}
                        className="self-start p-1 text-[#6B625C] hover:text-[#B42318]"
                        aria-label="احذف من السلة"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Cross-sells */}
              {crossSells.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold text-[#6B625C] uppercase tracking-wide">يكمّل طلبك</p>
                  <div className="mt-2 space-y-2">
                    {crossSells.map((p) => {
                      const defaultOffer = p.offers.find((o) => o.id === p.defaultOfferId) ?? p.offers[0];
                      if (!defaultOffer) return null;
                      return (
                        <div key={p.slug} className="flex items-center gap-3 rounded-xl border border-[#E5DDD2] bg-[#F7F1E8] p-3">
                          <div className="h-12 w-12 shrink-0">
                            <ImagePlaceholder ratio="1:1" label="" subLabel="" tone="sand" className="!rounded-lg h-12 w-12" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-semibold text-[#171412]">{p.marketingNameAr}</p>
                            <p className="text-xs text-[#6B625C]">{p.shortProblemAr.slice(0, 50)}…</p>
                            <p className="text-xs font-bold text-[#123C2F]">{formatUsd(defaultOffer.priceUsd)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => useCartStore.getState().addLine(p.slug, defaultOffer.id, 1, "cart_cross_sell")}
                            className="shrink-0 rounded-lg bg-[#123C2F] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1D5644]"
                          >
                            ضيفه
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer with CTA */}
        {lines.length > 0 && (
          <div className="border-t border-[#E5DDD2] px-4 py-4 sm:px-5">
            <div className="mb-3 flex justify-between text-base font-bold text-[#171412]">
              <span>المجموع</span>
              <span className="text-[#123C2F]">{formatUsd(subtotal)}</span>
            </div>
            <p className="mb-3 text-center text-xs text-[#6B625C]">بدون دفع مسبق · الدفع نقداً عند الاستلام بعد التأكيد</p>
            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              className="w-full rounded-full bg-[#123C2F] py-3.5 text-sm font-bold text-white hover:bg-[#1D5644]"
            >
              إتمام الطلب
            </button>
          </div>
        )}
      </div>

      {checkoutOpen && (
        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </>
  );
}
