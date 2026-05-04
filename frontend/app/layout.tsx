import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { TrackingProvider } from "@/components/TrackingProvider";
import { site } from "@/lib/site";

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.nameEn}`,
  },
  description: site.description,
  applicationName: site.nameEn,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.nameEn,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: "ar_LB",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${notoArabic.variable} h-full`}>
      <body className={`${notoArabic.className} flex min-h-full flex-col bg-[#FFFCF6] text-[#171412] antialiased`}>
        <TrackingProvider />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
