"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/products";
import { formatUsd } from "@/lib/products";

export function AddToCartPanel({ product }: { product: Product }) {
  const { addLine } = useCart();
  const [index, setIndex] = useState(
    Math.min(product.defaultBundleIndex, product.bundle.length - 1),
  );
  const selected = product.bundle[index];

  return (
    <div className="mx-auto max-w-lg space-y-3">
      <p className="text-center text-xs font-medium text-stone-500">
        اختر العرض ثم أضف للسلة — يمكنك إكمال تسوق مقترحات من السلة لاحقًا.
      </p>
      {product.bundle.map((b, i) => (
        <button
          key={b.labelAr}
          type="button"
          onClick={() => setIndex(i)}
          className={`flex w-full flex-col gap-1 rounded-xl border-2 p-4 text-end shadow-sm transition sm:flex-row sm:items-center sm:justify-between ${
            i === index
              ? "border-[#1e3a2f] bg-[#f0f7f3] ring-1 ring-[#1e3a2f]/20"
              : "border-stone-200 bg-white hover:border-stone-300"
          }`}
        >
          <div className="flex flex-1 flex-col items-end gap-1">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <span className="font-semibold text-stone-900">{b.labelAr}</span>
              {b.badge === "popular" ? (
                <span className="rounded-full bg-[#1e3a2f] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  الأكثر اختياراً
                </span>
              ) : null}
              {b.badge === "best_value" ? (
                <span className="rounded-full bg-amber-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  الأوفر
                </span>
              ) : null}
            </div>
            <span className="text-xs text-stone-500">
              {b.qty === 1 ? "قطعة واحدة" : `${b.qty} وحدات`}
            </span>
          </div>
          <div className="mt-2 flex shrink-0 flex-col items-end sm:mt-0 sm:ms-4">
            <span className="text-lg font-bold text-stone-900">{formatUsd(b.priceUsd)}</span>
            {b.saveUsd != null ? (
              <span className="text-xs font-medium text-emerald-700">وفّر {formatUsd(b.saveUsd)}</span>
            ) : null}
          </div>
        </button>
      ))}

      <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={() => addLine(product.slug, index, 1)}
          className="flex w-full items-center justify-center rounded-full bg-[#1e3a2f] py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#2d5a45] sm:py-4 sm:text-base"
        >
          أضف إلى السلة — {formatUsd(selected.priceUsd)}
        </button>
        <Link
          href="/cart"
          className="flex w-full items-center justify-center rounded-full border border-stone-300 bg-white py-3 text-sm font-semibold text-stone-800 hover:bg-stone-50"
        >
          عرض السلة
        </Link>
      </div>
    </div>
  );
}
