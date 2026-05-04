"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { useCartStore } from "@/lib/cart-store";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/collection", label: "المجموعة" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
  { href: "/policies", label: "السياسات" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isOpen, openCart, closeCart, lines } = useCartStore();
  const itemCount = lines.reduce((s, l) => s + l.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#E5DDD2] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          {/* Left: Cart + Nav (RTL — this appears on the left visually) */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => (isOpen ? closeCart() : openCart())}
              className="relative rounded-full p-2 text-[#123C2F] hover:bg-[#EAF3EE]"
              aria-label="السلة"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#123C2F] text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 sm:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#6B625C] hover:bg-[#EAF3EE] hover:text-[#123C2F]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            {/* Mobile hamburger */}
            <button
              type="button"
              className="rounded-lg p-2 text-[#123C2F] hover:bg-[#EAF3EE] sm:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="القائمة"
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Right: Brand logo (RTL — appears on the right) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123C2F] text-white font-bold text-sm group-hover:bg-[#1D5644] transition-colors">
              س ش
            </div>
            <div className="text-end">
              <p className="text-base font-bold leading-tight text-[#171412]">{site.nameAr}</p>
              <p className="text-[10px] font-medium tracking-wider text-[#6B625C]">{site.nameEn}</p>
            </div>
          </Link>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-[#E5DDD2] bg-white px-4 py-3 sm:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#6B625C] hover:bg-[#EAF3EE] hover:text-[#123C2F]"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
