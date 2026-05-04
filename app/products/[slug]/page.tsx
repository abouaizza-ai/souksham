import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustBadgeRow } from "@/components/TrustBadgeRow";
import { AddToCartPanel } from "@/components/product/AddToCartPanel";
import { CrossSellSection } from "@/components/product/CrossSellSection";
import { ProductProofSections } from "@/components/product/ProductProofSections";
import { formatUsd, getCrossSellProducts, getProduct, products, type CartLine } from "@/lib/products";
import { site } from "@/lib/site";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: site.title };
  return {
    title: `${p.marketingNameAr} ${p.marketingNameEn} | ${site.title}`,
    description: p.descriptionAr,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const others = products.filter((x) => x.slug !== p.slug);
  const crossFromLine: CartLine[] = [{ slug: p.slug, bundleIndex: p.defaultBundleIndex, quantity: 1 }];
  const crossItems = getCrossSellProducts(crossFromLine);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pb-6 md:pb-0">
        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-center text-xs font-medium text-[#1e3a2f]">
            {p.routineNameAr} · دفع عند الاستلام · {site.countryNameAr}
          </p>
          <h1 className="mt-4 text-center text-3xl font-bold leading-snug text-stone-900 sm:text-4xl">
            {p.marketingNameAr}
          </h1>
          <p className="mt-1 text-center text-sm font-medium tracking-wide text-stone-500">{p.marketingNameEn}</p>
          <p className="mt-3 text-center text-base font-medium text-stone-800">{p.titleAr}</p>

          <p className="mx-auto mt-5 max-w-xl text-center text-lg font-semibold leading-relaxed text-[#1e3a2f]">
            {p.benefitHeadlineAr}
          </p>
          <ul className="mx-auto mt-4 max-w-lg list-none space-y-2 text-end text-sm text-stone-700">
            {p.outcomeStackAr.map((line) => (
              <li key={line} className="flex items-start justify-end gap-2">
                <span>{line}</span>
                <span className="mt-0.5 text-emerald-600" aria-hidden>
                  ✓
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center text-sm text-stone-600">{p.shortProblemAr}</p>
          <p className="mt-2 text-center text-sm text-stone-500">
            {p.rating}★ ({p.reviewCount} تقييم · استبدل بنص «مؤكد شراء» عند التشغيل الفعلي)
          </p>
          <p className="mt-1 text-center text-lg font-semibold text-stone-900">يبدأ من {formatUsd(p.priceFromUsd)}</p>

          <div className="mx-auto mt-6 max-w-lg">
            <TrustBadgeRow />
          </div>

          <div className="mx-auto mt-8 max-w-lg">
            <AddToCartPanel product={p} />
          </div>

          <section className="mt-12 border-t border-stone-200 pt-10">
            <h2 className="text-xl font-bold text-stone-900">عن المنتج</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">{p.descriptionAr}</p>
            <p className="mt-4 text-sm text-stone-600">
              بعد الإضافة للسلة يمكنك مراجعة العروض والكميات ثم إتمام الطلب — سيُطلب منك تأكيد الاسم ورقم الجوال
              بصيغة سعودية تبدأ بـ 05 قبل الإرسال إلى النظام الخلفي.
            </p>
          </section>

          <ProductProofSections product={p} />

          <section className="mt-12">
            <h2 className="text-xl font-bold text-stone-900">التوصيل والدفع</h2>
            <ol className="mt-4 space-y-4 text-sm text-stone-600">
              {site.cod.steps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-200 text-sm font-bold text-stone-800">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-stone-900">{s.title}</p>
                    <p className="mt-1">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-stone-500">{site.cod.deliveryNoteAr}</p>
          </section>

          <CrossSellSection title="أكمل نظام المقصورة — منتجات تكمّل بعض" items={crossItems.length ? crossItems : others} />

          <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-4">
            <p className="text-center text-sm text-stone-600">
              تفضّل التفاصيل الكاملة لكل منتج؟{" "}
              <Link href="/collection" className="font-semibold text-[#1e3a2f] underline">
                صفحة المجموعة
              </Link>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
