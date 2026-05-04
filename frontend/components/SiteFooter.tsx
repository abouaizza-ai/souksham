import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E5DDD2] bg-[#171412] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123C2F] text-white font-bold text-sm">
                س ش
              </div>
              <div>
                <p className="text-base font-bold leading-tight">{site.nameAr}</p>
                <p className="text-[10px] font-medium tracking-wider text-white/50">{site.nameEn}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              منتجات مختارة بعناية لنهارك بلبنان — واضحة، مرتبة، وبطلب آمن مع الدفع عند الاستلام.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-white/90">المتجر</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/collection", label: "المجموعة" },
                { href: "/products/seat-gap-organizer", label: "بَيْنَة — منظّم الفجوة" },
                { href: "/products/windshield-sun-shade", label: "بَرْق الظِلّ — درع الزجاج" },
                { href: "/products/magnetic-mount-charger-kit", label: "وَثِيق — ثبات وشحن" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold text-white/90">السياسات</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/policies/privacy", label: "الخصوصية" },
                { href: "/policies/terms", label: "الشروط والأحكام" },
                { href: "/policies/shipping", label: "سياسة الشحن" },
                { href: "/policies/returns", label: "الاسترجاع والاستبدال" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Trust */}
          <div>
            <h3 className="text-sm font-semibold text-white/90">تواصل معنا</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-white">
                  صفحة التواصل
                </Link>
              </li>
              <li>
                <a href={`mailto:${site.supportEmail}`} className="text-sm text-white/60 hover:text-white">
                  {site.supportEmail}
                </a>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/60 hover:text-white">
                  من نحن
                </Link>
              </li>
            </ul>
            <div className="mt-5 space-y-1">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[#18794E]" />
                دفع عند الاستلام
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[#18794E]" />
                بيانات آمنة
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[#18794E]" />
                ضمان استبدال ٧ أيام
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {site.nameEn} · {site.domain} · لبنان
          </p>
          <p className="text-xs text-white/30">أسعار بالدولار الأمريكي (USD)</p>
        </div>
      </div>
    </footer>
  );
}
