import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata = { title: "سياسة الخصوصية" };

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-14">
        <article className="prose mx-auto max-w-3xl px-4 sm:px-6" dir="rtl">
          <h1>سياسة الخصوصية</h1>
          <p className="text-[#6B625C] text-sm">آخر تحديث: مراجعة قانونية مطلوبة قبل الإطلاق</p>

          <h2>ما البيانات التي نجمعها؟</h2>
          <p>عند إتمام الطلب نجمع: الاسم الكامل، رقم الموبايل اللبناني، بيانات الإسناد (utm، fbclid، ttclid، sc_click_id)، وعنوان IP والمتصفح.</p>

          <h2>كيف نستخدم البيانات؟</h2>
          <ul>
            <li>تأكيد الطلب وترتيب التوصيل.</li>
            <li>قياس أداء الإعلانات عبر بيكسلات Meta وTikTok وSnapchat.</li>
            <li>تحسين تجربة الموقع والعروض.</li>
          </ul>

          <h2>البيكسلات والتتبع الإعلاني</h2>
          <p>
            يستخدم الموقع بيكسلات ويب وأحداث سيرفر (CAPI) لقياس الإعلانات وتحسينها. رقم الموبايل قد يُجزّأ (SHA-256) ويُرسل لمنصات الإعلان لأغراض قياس التحويل فقط. لا يُرسل الرقم الحقيقي لهذه المنصات.
          </p>

          <h2>مشاركة البيانات</h2>
          <p>لا نبيع بياناتك. نشاركها فقط مع:</p>
          <ul>
            <li>شركاء التوصيل لتنفيذ الطلب.</li>
            <li>منصات الإعلان (Meta, TikTok, Snapchat) لأغراض القياس فقط وبصورة مجزأة (hashed).</li>
          </ul>

          <h2>حقوقك</h2>
          <p>يحق لك طلب الاطلاع على بياناتك أو حذفها. تواصل معنا على: <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a></p>

          <h2>الكوكيز</h2>
          <p>نستخدم كوكيز ضرورية للسلة وكوكيز تحليلية للإعلانات. يمكنك تعطيل كوكيز الإعلانات من إعدادات متصفحك.</p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
