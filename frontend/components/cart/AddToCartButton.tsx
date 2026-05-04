"use client";

import { useCartStore } from "@/lib/cart-store";
import type { ProductSlug } from "@/lib/products";

type Props = {
  productSlug: ProductSlug;
  offerId: string;
  label?: string;
  addedFrom?: "home" | "collection" | "pdp" | "cart_cross_sell";
  className?: string;
};

export function AddToCartButton({
  productSlug,
  offerId,
  label = "ضيفه عالسلة",
  addedFrom = "collection",
  className = "",
}: Props) {
  const { addLine } = useCartStore();

  return (
    <button
      type="button"
      onClick={() => addLine(productSlug, offerId, 1, addedFrom)}
      className={`inline-flex items-center justify-center rounded-full bg-[#123C2F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1D5644] transition-colors ${className}`}
    >
      {label}
    </button>
  );
}
