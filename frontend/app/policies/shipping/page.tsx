import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = { title: "سياسة الشحن" };

export default function ShippingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-14">
        <article className="prose mx-auto max-w-3xl px-4 sm:px-6" dir="rtl">
          <h1>سياسة الشحن</h1>
          <p className="text-[#6B625C] text-sm">مراجعة مطلوبة مع شريك التوصيل قبل الإطلاق</p>

          <h2>مناطق التوصيل</h2>
          <p>نوصّل داخل لبنان فقط في هذه المرحلة — بيروت، جبل لبنان، الشمال، الجنوب، والبقاع (حسب تغطية شريك التوصيل).</p>

          <h2>مدة التوصيل</h2>
          <p>غالباً ٢–٥ أيام عمل بعد التأكيد الهاتفي. قد تختلف المدة حسب المنطقة والظروف.</p>

          <h2>الدفع</h2>
          <p>الدفع نقداً بالدولار الأمريكي (USD) عند الاستلام. لا دفع مسبق على الموقع.</p>

          <h2>التتبع</h2>
          <p>بعد الشحن، بيتواصل معك فريقنا بتفاصيل الوضع عند الحاجة.</p>

          <h2>رفض الطلب عند الباب</h2>
          <p>
            إذا رفضت استلام الطلب بعد الشحن دون مبرر مقبول (كعدم مطابقة الوصف)، قد تُطبَّق تكاليف الشحن. لتفادي هذا، نؤكد الطلب معك قبل الإرسال.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
