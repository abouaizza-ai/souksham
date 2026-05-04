/**
 * Brand lock — do NOT rename without updating docs/BRAND.md.
 * Canonical names: "SoukSham" (en) / "سوق الشام" (ar).
 * Canonical domain: souksham.shop
 * Market: Lebanon only.
 */
export const site = {
  nameAr: "سوق الشام",
  nameEn: "SoukSham",
  brandSlug: "souksham",
  title: "سوق الشام SoukSham — لبنان",
  domain: "souksham.shop",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://souksham.shop",
  apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.souksham.shop",
  description:
    "سوق الشام — منتجات مختارة بعناية لنهارك بلبنان. بَيْنَة، بَرْق الظِلّ، وَثِيق. الدفع عند الاستلام بالدولار.",
  country: "LB",
  countryNameAr: "لبنان",
  currency: "USD",
  currencySymbol: "$",
  locale: "ar-LB",
  supportEmail: "support@souksham.shop",
  cod: {
    headline: "الدفع عند الاستلام · بلا دفع مسبق · تأكيد قبل التجهيز",
    steps: [
      {
        title: "اختار العرض",
        body: "اختر المنتج والعرض من صفحة المنتج أو المجموعة، وضيفه عالسلة.",
      },
      {
        title: "أكمل الطلب",
        body: "اسمك ورقم موبايل لبناني — ملخص واضح قبل الإرسال، بدون دفع مسبق.",
      },
      {
        title: "تأكيد وتوصيل",
        body: "بيتواصل معك فريقنا لتأكيد الطلب والعنوان. الدفع نقداً بالدولار عند الاستلام.",
      },
    ],
    deliveryNoteAr:
      "مدة التوصيل داخل لبنان غالباً ٢–٥ أيام عمل بعد التأكيد. بتختلف حسب المنطقة.",
  },
  cro: {
    confirmationRateLabelAr: "هدف تأكيد الطلبات",
    confirmationRateValueAr: "٧٠٪+",
    deliveryRateLabelAr: "هدف تسليم بعد التأكيد",
    deliveryRateValueAr: "٨٠٪+",
    croNoteAr:
      "أرقام عملية داخلية — اعرض أرقامك الحقيقية عند توفر بيانات من فريق التأكيد.",
  },
  trustBadges: [
    { label: "دفع عند الاستلام", sub: "بلا بطاقة على الموقع" },
    { label: "أسعار بالدولار", sub: "وضوح في السلة" },
    { label: "بلا اشتراك", sub: "شراء لمرة بدون التزام" },
    { label: "ضمان استبدال", sub: "٧ أيام على العطل" },
  ],
  pillars: [
    {
      title: "واقعية، مش وعود فاضية",
      body: "منوصف المواد والاستخدام — بدون ادعاءات طبية أو نتائج مبالغ فيها.",
    },
    {
      title: "مبني على طريق لبنان",
      body: "زحمة بيروت والجبل، المطبات، المواقف المكشوفة، وتنقلات طويلة بين المناطق: الوحدات تُختار لتشتغل يومياً.",
    },
    {
      title: "سلة + دفع واضح",
      body: "طلبك بيمر عبر السلة ثم نموذج مختصر — ونتواصل معك شخصياً قبل التجهيز.",
    },
    {
      title: "شفافية في السعر",
      body: "كل الأسعار بالدولار الأمريكي كما هو شائع في التجارة الإلكترونية اللبنانية.",
    },
  ],
} as const;
