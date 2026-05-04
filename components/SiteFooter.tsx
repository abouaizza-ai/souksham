import Link from "next/link";
import { site } from "@/lib/site";

const policyLinks = [
  { href: "/policies/privacy", label: "الخصوصية" },
  { href: "/policies/terms", label: "الشروط" },
  { href: "/policies/shipping", label: "الشحن" },
  { href: "/policies/returns", label: "الاسترجاع" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100/80">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-stone-900">
              {site.nameAr} · {site.nameEn}
            </p>
            <p className="mt-2 max-w-xs text-sm text-stone-600">
              متجر إلكتروني — {site.countryNameAr} — أسعار بالدولار — الدفع عند الاستلام بعد التأكيد. لا اشتراك،
              ولا رسائل واتساب أو SMS من الموقع.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900">تسوق</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-stone-600">
              <Link href="/collection" className="hover:text-stone-900">
                مجموعة المقصورة
              </Link>
              <Link href="/cart" className="hover:text-stone-900">
                السلة
              </Link>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900">سياسات ودعم</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-stone-600">
              {policyLinks.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-stone-900">
                  {l.label}
                </Link>
              ))}
              <Link href="/contact" className="hover:text-stone-900">
                اتصل بنا
              </Link>
              <Link href="/policies" className="hover:text-stone-900">
                كل السياسات
              </Link>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} {site.nameEn}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
