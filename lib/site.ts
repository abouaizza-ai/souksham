/**
 * Brand lock — do NOT rename without updating BRAND.md.
 * Canonical names: "SoukSham" (en) / "سوق الشام" (ar).
 * Canonical domain: souksham.shop
 */
export const site = {
  nameAr: "سوق الشام",
  nameEn: "SoukSham",
  brandSlug: "souksham",
  title: "سوق الشام SoukSham",
  domain: "souksham.shop",
  url: "https://souksham.shop",
  description:
    "سوق الشام — لبنان: بَيْنَة، بَرْق الظِلّ، وَثِيق. ترتيب الفجوة، درع حراري للزجاج، ثبات وشحن. تسوّق على الموقع، أضف للسلة، وأكمل الطلب — الدفع عند الاستلام بالدولار.",
  country: "LB",
  countryNameAr: "لبنان",
  currency: "USD",
  currencySymbol: "$",
  locale: "ar-LB",
  cod: {
    headline: "الدفع عند الاستلام · لا اشتراك · لا واتساب ولا SMS من الموقع",
    steps: [
      {
        title: "أضف للسلة",
        body: "اختر المنتج والعرض من صفحة المنتج أو المجموعة، ثم راجع السلة.",
      },
      {
        title: "أكمل الطلب من السلة",
        body: "ملخص واضح + اسمك ورقم جوال سعودي يبدأ بـ 05 — ثم نستلم الطلب في النظام الخلفي.",
      },
      {
        title: "تأكيد وتوصيل",
        body: "يتواصل فريقنا معك لتأكيد العنوان والدفع عند الاستلام بالدولار داخل لبنان.",
      },
    ],
    deliveryNoteAr:
      "مدة التوصيل تختلف حسب المنطقة (غالبًا ٢–٥ أيام عمل بعد التأكيد). نسب التأكيد والتسليم تعتمد على جودة البيانات التي تدخلها.",
  },
  /** CRO micro-stats — replace with your real rolling averages when you have data */
  cro: {
    confirmationRateLabelAr: "هدف تأكيد الطلبات",
    confirmationRateValueAr: "٧٠٪+",
    deliveryRateLabelAr: "هدف تسليم بعد التأكيد",
    deliveryRateValueAr: "٨٠٪+",
    croNoteAr:
      "أرقام عملية داخلية — اعرض أرقامك الحقيقية عندما تصبح لديك بيانات من فريق التأكيد والتوصيل.",
  },
  trustBadges: [
    { label: "دفع عند الاستلام", sub: "بدون بطاقة على الموقع" },
    { label: "أسعار بالدولار", sub: "وضوح في السلة" },
    { label: "لا اشتراك", sub: "شراء لمرة دون التزام" },
    { label: "ضمان استبدال", sub: "٧ أيام على العطل" },
  ],
  pillars: [
    {
      title: "واقعية، مو وعود فاضية",
      body: "نوصف المواد والاستخدام — بدون ادّعاءات طبية أو نتائج مبالغ فيها.",
    },
    {
      title: "مبني على طريق لبنان",
      body: "زحمة بيروت والجبل، المطبات، المواقف المكشوفة، وتنقلات طويلة بين المناطق: الوحدات تُختار لتشتغل يوميًا.",
    },
    {
      title: "سلة + دفع واضح",
      body: "لا واتساب ولا SMS من واجهة المتجر — طلبك يمر عبر السلة ثم نموذج مختصر يقلل الأخطاء.",
    },
    {
      title: "شفافية في السعر",
      body: "كل الأسعار بالدولار الأمريكي كما هو شائع في التجارة الإلكترونية اللبنانية اليوم.",
    },
  ],
} as const;
