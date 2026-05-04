import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata = {
  title: "تواصل معنا",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-[#E5DDD2] bg-[#F7F1E8] py-12">
          <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#123C2F]">تواصل معنا</p>
            <h1 className="mt-3 text-3xl font-bold text-[#171412]">نحن هنا لمساعدتك</h1>
            <p className="mt-3 text-[#6B625C]">
              سؤال عن منتج؟ طلب موجود؟ مشكلة في التوصيل؟ راسلنا وبنرد بأسرع وقت ممكن.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-xl px-4 sm:px-6">
            <div className="rounded-2xl border border-[#E5DDD2] bg-white p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#171412]">البريد الإلكتروني</h2>
              <p className="mt-2 text-sm text-[#6B625C]">للاستفسارات والدعم:</p>
              <a
                href={`mailto:${site.supportEmail}`}
                className="mt-2 block text-base font-semibold text-[#123C2F] hover:underline"
                dir="ltr"
              >
                {site.supportEmail}
              </a>

              <div className="mt-6 border-t border-[#E5DDD2] pt-6">
                <h3 className="font-semibold text-[#171412]">أوقات الرد</h3>
                <p className="mt-2 text-sm text-[#6B625C]">
                  بنحاول الرد خلال ٢٤ ساعة من الأيام العملية.
                </p>
              </div>

              <div className="mt-6 rounded-xl bg-[#EAF3EE] p-4 text-sm text-[#123C2F]">
                <p className="font-semibold">تأكيد الطلب</p>
                <p className="mt-1 text-[#123C2F]/70">
                  إذا طلبت من الموقع وما وصلك تأكيد، تواصل معنا مع رقم الطلب أو رقم موبايلك.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-[#E5DDD2] bg-[#F7F1E8] p-5 text-sm">
              <p className="font-semibold text-[#171412]">ملاحظة</p>
              <p className="mt-1 text-[#6B625C]">
                ما في زر واتساب أو SMS من هذا الموقع — التواصل عبر البريد الإلكتروني أو هاتفياً من فريق التأكيد بعد الطلب.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
