import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `الشحن والتوصيل | ${site.title}`,
};

export default function PoliciesShippingPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold text-stone-900">الشحن والتوصيل</h1>
        <p className="mt-4 text-sm leading-relaxed text-stone-600">
          {site.nameAr} يوصّل داخل {site.countryNameAr}. مدة التوصيل تعتمد على عنوانك وشركة التوصيل المتعاقد
          معها — عادة بين ٢ و٥ أيام عمل بعد تأكيد الطلب.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-stone-600">
          الدفع عند الاستلام يكون بالدولار الأمريكي نقدًا عند باب المنزل، بعد تسليم الطلب.
        </p>
        <p className="mt-6 text-sm text-stone-500">
          حدّث هذه الصفحة برقم الناقل والمناطق غير المغطاة عندما تعقد شراكة التوصيل.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/policies" className="font-semibold text-[#1e3a2f] hover:underline">
            ← كل السياسات
          </Link>
          <Link href="/" className="text-stone-600 hover:underline">
            الرئيسية
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
