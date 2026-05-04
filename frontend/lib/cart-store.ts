"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, ProductSlug } from "@/lib/products";
import { getProduct, getOfferById, lineKey } from "@/lib/products";

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  addLine: (slug: ProductSlug, offerId: string, qty?: number, addedFrom?: CartLine["addedFrom"]) => void;
  setQty: (slug: ProductSlug, offerId: string, qty: number) => void;
  removeLine: (slug: ProductSlug, offerId: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  countItems: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,

      addLine: (slug, offerId, qty = 1, addedFrom) => {
        const p = getProduct(slug);
        if (!p) return;
        const offer = getOfferById(slug, offerId);
        if (!offer) return;
        set((state) => {
          const key = lineKey({ productSlug: slug, offerId });
          const idx = state.lines.findIndex((l) => lineKey(l) === key);
          if (idx === -1) {
            return {
              lines: [
                ...state.lines,
                { productSlug: slug, offerId, quantity: Math.max(1, qty), addedFrom },
              ],
              isOpen: true,
            };
          }
          const next = [...state.lines];
          next[idx] = { ...next[idx], quantity: Math.max(1, next[idx].quantity + qty) };
          return { lines: next, isOpen: true };
        });
      },

      setQty: (slug, offerId, qty) => {
        const key = lineKey({ productSlug: slug, offerId });
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((l) => lineKey(l) !== key)
              : state.lines.map((l) =>
                  lineKey(l) === key ? { ...l, quantity: Math.min(99, qty) } : l,
                ),
        }));
      },

      removeLine: (slug, offerId) => {
        const key = lineKey({ productSlug: slug, offerId });
        set((state) => ({ lines: state.lines.filter((l) => lineKey(l) !== key) }));
      },

      clear: () => set({ lines: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      countItems: () => get().lines.reduce((s, l) => s + l.quantity, 0),
    }),
    {
      name: "souksham_cart_v2",
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);
