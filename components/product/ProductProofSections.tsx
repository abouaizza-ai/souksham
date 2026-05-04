import type { Product } from "@/lib/products";

export function ProductProofSections({ product: p }: { product: Product }) {
  return (
    <>
      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-stone-900">مكوّنات المقصورة (شفافية المواد)</h2>
        <p className="mt-1 text-xs text-stone-500">
          مثل ما تفصّل العلامات الرائدة «المكوّنات» — نفصّل دور كل طبقة في تجربتك داخل السيارة.
        </p>
        <ul className="mt-4 divide-y divide-stone-100">
          {p.bom.map((row) => (
            <li key={row.componentAr} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <span className="font-medium text-stone-900">{row.componentAr}</span>
              <span className="text-sm text-stone-600 sm:max-w-[55%] sm:text-end">{row.jobAr}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-stone-900">SoukSham مقابل «نفس الشكل الرخيص»</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full min-w-[320px] text-sm">
            <thead className="bg-stone-100 text-stone-800">
              <tr>
                <th className="px-3 py-2 text-end font-semibold">المحور</th>
                <th className="px-3 py-2 text-end font-semibold text-[#1e3a2f]">SoukSham</th>
                <th className="px-3 py-2 text-end font-semibold">السوق العام</th>
              </tr>
            </thead>
            <tbody>
              {p.vsTable.map((row) => (
                <tr key={row.axisAr} className="border-t border-stone-100">
                  <td className="px-3 py-3 align-top font-medium text-stone-900">{row.axisAr}</td>
                  <td className="px-3 py-3 align-top text-stone-700">{row.soukshamAr}</td>
                  <td className="px-3 py-3 align-top text-stone-500">{row.marketAr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
          <h3 className="font-bold text-emerald-900">مناسب لك إذا…</h3>
          <ul className="mt-3 list-disc space-y-2 pe-4 text-sm text-emerald-950/90">
            {p.goodIfAr.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
          <h3 className="font-bold text-amber-900">توقّف قبل الطلب إذا…</h3>
          <p className="mt-1 text-xs text-amber-900/80">
            نفضّل أن لا تشتري على أمل خاطئ — هذا يرفع تأكيد التسليم ورضاك.
          </p>
          <ul className="mt-3 list-disc space-y-2 pe-4 text-sm text-amber-950/90">
            {p.notIfAr.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-stone-900">أسئلة تزيل التردد</h2>
        <div className="mt-3 space-y-2">
          {p.pdpFaq.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-stone-200 bg-white px-4 py-3 open:bg-stone-50"
            >
              <summary className="cursor-pointer list-none text-end font-medium text-stone-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="inline-flex w-full items-center justify-between gap-2">
                  {item.q}
                  <span className="text-stone-400 transition group-open:rotate-180">⌄</span>
                </span>
              </summary>
              <p className="mt-2 border-t border-stone-100 pt-2 text-sm leading-relaxed text-stone-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
