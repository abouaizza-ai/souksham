import Link from "next/link";
import { AddToCartQuick } from "@/components/cart/AddToCartQuick";
import type { Product } from "@/lib/products";
import { formatUsd } from "@/lib/products";

export function CrossSellSection({
  title,
  items,
}: {
  title: string;
  items: Product[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-stone-200 bg-[#faf8f5] p-6">
      <h2 className="text-lg font-bold text-stone-900">{title}</h2>
      <p className="mt-1 text-xs text-stone-500">
        أكمل نظام المقصورة — منتجات مختلفة تحل مشاكل مختلفة.
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {items.map((p) => (
          <li
            key={p.slug}
            className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-semibold text-[#1e3a2f]">{p.routineNameAr}</p>
            <p className="mt-1 text-base font-bold text-stone-900">{p.marketingNameAr}</p>
            <p className="text-[10px] text-stone-500">{p.marketingNameEn}</p>
            <p className="mt-2 flex-1 text-xs text-stone-600">{p.shortProblemAr}</p>
            <p className="mt-2 text-sm font-semibold text-stone-900">من {formatUsd(p.priceFromUsd)}</p>
            <div className="mt-3 flex flex-col gap-2">
              <AddToCartQuick product={p} label="أضف للسلة" className="w-full rounded-full bg-stone-900 py-2 text-xs font-semibold text-white hover:bg-stone-800" />
              <Link
                href={`/products/${p.slug}`}
                className="text-center text-xs font-medium text-[#1e3a2f] hover:underline"
              >
                تفاصيل المنتج
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
