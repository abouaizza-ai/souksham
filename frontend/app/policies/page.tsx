import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = { title: "السياسات" };

const policies = [
  { href: "/policies/privacy", title: "سياسة الخصوصية", body: "كيف نجمع ونستخدم بياناتك وحقوقك." },
  { href: "/policies/terms", title: "الشروط والأحكام", body: "شروط استخدام الموقع وإتمام الطلبات." },
  { href: "/policies/shipping", title: "سياسة الشحن", body: "مدد التوصيل والمناطق المغطاة ضمن لبنان." },
  { href: "/policies/returns", title: "الاسترجاع والاستبدال", body: "سياسة الاستبدال للمنتجات التالفة أو غير المطابقة." },
];

export default function PoliciesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-[#E5DDD2] bg-[#F7F1E8] py-12">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold text-[#171412]">السياسات</h1>
            <p className="mt-3 text-[#6B625C]">وضوح في حقوقك وواجباتنا.</p>
          </div>
        </section>
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <ul className="grid gap-4 sm:grid-cols-2">
              {policies.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="block rounded-2xl border border-[#E5DDD2] bg-white p-6 shadow-sm hover:shadow-md hover:border-[#123C2F]/30 transition">
                    <h2 className="text-lg font-bold text-[#171412]">{p.title}</h2>
                    <p className="mt-2 text-sm text-[#6B625C]">{p.body}</p>
                    <p className="mt-3 text-xs font-semibold text-[#123C2F]">قراءة ←</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
