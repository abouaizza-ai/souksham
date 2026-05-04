import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `اتصل بنا | ${site.title}`,
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold text-stone-900">اتصل بنا</h1>
        <p className="mt-4 text-sm leading-relaxed text-stone-600">
          الطلب الرسمي يتم عبر <Link href="/cart" className="font-semibold text-[#1e3a2f] underline">السلة</Link>{" "}
          ثم نموذج الإتمام — لا واتساب ولا SMS تلقائي من الموقع. للاستفسارات التشغيلية (شراكة، جملة، بيانات
          خاطئة في طلب):
        </p>

        <div className="mt-8 rounded-2xl border border-stone-200 bg-[#faf8f5] p-6">
          <p className="text-sm font-semibold text-stone-900">البريد الإلكتروني</p>
          <p className="mt-2 text-sm text-stone-600">
            للدعم والاستفسارات:{" "}
            <a
              href={`mailto:support@${site.domain}`}
              className="font-medium text-[#1e3a2f] underline"
              dir="ltr"
            >
              support@{site.domain}
            </a>
          </p>
          <p className="mt-4 text-xs text-stone-500">
            وقت الرد المستهدف: خلال يومي عمل — حدّث هذا النص ليطابق فريقك.
          </p>
        </div>

        <p className="mt-8 text-sm text-stone-600">
          قبل الطلب: راجع{" "}
          <Link href="/policies/shipping" className="text-[#1e3a2f] underline">
            الشحن
          </Link>{" "}
          و{" "}
          <Link href="/policies/returns" className="text-[#1e3a2f] underline">
            الاسترجاع
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
