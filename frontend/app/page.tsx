import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrustBadgeRow } from "@/components/TrustBadgeRow";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { products, formatUsd } from "@/lib/products";
import { site } from "@/lib/site";

const faq = [
  {
    q: "هل الدفع عند الاستلام متاح بكل لبنان؟",
    a: "نعم، بنعتمد الدفع عند الاستلام بالدولار عند باب منزلك في المناطق اللي بيغطيها شركاؤنا في التوصيل. مدة التوصيل بتختلف حسب المنطقة.",
  },
  {
    q: "هل بدفع أي شي قبل ما يوصل الطلب؟",
    a: "لا. بترسل الطلب من السلة مع اسمك ورقم موبايلك، منتصل لتأكيد العنوان، وبتدفع نقداً بالدولار عند الاستلام — بدون بطاقة على الموقع.",
  },
  {
    q: "ليش الأسعار بالدولار؟",
    a: "لأن التجارة الإلكترونية بلبنان غالباً بتسعّر بالدولار للوضوح والاستقرار النسبي للسعر.",
  },
  {
    q: "شو لو رفضت الطلب عند الباب؟",
    a: "بنفضّل التأكيد معك قبل الشحن لتفادي هيدا الوضع. إذا ترفضت الطلب بعد الشحن قد بتطبق سياسة الشحن — راجع صفحة الشحن.",
  },
  {
    q: "هل في استبدال؟",
    a: "إذا وصلك المنتج تالف أو غير مطابق للوصف، عندك سياسة استبدال واضحة خلال ٧ أيام — راجع صفحة الاسترجاع.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-[#E5DDD2] bg-gradient-to-b from-[#F7F1E8] to-[#FFFCF6]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#123C2F]">
              سوق الشام · لبنان · دفع عند الاستلام · أسعار بالدولار
            </p>
            <h1 className="mt-4 text-center text-3xl font-bold leading-snug text-[#171412] sm:text-4xl lg:text-5xl">
              منتجات مختارة بعناية
              <br />
              <span className="text-[#123C2F]">لنهارك بلبنان</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-[#6B625C] sm:text-lg">
              {site.cro.croNoteAr === site.cro.croNoteAr
                ? "واضحة، مرتبة، وبطلب آمن مع الدفع عند الاستلام. بدون مبالغة، بدون وعود فاضية — فقط منتجات بتشتغل بطريق لبنان."
                : site.description}
            </p>
            <div className="mx-auto mt-8 max-w-3xl">
              <TrustBadgeRow />
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/collection"
                className="rounded-full bg-[#123C2F] px-7 py-3 text-sm font-semibold text-white hover:bg-[#1D5644]"
              >
                تصفّح المجموعة
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-[#E5DDD2] bg-white px-7 py-3 text-sm font-semibold text-[#171412] hover:bg-[#F7F1E8]"
              >
                من نحن
              </Link>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-[#171412] sm:text-3xl">
              منتجات سوق الشام
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[#6B625C]">
              كل وحدة لها اسم وروتين واضح — مختارة خصيصاً لطريق لبنان.
            </p>
            <ul className="mt-12 grid gap-8 sm:grid-cols-3">
              {products.map((p) => {
                const defaultOffer = p.offers.find((o) => o.id === p.defaultOfferId) ?? p.offers[0];
                return (
                  <li key={p.slug}>
                    <article className="flex h-full flex-col rounded-2xl border border-[#E5DDD2] bg-white shadow-sm transition hover:shadow-md overflow-hidden">
                      <ImagePlaceholder
                        ratio="4:3"
                        label={p.marketingNameAr}
                        subLabel="صورة المنتج تُضاف لاحقاً"
                        tone="sand"
                        className="!rounded-none"
                      />
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#123C2F]">{p.routineNameAr}</p>
                        <h3 className="mt-1.5 text-xl font-bold text-[#171412]">{p.marketingNameAr}</h3>
                        <p className="text-xs font-medium text-[#6B625C]">{p.marketingNameEn}</p>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B625C]">{p.shortProblemAr}</p>
                        <p className="mt-3 text-sm font-semibold text-[#171412]">
                          يبدأ من {formatUsd(p.priceFromUsd)}
                        </p>
                        {defaultOffer && (
                          <p className="text-xs text-[#6B625C]">
                            {p.reviewCount > 0
                              ? `★${p.rating} (${p.reviewCount} تقييم)`
                              : "تقييمات تُضاف بعد الإطلاق"}
                          </p>
                        )}
                        <div className="mt-4 flex flex-col gap-2">
                          {defaultOffer && (
                            <AddToCartButton
                              productSlug={p.slug}
                              offerId={defaultOffer.id}
                              label="ضيفه عالسلة"
                              addedFrom="home"
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

        {/* Why SoukSham */}
        <section className="border-y border-[#E5DDD2] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-[#171412] sm:text-3xl">ليش سوق الشام؟</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[#6B625C]">
              وضوح في السلة، تأكيد بشري، ودفع عند الاستلام — لمنتجات مختارة لطريق لبنان.
            </p>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {site.pillars.map((pillar) => (
                <li key={pillar.title} className="rounded-2xl border border-[#E5DDD2] bg-[#F7F1E8] p-6">
                  <h3 className="text-lg font-semibold text-[#171412]">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B625C]">{pillar.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Social proof placeholder */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-[#171412] sm:text-3xl">تجارب من لبنان</h2>
            <p className="mt-2 text-center text-sm text-[#6B625C]">
              تقييمات العملاء تظهر هنا بعد أول دفعة طلبات.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-[#E5DDD2] bg-[#F7F1E8] p-5">
                  <div className="h-4 w-24 rounded bg-[#E5DDD2]" />
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-full rounded bg-[#E5DDD2]" />
                    <div className="h-3 w-5/6 rounded bg-[#E5DDD2]" />
                    <div className="h-3 w-4/6 rounded bg-[#E5DDD2]" />
                  </div>
                  <p className="mt-4 text-xs text-[#6B625C]">[مكان تقييم العميل بعد الإطلاق]</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COD flow */}
        <section className="border-t border-[#E5DDD2] bg-[#123C2F] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">من الطلب لباب بيتك</h2>
            <p className="mt-2 text-center text-sm text-white/70">{site.cod.headline}</p>
            <ol className="mt-12 grid gap-6 sm:grid-cols-3">
              {site.cod.steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl bg-white/10 p-6">
                  <span className="text-4xl font-bold text-white/30">{i + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-center text-sm text-white/60">{site.cod.deliveryNoteAr}</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold text-[#171412]">ابدأ الآن</h2>
            <p className="mt-3 text-[#6B625C]">
              أضف للسلة من الرئيسية أو المجموعة، راجع السلة، وأكمل الطلب — الدفع عند الاستلام بالدولار بعد التأكيد.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/collection"
                className="rounded-full bg-[#123C2F] px-8 py-3 text-sm font-semibold text-white hover:bg-[#1D5644]"
              >
                المجموعة
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-[#E5DDD2] bg-[#F7F1E8] py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-[#171412]">أسئلة قبل الطلب</h2>
            <dl className="mt-10 space-y-4">
              {faq.map((item) => (
                <div key={item.q} className="rounded-xl border border-[#E5DDD2] bg-white p-5">
                  <dt className="font-semibold text-[#171412]">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#6B625C]">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
