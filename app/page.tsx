import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { AddToCartQuick } from "@/components/cart/AddToCartQuick";
import { TrustBadgeRow } from "@/components/TrustBadgeRow";
import { formatUsd, products } from "@/lib/products";
import { site } from "@/lib/site";

const testimonials = [
  {
    quote:
      "طلبت منظم الفجوة. اتصلوا لتأكيد العنوان خلال ساعات — نفس أسلوب المتاجر اللي بتحترم وقتك.",
    name: "ر. خ.",
    place: "بيروت · مشترٍ مؤكد",
  },
  {
    quote:
      "السعر بالدولار واضح. ما في مفاجآت. الدفع عند الباب ريّحني لأنو ما عندي ثقة كتير بالدفع أونلاين.",
    name: "م. ف.",
    place: "جبل لبنان · مشترية مؤكدة",
  },
  {
    quote:
      "المظلة خفّفت حرارة المقود فعلاً. التوصيل أخذ ٣ أيام لعندي.",
    name: "ع. س.",
    place: "الشمال · مشترٍ مؤكد",
  },
];

const faq = [
  {
    q: "هل الدفع عند الاستلام متاح في كل لبنان؟",
    a: "نعم، نعتمد الدفع عند الاستلام بالدولار عند باب منزلك في المناطق التي يغطيها شركاؤنا في التوصيل. قد تختلف مدة التوصيل حسب المنطقة.",
  },
  {
    q: "هل أدفع أي شيء قبل ما يوصل الطلب؟",
    a: "لا. تُرسل الطلب من السلة مع اسمك ورقم جوالك، نتصل لتأكيد العنوان، وتدفع نقدًا بالدولار عند الاستلام — بدون بطاقة على الموقع.",
  },
  {
    q: "لماذا يُطلب رقم سعودي 05 في النموذج؟",
    a: "لتوحيد صيغة الإدخال وتقليل الأخطاء قبل إرسال الطلب لجدولك/الـWebhook. إن كان سوقك لبنان بالكامل، يمكن لاحقًا تبديل التحقق إلى صيغة لبنانية دون تغيير بقية التجربة.",
  },
  {
    q: "لماذا الأسعار بالدولار؟",
    a: "لأن التجارة الإلكترونية في لبنان غالبًا تُسعّر بالدولار للوضوح والاستقرار النسبي للسعر.",
  },
  {
    q: "ماذا لو رفضت الطلب عند الباب؟",
    a: "يُفضّل التأكيد معنا قبل الشحن لتفادي ذلك. إن رُفض الطلب بعد الشحن قد تُطبّق سياسة الشحن حسب الناقل — راجع صفحة الشحن.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-stone-200 bg-gradient-to-b from-[#f5f2eb] to-[#faf8f5]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="text-center text-sm font-medium text-[#1e3a2f]">
              سوق الشام — لبنان · دفع عند الاستلام · أسعار بالدولار (USD)
            </p>
            <h1 className="mt-4 text-center text-3xl font-bold leading-snug text-stone-900 sm:text-4xl">
              ثلاث وحدات تبني ثقة المقصورة
              <br />
              <span className="text-[#1e3a2f]">بَيْنَة · بَرْق الظِلّ · وَثِيق</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-stone-600">
              تموضع مبني على طريق لبنان: زحمة، مطبات، مواقف مكشوفة، وتنقلات يومية. ترتيب الفجوة، درع حراري
              للزجاج، ثبات وشحن بمواصفات واضحة — تسوّق على الموقع، أضف للسلة، وأكمل الطلب من السلة. لا اشتراك ولا
              رسائل واتساب أو SMS من واجهة المتجر.
            </p>
            <div className="mx-auto mt-8 max-w-3xl">
              <TrustBadgeRow />
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/collection"
                className="rounded-full bg-[#1e3a2f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2d5a45]"
              >
                تصفّح المجموعة
              </Link>
              <Link
                href="/cart"
                className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-50"
              >
                السلة
              </Link>
            </div>
          </div>
        </section>

        <section id="products" className="scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-stone-900 sm:text-3xl">
              نظام SoukSham — ثلاث مشاكل، ثلاثة أدلّة
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-stone-600">
              كل وحدة لها اسم وروتين واضح — تكمل بعض كـ «مختبر المقصورة» مو كإكسسوارات عشوائية.
            </p>
            <ul className="mt-12 grid gap-8 sm:grid-cols-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <article className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#1e3a2f]">{p.routineNameAr}</p>
                    <h3 className="mt-2 text-2xl font-bold text-stone-900">{p.marketingNameAr}</h3>
                    <p className="text-xs font-medium tracking-wide text-stone-500">{p.marketingNameEn}</p>
                    <p className="mt-2 text-sm font-medium text-stone-700">{p.titleAr}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{p.shortProblemAr}</p>
                    <p className="mt-4 text-sm text-stone-500">({p.reviewCount} تقييم)</p>
                    <p className="mt-1 text-lg font-semibold text-stone-900">يبدأ من {formatUsd(p.priceFromUsd)}</p>
                    <div className="mt-4 flex flex-col gap-2">
                      <AddToCartQuick product={p} label="أضف إلى السلة" />
                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
                      >
                        اختيار العرض والتفاصيل
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-stone-900 sm:text-3xl">ليش سوق الشام؟</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-stone-600">
              وضوح في السلة، تأكيد بشري، ودفع عند الاستلام — لكن لمنتجات السيارة.
            </p>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {site.pillars.map((pillar) => (
                <li key={pillar.title} className="rounded-2xl border border-stone-100 bg-[#faf8f5] p-6">
                  <h3 className="text-lg font-semibold text-stone-900">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{pillar.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-stone-900 sm:text-3xl">تجارب من لبنان</h2>
            <p className="mt-3 text-center text-sm text-stone-500">
              آراء عملاء (أمثلة للتصميم — استبدلها بتقييمات حقيقية عند الإطلاق).
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {testimonials.map((t) => (
                <li key={t.name} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                  <p className="text-sm leading-relaxed text-stone-700">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 text-sm font-semibold text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.place}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="how" className="scroll-mt-16 border-t border-stone-200 bg-[#1e3a2f] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">من الطلب لباب بيتك</h2>
            <p className="mt-3 text-center text-sm text-white/80">{site.cod.headline}</p>
            <ol className="mt-12 grid gap-8 sm:grid-cols-3">
              {site.cod.steps.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl bg-white/10 p-6 backdrop-blur">
                  <span className="text-3xl font-bold text-white/40">{i + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-center text-sm text-white/75">{site.cod.deliveryNoteAr}</p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold text-stone-900">ابدأ الآن</h2>
            <p className="mt-3 text-stone-600">
              أضف للسلة من الرئيسية أو المجموعة، راجع السلة، ثم أكمل الطلب — الدفع عند الاستلام بالدولار بعد التأكيد.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/collection"
                className="inline-flex rounded-full bg-[#1e3a2f] px-8 py-3 text-sm font-semibold text-white hover:bg-[#2d5a45]"
              >
                المجموعة
              </Link>
              <Link
                href="/cart"
                className="inline-flex rounded-full border border-stone-300 bg-white px-8 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-50"
              >
                السلة
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 bg-stone-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-stone-900">أسئلة قبل الطلب</h2>
            <dl className="mt-10 space-y-6">
              {faq.map((item) => (
                <div key={item.q} className="rounded-xl border border-stone-200 bg-white p-5">
                  <dt className="font-semibold text-stone-900">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-stone-600">{item.a}</dd>
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
