import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `الشروط والأحكام | ${site.title}`,
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold text-stone-900">الشروط والأحكام</h1>
        <p className="mt-2 text-xs text-stone-500">مسودة — طابقها مع كيانك القانوني وسياساتك النهائية.</p>

        <ul className="mt-8 list-disc space-y-3 pe-5 text-sm leading-relaxed text-stone-700">
          <li>الأسعار بالدولار الأمريكي كما هو معروض في السلة وقت الإرسال.</li>
          <li>الدفع عند الاستلام نقدًا بالدولار عند باب {site.countryNameAr} بعد التأكيد الهاتفي.</li>
          <li>التوافق (موديل السيارة/الجوال) يُؤكَّد أثناء التواصل لتقليل الرفض عند الباب.</li>
          <li>أي خلاف يُحل وفق القوانين المعمول بها بعد استشارتك القانونية.</li>
        </ul>

        <Link href="/policies" className="mt-10 inline-block text-sm font-semibold text-[#1e3a2f] hover:underline">
          ← كل السياسات
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
