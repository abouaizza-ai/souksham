import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { AddToCartQuick } from "@/components/cart/AddToCartQuick";
import { TrustBadgeRow } from "@/components/TrustBadgeRow";
import { formatUsd, products } from "@/lib/products";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `مجموعة المقصورة | ${site.title}`,
  description: "ثلاث وحدات — أضف للسلة من المجموعة أو افتح صفحة المنتج لاختيار العرض.",
};

export default function CollectionPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-stone-200 bg-gradient-to-b from-[#f5f2eb] to-[#faf8f5]">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <p className="text-center text-sm font-medium text-[#1e3a2f]">{site.nameAr} · دفع عند الاستلام</p>
            <h1 className="mt-3 text-center text-3xl font-bold text-stone-900 sm:text-4xl">مجموعة المقصورة</h1>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-stone-600">
              اختر المنتج — زر «أضف للسلة» يستخدم العرض الافتراضي (الأكثر شيوعًا). لتغيير الكمية أو العرض، افتح
              صفحة المنتج.
            </p>
            <div className="mx-auto mt-8 max-w-3xl">
              <TrustBadgeRow />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <ul className="grid gap-8 sm:grid-cols-3">
            {products.map((p) => (
              <li key={p.slug}>
                <article className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#1e3a2f]">{p.routineNameAr}</p>
                  <h2 className="mt-2 text-xl font-bold text-stone-900">{p.marketingNameAr}</h2>
                  <p className="text-[10px] font-medium tracking-wide text-stone-500">{p.marketingNameEn}</p>
                  <p className="mt-2 text-sm text-stone-700">{p.titleAr}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{p.shortProblemAr}</p>
                  <p className="mt-4 text-lg font-semibold text-stone-900">من {formatUsd(p.priceFromUsd)}</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <AddToCartQuick product={p} label="أضف إلى السلة" />
                    <Link
                      href={`/products/${p.slug}`}
                      className="text-center text-sm font-medium text-[#1e3a2f] hover:underline"
                    >
                      صفحة المنتج والعروض
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link
              href="/cart"
              className="rounded-full bg-[#1e3a2f] px-8 py-3 text-sm font-semibold text-white hover:bg-[#2d5a45]"
            >
              مراجعة السلة
            </Link>
            <Link
              href="/"
              className="rounded-full border border-stone-300 bg-white px-8 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-50"
            >
              الرئيسية
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
