"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import {
  formatUsd,
  cartLinesSubtotal,
  getUpsellProduct,
  getProduct,
  getOfferById,
} from "@/lib/products";
import {
  isValidLebanesePhone,
  normalizeLebanesePhone,
  checkoutPhoneExampleAr,
  checkoutPhoneErrorAr,
} from "@/lib/checkout";
import { generateEventId, getAttributionData, fireMetaPixel, fireTikTokPixel, fireSnapPixel } from "@/lib/tracking";
import { TimedUpsell } from "@/components/checkout/TimedUpsell";

type UpsellDecision = "accepted" | "declined" | "timeout" | "not_shown";

export function CheckoutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { lines, clear, closeCart } = useCartStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"form" | "upsell">("form");
  const eventIdRef = useRef<string>(generateEventId());
  const attributionRef = useRef(getAttributionData());

  const total = cartLinesSubtotal(lines);
  const upsellData = getUpsellProduct(lines);

  // ESC to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  function validateForm(): boolean {
    let valid = true;
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setNameError("الرجاء إدخال الاسم الكامل.");
      valid = false;
    } else {
      setNameError(null);
    }
    if (!isValidLebanesePhone(normalizeLebanesePhone(phone))) {
      setPhoneError(checkoutPhoneErrorAr);
      valid = false;
    } else {
      setPhoneError(null);
    }
    return valid;
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    // Fire frontend tracking
    fireMetaPixel("InitiateCheckout", { value: total, currency: "USD", num_items: lines.length });
    fireTikTokPixel("InitiateCheckout", { value: total, currency: "USD" });
    fireSnapPixel("START_CHECKOUT", { price: total, currency: "USD" });

    // Show upsell if applicable
    if (upsellData) {
      setPhase("upsell");
    } else {
      void submitOrder("not_shown", null);
    }
  }

  async function submitOrder(
    decision: UpsellDecision,
    upsellLine: { product_slug: string; offer_id: string } | null,
  ) {
    setLoading(true);
    setGlobalError(null);
    const localPhone = normalizeLebanesePhone(phone);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.souksham.shop";

    const cartPayload: { product_slug: string; offer_id: string; quantity: number; added_from: string }[] = lines.map((l) => ({
      product_slug: l.productSlug as string,
      offer_id: l.offerId,
      quantity: l.quantity,
      added_from: l.addedFrom ?? "pdp",
    }));

    // Add upsell line if accepted
    if (decision === "accepted" && upsellLine) {
      cartPayload.push({
        product_slug: upsellLine.product_slug,
        offer_id: upsellLine.offer_id,
        quantity: 1,
        added_from: "upsell",
      });
    }

    const payload = {
      event_id: eventIdRef.current,
      customer: {
        name: name.trim(),
        phone_local: localPhone,
      },
      cart: cartPayload,
      upsell: {
        shown: upsellData !== null,
        decision,
        product_slug: upsellData?.product.slug ?? null,
        offer_id: upsellData?.offer.id ?? null,
      },
      attribution: attributionRef.current,
    };

    try {
      const res = await fetch(`${apiUrl}/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({} as Record<string, unknown>))) as {
        ok?: boolean;
        order_number?: string;
        total_usd?: number;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        const errorMap: Record<string, string> = {
          INVALID_PHONE: "رقم الموبايل غير صحيح. تحقق من الرقم وحاول مجدداً.",
          INVALID_CART: "هناك مشكلة في السلة. حاول إعادة إضافة المنتجات.",
          OFFER_UNAVAILABLE: "أحد العروض لم يعد متاحاً. يرجى تحديث الصفحة.",
          ORDER_CREATE_FAILED: "تعذر إنشاء الطلب. يرجى المحاولة لاحقاً.",
        };
        const code = (data.error as string) ?? "";
        setGlobalError(errorMap[code] ?? "تعذر إرسال الطلب. حاول مرة أخرى.");
        setLoading(false);
        setPhase("form");
        return;
      }

      // Fire purchase pixels
      const purchaseData = {
        value: data.total_usd ?? total,
        currency: "USD",
        content_ids: lines.map((l) => l.productSlug),
        event_id: eventIdRef.current,
        order_id: data.order_number,
      };
      fireMetaPixel("Purchase", purchaseData);
      fireTikTokPixel("CompletePayment", purchaseData);
      fireSnapPixel("PURCHASE", { price: data.total_usd ?? total, currency: "USD", transaction_id: data.order_number });

      // Save summary to sessionStorage
      sessionStorage.setItem(
        "souksham_last_order",
        JSON.stringify({
          order_number: data.order_number,
          total_usd: data.total_usd ?? total,
          customer_name: name.trim(),
          phone_masked: maskPhone(localPhone),
          lines: lines.map((l) => {
            const product = getProduct(l.productSlug);
            const offer = getOfferById(l.productSlug, l.offerId);
            return {
              title: product?.marketingNameAr ?? l.productSlug,
              offer_label: offer?.labelAr ?? l.offerId,
              quantity: l.quantity,
              subtotal: (offer?.priceUsd ?? 0) * l.quantity,
            };
          }),
        }),
      );

      clear();
      closeCart();
      onClose();
      router.push(`/thank-you?order=${data.order_number ?? ""}`);
    } catch {
      setGlobalError("خطأ في الشبكة. تحقق من الاتصال وحاول مجدداً.");
    } finally {
      setLoading(false);
    }
  }

  function handleUpsellAccept() {
    void submitOrder("accepted", upsellData ? { product_slug: upsellData.product.slug, offer_id: upsellData.offer.id } : null);
  }

  function handleUpsellDecline(reason: "declined" | "timeout") {
    void submitOrder(reason, null);
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 sm:items-center sm:p-4">
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
      >
        {phase === "upsell" && upsellData ? (
          <TimedUpsell
            product={upsellData.product}
            offer={upsellData.offer}
            currentTotal={total}
            onAccept={handleUpsellAccept}
            onDecline={() => handleUpsellDecline("declined")}
            onTimeout={() => handleUpsellDecline("timeout")}
            loading={loading}
          />
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-[#E5DDD2] bg-white px-4 py-3">
              <h2 id="checkout-modal-title" className="text-lg font-bold text-[#171412]">
                إتمام الطلب
              </h2>
              <button type="button" onClick={onClose} className="rounded-full p-2 text-[#6B625C] hover:bg-[#EAF3EE]" aria-label="أغلق">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} noValidate className="space-y-4 px-4 py-4 sm:px-5">
              {/* Trust note */}
              <div className="rounded-xl border border-[#EAF3EE] bg-[#EAF3EE] px-3 py-2.5 text-xs leading-relaxed text-[#123C2F]">
                <p className="font-semibold">بيانات بسيطة لتأكيد طلبك</p>
                <p className="mt-0.5 text-[#123C2F]/70">ما في دفع الآن. منحتاج الاسم ورقم الموبايل لتأكيد الطلب وتجهيز التوصيل.</p>
              </div>

              {/* Order summary */}
              <div className="rounded-xl border border-[#E5DDD2] bg-[#F7F1E8] p-3">
                <p className="text-xs font-semibold text-[#6B625C] uppercase tracking-wide mb-2">ملخص الطلب</p>
                <ul className="space-y-1.5">
                  {lines.map((l) => {
                    const product = getProduct(l.productSlug);
                    const offer = getOfferById(l.productSlug, l.offerId);
                    if (!product || !offer) return null;
                    return (
                      <li key={`${l.productSlug}:${l.offerId}`} className="flex justify-between text-sm">
                        <span className="text-[#171412]">
                          {product.marketingNameAr} × {l.quantity}
                          <span className="block text-xs text-[#6B625C]">{offer.labelAr}</span>
                        </span>
                        <span className="font-medium text-[#171412]">{formatUsd(offer.priceUsd * l.quantity)}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-2 flex justify-between border-t border-[#E5DDD2] pt-2 text-base font-bold text-[#171412]">
                  <span>الإجمالي</span>
                  <span className="text-[#123C2F]">{formatUsd(total)}</span>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#171412]" htmlFor="co-name">
                  الاسم الكامل
                </label>
                <input
                  id="co-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E5DDD2] px-3 py-2.5 text-end text-[#171412] outline-none focus:border-[#123C2F] focus:ring-2 focus:ring-[#123C2F]/20"
                  placeholder="مثال: أحمد الحسن"
                  aria-describedby={nameError ? "co-name-error" : undefined}
                />
                {nameError && (
                  <p id="co-name-error" className="mt-1 text-xs font-medium text-[#B42318]">{nameError}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#171412]" htmlFor="co-phone">
                  رقم الموبايل اللبناني
                </label>
                <input
                  id="co-phone"
                  name="phone"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E5DDD2] px-3 py-2.5 text-start text-[#171412] outline-none focus:border-[#123C2F] focus:ring-2 focus:ring-[#123C2F]/20"
                  placeholder="03123456 أو 70123456"
                  aria-describedby="co-phone-helper"
                />
                <p id="co-phone-helper" className="mt-1 text-[11px] text-[#6B625C]">
                  {checkoutPhoneExampleAr}
                </p>
                {phoneError && (
                  <p className="mt-1 text-xs font-medium text-[#B42318]">{phoneError}</p>
                )}
              </div>

              {globalError && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-[#B42318]">{globalError}</p>
              )}

              <button
                type="submit"
                disabled={loading || lines.length === 0}
                className="w-full rounded-full bg-[#123C2F] py-3.5 text-sm font-bold text-white hover:bg-[#1D5644] disabled:opacity-50"
              >
                {loading ? "جاري الإرسال…" : "أكمل الطلب →"}
              </button>

              <p className="text-[11px] leading-relaxed text-[#6B625C] text-center">
                رقمك بُستخدم لتأكيد الطلب فقط. بلا رسائل تسويقية من الموقع.{" "}
                <a href="/policies/terms" className="underline">الشروط</a>
                {" "}و{" "}
                <a href="/policies/privacy" className="underline">الخصوصية</a>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function maskPhone(phone: string): string {
  if (phone.length <= 4) return phone;
  const start = phone.slice(0, 2);
  const end = phone.slice(-3);
  return `${start}***${end}`;
}
