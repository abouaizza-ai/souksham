import type { Product } from "@/lib/products";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function ProductProofSections({ product }: { product: Product }) {
  return (
    <>
      {/* Problem sections */}
      {product.problemSectionsAr.map((section, i) => (
        <section key={i} className={`py-14 sm:py-16 ${i % 2 === 0 ? "bg-white" : "bg-[#F7F1E8]"}`}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#171412] sm:text-3xl">{section.headlineAr}</h2>
                <p className="mt-4 text-base leading-relaxed text-[#6B625C]">{section.bodyAr}</p>
              </div>
              <div className="lg:w-80">
                <ImagePlaceholder
                  ratio="4:3"
                  label={`صورة توضيحية ${i + 1}`}
                  subLabel="تُضاف صورة UGC لاحقاً"
                  tone={i % 2 === 0 ? "sand" : "green"}
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Benefits grid */}
      <section className="bg-[#EAF3EE] py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-[#171412] sm:text-3xl">
            شو بيعطيك {product.marketingNameAr}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {product.benefitGridAr.map((b) => (
              <div key={b.titleAr} className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="font-bold text-[#171412]">{b.titleAr}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B625C]">{b.bodyAr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual proof slots */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-[#171412]">إثبات بالصور</h2>
          <p className="mt-2 text-center text-sm text-[#6B625C]">
            صور المنتج الفعلية وتجارب العملاء تُضاف هنا بعد الإطلاق.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <ImagePlaceholder
                key={i}
                ratio="1:1"
                label={`لقطة ${i}`}
                subLabel="UGC/استوديو"
                tone="sand"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bill of materials */}
      <section className="border-y border-[#E5DDD2] bg-[#F7F1E8] py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-[#171412]">مكوّنات {product.marketingNameAr}</h2>
          <p className="mt-2 text-center text-sm text-[#6B625C]">شفافية كاملة — نوضح لك شو في المنتج وليش.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {product.bom.map((b) => (
              <div key={b.componentAr} className="rounded-xl border border-[#E5DDD2] bg-white p-5">
                <p className="font-semibold text-[#171412]">{b.componentAr}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#6B625C]">{b.jobAr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof placeholder */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-[#171412]">تقييمات العملاء</h2>
          <p className="mt-2 text-center text-sm text-[#6B625C]">
            تقييمات حقيقية تُعرض بعد أول دفعة طلبات.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-[#E5DDD2] bg-[#F7F1E8] p-5">
                <div className="h-3 w-20 rounded bg-[#E5DDD2]" />
                <div className="mt-3 space-y-2">
                  <div className="h-2.5 w-full rounded bg-[#E5DDD2]" />
                  <div className="h-2.5 w-5/6 rounded bg-[#E5DDD2]" />
                </div>
                <p className="mt-3 text-xs text-[#6B625C]">[مكان تقييم العميل]</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authority / quality proof */}
      <section className="bg-[#F7F1E8] py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-[#171412]">معايير الاختيار في سوق الشام</h2>
          <p className="mt-2 text-center text-sm text-[#6B625C]">
            كل ادعاء لازم يكون معه صورة، تجربة، أو مواصفة بتدعمه.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { t: "مختار وفق معايير سوق الشام", b: "الفائدة، الوضوح، قابلية الاستخدام، وقيمة العرض." },
              { t: "صور وشهادات المورد", b: "صور وشهادات المورد تُضاف هنا بعد التحقق." },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-[#E5DDD2] bg-white p-5">
                <h3 className="font-bold text-[#171412]">{item.t}</h3>
                <p className="mt-2 text-sm text-[#6B625C]">{item.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-[#171412]">
            {product.marketingNameAr} مقابل منتج عشوائي
          </h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#E5DDD2]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#123C2F] text-white">
                  <th className="py-3 px-4 text-start font-semibold">المعيار</th>
                  <th className="py-3 px-4 text-start font-semibold">سوق الشام</th>
                  <th className="py-3 px-4 text-start font-semibold">منتج عشوائي</th>
                </tr>
              </thead>
              <tbody>
                {product.vsTable.map((row, i) => (
                  <tr key={row.axisAr} className={i % 2 === 0 ? "bg-white" : "bg-[#F7F1E8]"}>
                    <td className="py-3 px-4 font-medium text-[#171412]">{row.axisAr}</td>
                    <td className="py-3 px-4 text-[#18794E]">{row.soukshamAr}</td>
                    <td className="py-3 px-4 text-[#6B625C]">{row.marketAr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Good if / Not if */}
      <section className="border-t border-[#E5DDD2] bg-[#F7F1E8] py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-[#18794E]">مناسب إذا…</h3>
              <ul className="mt-4 space-y-2">
                {product.goodIfAr.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#6B625C]">
                    <span className="mt-1 h-4 w-4 shrink-0 text-[#18794E]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#B42318]">ليس مناسباً إذا…</h3>
              <ul className="mt-4 space-y-2">
                {product.notIfAr.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#6B625C]">
                    <span className="mt-1 h-4 w-4 shrink-0 text-[#B42318]">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
