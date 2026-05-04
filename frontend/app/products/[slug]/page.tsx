import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductHero, StickyCta } from "@/components/product/ProductHero";
import { ProductProofSections } from "@/components/product/ProductProofSections";
import { CrossSellSection } from "@/components/product/CrossSellSection";
import { TrustBadgeRow } from "@/components/TrustBadgeRow";
import { products, getProduct, formatUsd } from "@/lib/products";
import Link from "next/link";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.marketingNameAr,
    description: product.descriptionAr,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const defaultOffer = product.offers.find((o) => o.id === product.defaultOfferId) ?? product.offers[0];

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pb-20 sm:pb-0">
        {/* Breadcrumb */}
        <div className="border-b border-[#E5DDD2] bg-[#F7F1E8] px-4 py-2 sm:px-6">
          <div className="mx-auto max-w-5xl text-xs text-[#6B625C]">
            <Link href="/" className="hover:text-[#123C2F]">الرئيسية</Link>
            {" / "}
            <Link href="/collection" className="hover:text-[#123C2F]">المجموعة</Link>
            {" / "}
            <span className="text-[#171412]">{product.marketingNameAr}</span>
          </div>
        </div>

        <ProductHero product={product} />

        {/* Trust strip */}
        <div className="border-y border-[#E5DDD2] bg-[#F7F1E8] py-6">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <TrustBadgeRow />
          </div>
        </div>

        <ProductProofSections product={product} />

        {/* Offer repeated */}
        <section className="border-t border-[#E5DDD2] bg-[#EAF3EE] py-14 sm:py-16">
          <div className="mx-auto max-w-lg px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-bold text-[#171412]">اطلب {product.marketingNameAr}</h2>
            <p className="mt-2 text-[#6B625C]">{product.descriptionAr}</p>
            {defaultOffer && (
              <div className="mt-6">
                <p className="text-3xl font-bold text-[#123C2F]">{formatUsd(defaultOffer.priceUsd)}</p>
                <p className="text-sm text-[#6B625C]">{defaultOffer.labelAr}</p>
              </div>
            )}
            <TrustBadgeRow compact className="mt-5 justify-center" />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-[#171412]">أسئلة شائعة</h2>
            <dl className="mt-8 space-y-4">
              {product.pdpFaq.map((item) => (
                <div key={item.q} className="rounded-xl border border-[#E5DDD2] bg-white p-5">
                  <dt className="font-semibold text-[#171412]">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#6B625C]">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <CrossSellSection product={product} />

        {/* Final CTA */}
        <section className="border-t border-[#E5DDD2] bg-[#123C2F] py-14 text-white sm:py-16">
          <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold">جاهز تطلب؟</h2>
            <p className="mt-2 text-white/70">الدفع عند الاستلام · تأكيد قبل التجهيز · توصيل لكل لبنان</p>
            <a
              href="#top"
              className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-[#123C2F] hover:bg-[#F7F1E8]"
            >
              اختار العرض وضيفه عالسلة ↑
            </a>
          </div>
        </section>
      </main>

      <StickyCta product={product} />
      <SiteFooter />
    </>
  );
}
