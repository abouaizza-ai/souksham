import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata = { title: "الاسترجاع والاستبدال" };

export default function ReturnsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-14">
        <article className="prose mx-auto max-w-3xl px-4 sm:px-6" dir="rtl">
          <h1>سياسة الاسترجاع والاستبدال</h1>
          <p className="text-[#6B625C] text-sm">مراجعة قانونية مطلوبة قبل الإطلاق</p>

          <h2>متى يحق لك الاستبدال؟</h2>
          <ul>
            <li>المنتج وصل تالفاً أو مكسوراً.</li>
            <li>المنتج لا يطابق الوصف المنشور على الموقع.</li>
            <li>الطلب خطأ (منتج آخر غير المطلوب).</li>
          </ul>

          <h2>المدة الزمنية</h2>
          <p>خلال ٧ أيام من تاريخ الاستلام.</p>

          <h2>حالات لا تشملها السياسة</h2>
          <ul>
            <li>تغيير الرأي بعد الاستلام دون عيب في المنتج.</li>
            <li>تلف ناتج عن سوء الاستخدام.</li>
            <li>منتج استُخدم وأُعيد بدون سبب تقني.</li>
          </ul>

          <h2>كيف تطلب الاستبدال؟</h2>
          <p>
            راسلنا على <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> مع:
            رقم الطلب، وصف المشكلة، وصور المنتج إذا كان تالفاً.
          </p>

          <h2>ملاحظة</h2>
          <p>
            نحاول التأكد من توافق المنتج قبل الشحن لتقليل حالات الاستبدال. إذا كان لديك شك في التوافق، تواصل معنا قبل التأكيد.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
