import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-noto-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.nameEn}`,
  },
  description: site.description,
  applicationName: site.nameEn,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.nameEn,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${notoArabic.variable} h-full`}>
      <body className={`${notoArabic.className} min-h-full flex flex-col bg-[#faf8f5] text-stone-900 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
