import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `الاسترجاع والضمان | ${site.title}`,
};

export default function PoliciesReturnsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold text-stone-900">الاسترجاع والضمان</h1>
        <ul className="mt-6 list-disc space-y-3 pe-5 text-sm leading-relaxed text-stone-600">
          <li>
            عطل تصنيع أو عدم مطابقة للوصف: تواصل معنا خلال <strong>٧ أيام</strong> من الاستلام لترتيب الاستبدال
            أو الحل المناسب.
          </li>
          <li>
            منتجات مفتوحة الاستخدام الشخصي قد تخضع لقيود إضافية — وضّح سياسة {site.nameAr} النهائية هنا بعد
            استشارتك القانونية.
          </li>
          <li>رفض الطلب عند الباب بدون سبب بعد التأكيد قد يرتب تكلفة شحن — ننصح بالتأكيد الهاتفي قبل الإرسال.</li>
        </ul>
        <Link href="/policies" className="mt-10 inline-block text-sm font-semibold text-[#1e3a2f] hover:underline">
          ← كل السياسات
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
