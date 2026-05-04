import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata = { title: "الشروط والأحكام" };

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-14">
        <article className="prose mx-auto max-w-3xl px-4 sm:px-6" dir="rtl">
          <h1>الشروط والأحكام</h1>
          <p className="text-[#6B625C] text-sm">مراجعة قانونية مطلوبة قبل الإطلاق</p>

          <h2>قبول الشروط</h2>
          <p>باستخدامك لموقع {site.nameAr} ({site.domain}) توافق على هذه الشروط.</p>

          <h2>الطلبات والدفع</h2>
          <ul>
            <li>الطلبات COD فقط — لا يتم خصم أي مبلغ على الموقع.</li>
            <li>يُؤكَّد الطلب هاتفياً قبل التجهيز والشحن.</li>
            <li>الأسعار بالدولار الأمريكي (USD) وقابلة للتغيير.</li>
          </ul>

          <h2>التوصيل</h2>
          <p>التوصيل داخل لبنان فقط في هذه المرحلة. مدة التوصيل غالباً ٢–٥ أيام عمل بعد التأكيد.</p>

          <h2>الاسترجاع والاستبدال</h2>
          <p>راجع <a href="/policies/returns">سياسة الاسترجاع</a> للتفاصيل.</p>

          <h2>المسؤولية</h2>
          <p>نوفر وصفاً دقيقاً للمنتجات بحسب معلوماتنا. لا نتحمل مسؤولية الاستخدام غير الصحيح أو التوقعات خارج الوصف المنشور.</p>

          <h2>التواصل</h2>
          <p>لأي استفسار: <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a></p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
