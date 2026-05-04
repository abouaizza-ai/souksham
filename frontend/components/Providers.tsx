"use client";

import type { ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}
