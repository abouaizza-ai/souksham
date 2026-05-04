"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { site } from "@/lib/site";

export function SiteHeader() {
  const { countItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#faf8f5]/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link href="/" className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-base font-semibold tracking-tight text-stone-900 sm:text-lg">
            {site.nameAr}
          </span>
          <span className="text-[10px] font-medium text-stone-500 sm:text-xs">{site.nameEn}</span>
        </Link>
        <nav className="flex items-center gap-1.5 text-xs font-medium text-stone-700 sm:gap-3 sm:text-sm">
          <Link href="/" className="rounded-md px-2 py-1 hover:bg-stone-200/60 hover:text-stone-900">
            الرئيسية
          </Link>
          <Link href="/collection" className="rounded-md px-2 py-1 hover:bg-stone-200/60 hover:text-stone-900">
            المجموعة
          </Link>
          <Link
            href="/contact"
            className="hidden rounded-md px-2 py-1 hover:bg-stone-200/60 hover:text-stone-900 md:inline"
          >
            اتصل بنا
          </Link>
          <Link
            href="/policies"
            className="hidden rounded-md px-2 py-1 hover:bg-stone-200/60 hover:text-stone-900 lg:inline"
          >
            السياسات
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full bg-[#1e3a2f] px-3 py-1.5 text-white hover:bg-[#2d5a45] sm:px-4 sm:py-2"
          >
            السلة
            {countItems > 0 ? (
              <span className="absolute -start-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-stone-900">
                {countItems > 99 ? "99+" : countItems}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}
