"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, ProductSlug } from "@/lib/products";
import { getProduct, lineKey } from "@/lib/products";

const STORAGE_KEY = "souksham_cart_v1";

type CartContextValue = {
  lines: CartLine[];
  addLine: (slug: ProductSlug, bundleIndex: number, quantity?: number) => void;
  setQty: (slug: ProductSlug, bundleIndex: number, quantity: number) => void;
  removeLine: (slug: ProductSlug, bundleIndex: number) => void;
  clear: () => void;
  countItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) =>
        l &&
        typeof l.slug === "string" &&
        typeof l.bundleIndex === "number" &&
        typeof l.quantity === "number" &&
        l.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(loadLines());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const addLine = useCallback((slug: ProductSlug, bundleIndex: number, quantity = 1) => {
    const p = getProduct(slug);
    if (!p || bundleIndex < 0 || bundleIndex >= p.bundle.length) return;
    setLines((prev) => {
      const key = lineKey({ slug, bundleIndex });
      const idx = prev.findIndex((l) => lineKey(l) === key);
      if (idx === -1) {
        return [...prev, { slug, bundleIndex, quantity: Math.max(1, quantity) }];
      }
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        quantity: Math.max(1, next[idx].quantity + quantity),
      };
      return next;
    });
  }, []);

  const setQty = useCallback((slug: ProductSlug, bundleIndex: number, quantity: number) => {
    setLines((prev) => {
      const key = lineKey({ slug, bundleIndex });
      if (quantity <= 0) {
        return prev.filter((l) => lineKey(l) !== key);
      }
      return prev.map((l) =>
        lineKey(l) === key ? { ...l, quantity: Math.min(99, quantity) } : l,
      );
    });
  }, []);

  const removeLine = useCallback((slug: ProductSlug, bundleIndex: number) => {
    const key = lineKey({ slug, bundleIndex });
    setLines((prev) => prev.filter((l) => lineKey(l) !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const countItems = useMemo(
    () => lines.reduce((s, l) => s + l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({ lines, addLine, setQty, removeLine, clear, countItems }),
    [lines, addLine, setQty, removeLine, clear, countItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
