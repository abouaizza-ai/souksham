import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `السياسات | ${site.title}`,
};

const links = [
  { href: "/policies/privacy", title: "سياسة الخصوصية", desc: "ما نجمعه عند الطلب وكيف نستخدمه." },
  { href: "/policies/terms", title: "الشروط والأحكام", desc: "استخدام الموقع، الطلب، والأسعار." },
  { href: "/policies/shipping", title: "الشحن والتوصيل", desc: "المناطق، المدد، والدفع عند الاستلام." },
  { href: "/policies/returns", title: "الاسترجاع والضمان", desc: "عيوب التصنيع والاستبدال خلال ٧ أيام." },
];

export default function PoliciesIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold text-stone-900">السياسات</h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          صفحات قانونية وتشغيلية قابلة للتحديث — لا اشتراك على الموقع، ولا إرسال واتساب أو SMS تلقائي من واجهة
          المتجر. الطلب يمر عبر السلة ثم نموذج مختصر.
        </p>
        <ul className="mt-8 space-y-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-[#1e3a2f]/40 hover:bg-[#faf8f5]"
              >
                <span className="font-semibold text-stone-900">{l.title}</span>
                <p className="mt-1 text-sm text-stone-600">{l.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="mt-10 inline-block text-sm font-semibold text-[#1e3a2f] hover:underline">
          اتصل بنا →
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
