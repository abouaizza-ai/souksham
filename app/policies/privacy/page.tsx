import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `سياسة الخصوصية | ${site.title}`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold text-stone-900">سياسة الخصوصية</h1>
        <p className="mt-2 text-xs text-stone-500">مسودة — راجعها مع مستشارك القانوني قبل الإطلاق.</p>

        <section className="mt-8 space-y-4 text-sm leading-relaxed text-stone-700">
          <p>
            عند إتمام الطلب من السلة، يُطلب <strong>الاسم</strong> و<strong>رقم جوال سعودي</strong> (صيغة{" "}
            <span dir="ltr">05XXXXXXXX</span>) ليتم إرسال الطلب إلى أنظمتنا (مثل جدول أو Webhook). لا يتم جمع
            بيانات بطاقة على هذا الموقع لأن الدفع عند الاستلام.
          </p>
          <p>
            قد نستخدم بيانات الاتصال لتأكيد الطلب والتوصيل داخل {site.countryNameAr}، وليس لإرسال رسائل تسويقية
            آلية من واجهة المتجر (لا اشتراك، لا SMS/واتساب تلقائي من الموقع).
          </p>
          <p>
            السلة تُخزَّن محليًا في متصفحك (<code className="rounded bg-stone-100 px-1">localStorage</code>) —
            لا يصل محتواها لخوادمنا حتى تضغط «تأكيد وإرسال الطلب».
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link href="/policies" className="font-semibold text-[#1e3a2f] hover:underline">
            ← كل السياسات
          </Link>
          <Link href="/contact" className="text-stone-600 hover:underline">
            اتصل بنا
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
