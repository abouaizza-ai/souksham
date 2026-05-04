"use client";

import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/products";

export function AddToCartQuick({
  product,
  bundleIndex,
  label = "أضف للسلة",
  className = "",
}: {
  product: Product;
  bundleIndex?: number;
  label?: string;
  className?: string;
}) {
  const { addLine } = useCart();
  const idx = bundleIndex ?? product.defaultBundleIndex;

  return (
    <button
      type="button"
      onClick={() => addLine(product.slug, idx, 1)}
      className={
        className ||
        "inline-flex items-center justify-center rounded-full bg-[#1e3a2f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2d5a45]"
      }
    >
      {label}
    </button>
  );
}
