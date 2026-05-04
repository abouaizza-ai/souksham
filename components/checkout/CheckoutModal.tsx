"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { checkoutPhoneExampleAr, isValidCheckoutPhone, normalizeCheckoutPhone } from "@/lib/checkout";
import type { CartLine } from "@/lib/products";
import { formatUsd } from "@/lib/products";
import { site } from "@/lib/site";

export type CheckoutLineView = {
  line: CartLine;
  title: string;
  bundleLabel: string;
  subtotal: number;
};

export function CheckoutModal({
  open,
  onClose,
  lines,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  lines: CheckoutLineView[];
  onSuccess: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const total = useMemo(() => lines.reduce((s, l) => s + l.subtotal, 0), [lines]);

  if (!open) return null;

  async function submit() {
    setError(null);
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setError("الرجاء إدخال الاسم الكامل.");
      return;
    }
    const normalized = normalizeCheckoutPhone(phone);
    if (!isValidCheckoutPhone(normalized)) {
      setError("رقم جوال سعودي صحيح يبدأ بـ 05 ويتكوّن من ١٠ أرقام.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        createdAt: new Date().toISOString(),
        store: site.nameEn,
        customer: { name: trimmedName, phone: normalized },
        totalUsd: total,
        lines: lines.map((l) => ({
          slug: l.line.slug,
          bundleIndex: l.line.bundleIndex,
          quantity: l.line.quantity,
          title: l.title,
          bundleLabel: l.bundleLabel,
          subtotalUsd: l.subtotal,
        })),
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error || "تعذر إرسال الطلب. حاول مرة أخرى.");
        setLoading(false);
        return;
      }

      sessionStorage.setItem(
        "souksham_last_order",
        JSON.stringify({
          ...payload,
          displayTotal: total,
        }),
      );
      onSuccess();
      onClose();
      router.push("/thank-you");
    } catch {
      setError("خطأ في الشبكة. تحقق من الاتصال وحاول مجددًا.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
          <h2 id="checkout-title" className="text-lg font-bold text-stone-900">
            إتمام الطلب
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm text-stone-500 hover:bg-stone-100"
          >
            إغلاق
          </button>
        </div>

        <div className="space-y-4 px-4 py-4">
          <p className="text-xs text-stone-600">
            ملخص واضح يقلل الأخطاء — ثم يتواصل فريقنا للتأكيد والدفع عند الاستلام داخل {site.countryNameAr}.
          </p>
          <ul className="rounded-lg border border-emerald-100 bg-emerald-50/80 px-3 py-2 text-[11px] leading-relaxed text-emerald-950">
            <li>لا خصم على الموقع — الدفع نقدًا عند الباب بعد التأكيد.</li>
            <li>لا اشتراك ولا رسائل تلقائية من واجهة المتجر.</li>
            <li>رقم صحيح = أقل ملاحقة وتأخير في التوصيل.</li>
          </ul>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
            <p className="text-xs font-semibold text-stone-700">ملخص الطلب</p>
            <ul className="mt-2 space-y-2 text-sm text-stone-800">
              {lines.map((l) => (
                <li key={`${l.line.slug}-${l.line.bundleIndex}`} className="flex justify-between gap-2">
                  <span className="text-end">
                    {l.title} × {l.line.quantity}
                    <span className="block text-[11px] text-stone-500">{l.bundleLabel}</span>
                  </span>
                  <span className="shrink-0 font-medium">{formatUsd(l.subtotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-stone-200 pt-2 text-base font-bold text-stone-900">
              <span>الإجمالي</span>
              <span>{formatUsd(total)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-900" htmlFor="co-name">
              الاسم الكامل
            </label>
            <input
              id="co-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-end text-stone-900 outline-none ring-[#1e3a2f] focus:ring-2"
              placeholder="مثال: أحمد الحسن"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-900" htmlFor="co-phone">
              رقم الجوال (سعودي)
            </label>
            <input
              id="co-phone"
              name="phone"
              inputMode="numeric"
              autoComplete="tel-national"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-end text-stone-900 outline-none ring-[#1e3a2f] focus:ring-2"
              placeholder="05XXXXXXXX"
            />
            <p className="mt-1 text-[11px] text-stone-500">{checkoutPhoneExampleAr}</p>
          </div>

          {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}

          <button
            type="button"
            disabled={loading || lines.length === 0}
            onClick={() => void submit()}
            className="w-full rounded-full bg-[#1e3a2f] py-3.5 text-sm font-bold text-white hover:bg-[#2d5a45] disabled:opacity-50"
          >
            {loading ? "جاري الإرسال…" : "تأكيد وإرسال الطلب"}
          </button>

          <p className="text-[11px] leading-relaxed text-stone-500">
            بالضغط على التأكيد، توافق على{" "}
            <a href="/policies/terms" className="underline">
              الشروط
            </a>{" "}
            و{" "}
            <a href="/policies/privacy" className="underline">
              الخصوصية
            </a>
            . لا يتم خصم أي مبلغ على الموقع.
          </p>
        </div>
      </div>
    </div>
  );
}
