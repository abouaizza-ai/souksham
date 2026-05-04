import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrustBadgeRow } from "@/components/TrustBadgeRow";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import Link from "next/link";

export const metadata = {
  title: "من نحن",
  description: "قصة سوق الشام — لماذا أنشأنا هذا المتجر ولماذا نختار ما نبيعه.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-[#E5DDD2] bg-[#123C2F] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">من نحن</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              سوق الشام — لبنان
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              منتجات مختارة بعناية لنهارك بلبنان — واضحة، مجرّبة، وبطلب آمن مع الدفع عند الاستلام.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#171412] sm:text-3xl">ليش أنشأنا سوق الشام؟</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#6B625C]">
                  <p>
                    المشترون بلبنان تعبوا من صفحات غير واضحة، وعروض مبهمة، ومنتجات عشوائية ما بتشبه الإعلان. سوق الشام موجود لأن الاختيار الجيد والعرض الواضح ما لازم يكونوا نادرين.
                  </p>
                  <p>
                    بنختار المنتجات بمعايير محددة: الفائدة العملية لنهار لبناني، الوضوح في الوصف، المواد والاستخدام موثقين، والعرض منطقي بالنسبة للسعر.
                  </p>
                  <p>
                    الدفع عند الاستلام مش ميزة — هو أساس الثقة. بنأكد معك قبل التجهيز وبنبعث التوصيل بعد ما تكون متأكد.
                  </p>
                </div>
              </div>
              <div>
                <ImagePlaceholder
                  ratio="4:3"
                  label="صورة الفريق أو المتجر"
                  subLabel="تُضاف لاحقاً"
                  tone="sand"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-y border-[#E5DDD2] bg-[#F7F1E8] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-[#171412] sm:text-3xl">ما الذي يميّزنا</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "اختيار بمعايير",
                  body: "ما بنبيع أي منتج. كل قطعة تمر بمراجعة الفائدة، الوصف الدقيق، وقيمة العرض.",
                },
                {
                  title: "شفافية كاملة",
                  body: "بنوضح المواد، الاستخدام، والحالات المناسبة وغير المناسبة — قبل ما تطلب.",
                },
                {
                  title: "دفع عند الاستلام",
                  body: "بلا بطاقة على الموقع. بتدفع نقداً بالدولار عند الاستلام بعد التأكيد الهاتفي.",
                },
                {
                  title: "تأكيد بشري",
                  body: "كل طلب بيحتاج تأكيد من فريقنا قبل التجهيز — لتقليل الأخطاء وضمان رضاك.",
                },
                {
                  title: "ضمان الاستبدال",
                  body: "المنتج وصل تالف أو غير مطابق؟ عندك سياسة استبدال واضحة خلال ٧ أيام.",
                },
                {
                  title: "أسعار بالدولار",
                  body: "وضوح نسبي في التسعير كما هو معتاد في التجارة الإلكترونية اللبنانية.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[#E5DDD2] bg-white p-5">
                  <h3 className="font-bold text-[#123C2F]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B625C]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Authority note */}
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-sm leading-relaxed text-[#6B625C]">
              سوق الشام بيدّعي الوضوح، الدعم، والاختيار الأفضل — وليس السحر. السعر المرتفع مبرر بالعرض المنظّم والخدمة الواضحة، وليس بشهادات أو نتائج مزيّفة.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="border-t border-[#E5DDD2] bg-[#EAF3EE] py-10">
          <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
            <TrustBadgeRow />
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/collection"
                className="rounded-full bg-[#123C2F] px-7 py-3 text-sm font-semibold text-white hover:bg-[#1D5644]"
              >
                تصفّح المجموعة
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#E5DDD2] bg-white px-7 py-3 text-sm font-semibold text-[#171412] hover:bg-[#F7F1E8]"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
