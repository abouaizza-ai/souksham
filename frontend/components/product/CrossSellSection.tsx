import type { Product } from "@/lib/products";
import { formatUsd, getCrossSellProducts } from "@/lib/products";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function CrossSellSection({ product }: { product: Product }) {
  const crossSells = getCrossSellProducts([
    { productSlug: product.slug, offerId: product.defaultOfferId, quantity: 1 },
  ]);

  if (crossSells.length === 0) return null;

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-[#171412]">يكمّل طلبك</h2>
        <p className="mt-2 text-center text-sm text-[#6B625C]">
          منتجات من نفس نظام سوق الشام للسيارة
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crossSells.map((p) => {
            const defaultOffer = p.offers.find((o) => o.id === p.defaultOfferId) ?? p.offers[0];
            return (
              <article key={p.slug} className="flex flex-col rounded-2xl border border-[#E5DDD2] bg-[#F7F1E8] overflow-hidden">
                <ImagePlaceholder ratio="4:3" label={p.marketingNameAr} subLabel="" tone="sand" className="!rounded-none" />
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#123C2F]">{p.routineNameAr}</p>
                  <Link href={`/products/${p.slug}`}>
                    <h3 className="mt-1 font-bold text-[#171412] hover:text-[#123C2F]">{p.marketingNameAr}</h3>
                  </Link>
                  <p className="mt-1 flex-1 text-xs text-[#6B625C]">{p.shortProblemAr}</p>
                  {defaultOffer && (
                    <p className="mt-2 text-sm font-bold text-[#123C2F]">{formatUsd(defaultOffer.priceUsd)}</p>
                  )}
                  <div className="mt-3 flex gap-2">
                    {defaultOffer && (
                      <AddToCartButton
                        productSlug={p.slug}
                        offerId={defaultOffer.id}
                        label="ضيفه"
                        addedFrom="pdp"
                        className="flex-1"
                      />
                    )}
                    <Link
                      href={`/products/${p.slug}`}
                      className="rounded-full border border-[#E5DDD2] bg-white px-3 py-2 text-xs font-semibold text-[#171412] hover:bg-white/80"
                    >
                      التفاصيل
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
