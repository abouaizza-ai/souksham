import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { products, formatUsd } from "@/lib/products";

export const metadata = {
  title: "المجموعة",
  description: "تصفّح مجموعة سوق الشام — منتجات مختارة لنهارك بلبنان مع الدفع عند الاستلام.",
};

export default function CollectionPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-[#E5DDD2] bg-[#F7F1E8] py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#123C2F]">
              المجموعة
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#171412] sm:text-4xl">
              منتجات سوق الشام
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[#6B625C]">
              كل منتج اختُير بعناية ليناسب الاستخدام اليومي بلبنان — مع وصف واضح وعروض مرتبة.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => {
                const defaultOffer = p.offers.find((o) => o.id === p.defaultOfferId) ?? p.offers[0];
                return (
                  <li key={p.slug}>
                    <article className="flex h-full flex-col rounded-2xl border border-[#E5DDD2] bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                      <Link href={`/products/${p.slug}`}>
                        <ImagePlaceholder
                          ratio="4:3"
                          label={p.marketingNameAr}
                          subLabel="صورة المنتج"
                          tone="sand"
                          className="!rounded-none"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#123C2F]">
                          {p.routineNameAr}
                        </p>
                        <Link href={`/products/${p.slug}`}>
                          <h2 className="mt-1 text-xl font-bold text-[#171412] hover:text-[#123C2F]">
                            {p.marketingNameAr}
                          </h2>
                        </Link>
                        <p className="text-xs text-[#6B625C]">{p.marketingNameEn}</p>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B625C]">
                          {p.shortProblemAr}
                        </p>
                        <div className="mt-3">
                          <p className="text-sm font-semibold text-[#171412]">
                            يبدأ من {formatUsd(p.priceFromUsd)}
                          </p>
                          <p className="text-xs text-[#6B625C]">
                            {p.reviewCount > 0
                              ? `★${p.rating} (${p.reviewCount} تقييم)`
                              : "تقييمات تُضاف بعد الإطلاق"}
                          </p>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                          {defaultOffer && (
                            <AddToCartButton
                              productSlug={p.slug}
                              offerId={defaultOffer.id}
                              label="ضيفه عالسلة"
                              addedFrom="collection"
                              className="w-full"
                            />
                          )}
                          <Link
                            href={`/products/${p.slug}`}
                            className="inline-flex items-center justify-center rounded-full border border-[#E5DDD2] bg-white px-4 py-2.5 text-sm font-semibold text-[#171412] hover:bg-[#F7F1E8]"
                          >
                            اختار العرض والتفاصيل
                          </Link>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
