export type ProductSlug =
  | "seat-gap-organizer"
  | "windshield-sun-shade"
  | "magnetic-mount-charger-kit";

export type OfferTier = "single" | "double" | "triple";

export type ProductOffer = {
  id: string;
  labelAr: string;
  quantity: number;
  priceUsd: number;
  compareAtUsd?: number;
  saveUsd?: number;
  badge?: "popular" | "best_value";
  isDefault?: boolean;
  isUpsellOnly?: boolean;
};

export type Product = {
  slug: ProductSlug;
  routineNameAr: string;
  marketingNameAr: string;
  marketingNameEn: string;
  titleAr: string;
  shortProblemAr: string;
  descriptionAr: string;
  benefitHeadlineAr: string;
  outcomeStackAr: string[];
  priceFromUsd: number;
  reviewCount: number;
  rating: number;
  offers: ProductOffer[];
  defaultOfferId: string;
  upsellOfferId?: string;
  crossSellPriority?: number;
  bom: { componentAr: string; jobAr: string }[];
  vsTable: { axisAr: string; soukshamAr: string; marketAr: string }[];
  goodIfAr: string[];
  notIfAr: string[];
  pdpFaq: { q: string; a: string }[];
  problemSectionsAr: { headlineAr: string; bodyAr: string }[];
  benefitGridAr: { titleAr: string; bodyAr: string }[];
};

/** Legacy CartLine shape — maps to offer by id */
export type CartLine = {
  productSlug: ProductSlug;
  offerId: string;
  quantity: number;
  addedFrom?: "home" | "collection" | "pdp" | "cart_cross_sell" | "upsell";
};

export function lineKey(line: Pick<CartLine, "productSlug" | "offerId">): string {
  return `${line.productSlug}:${line.offerId}`;
}

export function getOfferById(slug: string, offerId: string): ProductOffer | undefined {
  const p = getProduct(slug);
  return p?.offers.find((o) => o.id === offerId);
}

export function lineUnitUsd(line: Pick<CartLine, "productSlug" | "offerId">): number {
  const offer = getOfferById(line.productSlug, line.offerId);
  return offer?.priceUsd ?? 0;
}

export function lineSubtotal(line: CartLine): number {
  return lineUnitUsd(line) * line.quantity;
}

export function cartLinesSubtotal(lines: CartLine[]): number {
  return lines.reduce((s, l) => s + lineSubtotal(l), 0);
}

export function getCrossSellProducts(inCart: CartLine[]): Product[] {
  const inSet = new Set(inCart.map((l) => l.productSlug));
  return products
    .filter((p) => !inSet.has(p.slug))
    .sort((a, b) => (b.crossSellPriority ?? 0) - (a.crossSellPriority ?? 0))
    .slice(0, 3);
}

export function getUpsellProduct(inCart: CartLine[]): { product: Product; offer: ProductOffer } | null {
  const inSet = new Set(inCart.map((l) => l.productSlug));
  for (const p of products) {
    if (inSet.has(p.slug)) continue;
    const upsellOffer = p.upsellOfferId
      ? p.offers.find((o) => o.id === p.upsellOfferId)
      : p.offers[0];
    if (upsellOffer) return { product: p, offer: upsellOffer };
  }
  return null;
}

export const products: Product[] = [
  {
    slug: "seat-gap-organizer",
    routineNameAr: "روتين «صفّ الفجوة»",
    marketingNameAr: "بَيْنَة",
    marketingNameEn: "SoukSham BAYNA™",
    titleAr: "منظّم الفجوة بين المقاعد",
    shortProblemAr:
      "مفاتيح، عملات، موبايل — كي يطيحوا بين المقاعد وتضيع وقتك كل يوم.",
    descriptionAr:
      "صندوق تخزين يملأ الفجوة بين المقعد والكونسول: أقل فوضى، أقل إحراج لما يكون معك راكب.",
    benefitHeadlineAr: "أوقف «مقلب الفجوة» اللي بيسرق وقتك كل ما ركبت السيارة.",
    outcomeStackAr: [
      "تخزين سريع للصغار: عملات، بطاقات، سماعة، أدوات يومية.",
      "تصميم يهدّئ الطنّة — مش صندوق يرجّ في المنعطفات.",
      "تركيب بدون أدوات خلال دقيقة — مناسب لزحمة الطرقات في لبنان.",
    ],
    priceFromUsd: 39,
    reviewCount: 0,
    rating: 0,
    crossSellPriority: 3,
    defaultOfferId: "seat-gap-double",
    upsellOfferId: "seat-gap-single",
    offers: [
      { id: "seat-gap-single", labelAr: "قطعة واحدة", quantity: 1, priceUsd: 39, isDefault: false },
      { id: "seat-gap-double", labelAr: "قطعتان — الأكثر طلباً", quantity: 2, priceUsd: 69, compareAtUsd: 78, saveUsd: 9, badge: "popular", isDefault: true },
      { id: "seat-gap-triple", labelAr: "ثلاث قطع — الأكثر توفيراً", quantity: 3, priceUsd: 99, compareAtUsd: 117, saveUsd: 18, badge: "best_value" },
    ],
    bom: [
      { componentAr: "هيكل ABS مدروس الحرارة", jobAr: "يقلّل التشوّه تحت شمس الانتظار الطويلة." },
      { componentAr: "حواف سدّ مطاطية / TPE", jobAr: "بتمسّك أدقّ بين المقعد والكونسول وبتخفف الاهتزاز." },
      { componentAr: "فتحات تخزين منفصلة", jobAr: "ما يختلط «المهم» مع «الممكن تركه» — أقل قرارات أثناء القيادة." },
    ],
    vsTable: [
      { axisAr: "الثبات في المطبات والدوارات", soukshamAr: "يُبنى كـ «قناة» وليس صندوقاً سائباً.", marketAr: "نسخ رخيصة بتتحرك وبتزعج أو بتوقع بين المقاعد." },
      { axisAr: "وضوح الفائدة", soukshamAr: "روتين واضح: صفّ الفجوة = أقل فقدان.", marketAr: "قطعة «شكلها حلو» بدون منطق استخدام يومي." },
      { axisAr: "الإحراج أمام الركاب", soukshamAr: "مقصورة أنظف بصرياً خلال ثواني.", marketAr: "بتبقى الفوضى لأن الحل غير مكتمل." },
    ],
    goodIfAr: [
      "بتستخدم السيارة يومياً وبتضيع أشياء صغيرة باستمرار.",
      "بتستقبل ركاب (شغل، عيلة) وبتحس بالفوضى.",
      "بتفضّل حلاً مادياً واضحاً بدل «تنظيم معنوي».",
    ],
    notIfAr: [
      "فجوة مقاعدك ضيقة جداً أو شكل الكونسول غير شائع — راسلنا صورة للتأكد قبل الطلب.",
      "بتبحث عن «تخزين خلفي للعيلة» — هي الوحدة لمقعد السائق/الراكب الأمامي.",
    ],
    problemSectionsAr: [
      {
        headlineAr: "الفجوة اللي بتسرق وقتك كل يوم",
        bodyAr: "كل ما وقعت مفاتيحك أو عملاتك بين المقعد والكونسول، بتضيع دقائق بتبحث عنهم — وبتحس بالإحراج إذا كان معك حدا بالسيارة. مشكلة صغيرة بتصير كبيرة لما بتتكرر كل يوم.",
      },
      {
        headlineAr: "كيف بيشتغل بَيْنَة؟",
        bodyAr: "هيكل ABS مدروس بيملأ الفجوة بدقة — مش صندوق عشوائي. بتحطه مرة وبيبقى ثابت حتى في المطبات. فتحات منفصلة لكل نوع من الأغراض: موبايل، مفاتيح، عملات، بطاقات.",
      },
    ],
    benefitGridAr: [
      { titleAr: "تركيب بدقيقة", bodyAr: "ما بحتاج أدوات أو تعديلات على السيارة." },
      { titleAr: "ثابت في الزحمة", bodyAr: "ما بتحس فيه حتى لو المطبات كتير." },
      { titleAr: "أنظف للعين", bodyAr: "مقصورة مرتبة بتعكس شخصيتك قدام الركاب." },
      { titleAr: "للسيارة الأولى والثانية", bodyAr: "عرض القطعتين بيعطيك حل لكل السيارات بالبيت." },
    ],
    pdpFaq: [
      { q: "هل بيناسب كل السيارات؟", a: "معظم الكونسول الوسطي الشائع. أرسل صورة داخلية سريعة إذا عندك شك." },
      { q: "هل بيحجب أي زر مهم؟", a: "صُمّم لعدم التداخل مع أزرار السفتي — إن كان عندك كونسول غير تقليدي، منتواصل معك قبل التجهيز." },
      { q: "ليش قطعتان غالباً أحسن؟", a: "سيارة ثانية بالبيت، أو نفس السيارة بجانبين — أكثر عملية بنفس التوصيلة." },
      { q: "شو لو وصل وما اشتغل مع كونسولي؟", a: "منراجع التوافق قبل الشحن. راجع سياسة الاسترجاع للعطل/عدم المطابقة." },
    ],
  },
  {
    slug: "windshield-sun-shade",
    routineNameAr: "روتين «درع الزجاج»",
    marketingNameAr: "بَرْق الظِلّ",
    marketingNameEn: "SoukSham BARQ SHADE™",
    titleAr: "درع حراري للزجاج الأمامي",
    shortProblemAr:
      "المقود والتابلو بيسخنوا — الدخول للسيارة بيكون عذاب أول دقيقتين.",
    descriptionAr:
      "حاجز يعكس أشعة الشمس ويخفف حمل الحرارة على المقصورة — راحة وتشغيل أسرع للمكيف بدون وعود طبية.",
    benefitHeadlineAr: "قلّل «صدمة الفرن» قبل ما تمسك المقود بإيدك.",
    outcomeStackAr: [
      "يعمل على تقليل الإشعاع على التابلو والمقود عند الوقوف الطويل.",
      "طي سريع — ما بحتاج ترتيب معقد كل صبح.",
      "مناسب لثقافة «انتظار» الطرقات والمواقف المكشوفة.",
    ],
    priceFromUsd: 39,
    reviewCount: 0,
    rating: 0,
    crossSellPriority: 2,
    defaultOfferId: "shade-double",
    upsellOfferId: "shade-single",
    offers: [
      { id: "shade-single", labelAr: "واحدة", quantity: 1, priceUsd: 39, isDefault: false },
      { id: "shade-double", labelAr: "اثنتان — سيارتين أو احتياط", quantity: 2, priceUsd: 69, compareAtUsd: 78, saveUsd: 9, badge: "popular", isDefault: true },
      { id: "shade-triple", labelAr: "ثلاث + حافظة حمل", quantity: 3, priceUsd: 99, compareAtUsd: 117, saveUsd: 18, badge: "best_value" },
    ],
    bom: [
      { componentAr: "طبقة عاكسة عالية", jobAr: "بتعكس جزء كبير من الإشعاع بدل تخزينه داخل المقصورة." },
      { componentAr: "هيكل قابل للطي بذاكرة شكل", jobAr: "بيرجع للاستخدام بسرعة بدون «حرب» مع الزجاج كل مرة." },
      { componentAr: "حواف تحمي من الخدوش السطحية", jobAr: "تقليل احتكاك غير المرغوب مع الإطار الداخلي للزجاج." },
    ],
    vsTable: [
      { axisAr: "النتيجة الحرارية", soukshamAr: "منطق: عكس + تظليل — تخفيف ملموس للإشعاع.", marketAr: "قطعة رقيقة «للصورة» بدون أداء ملحوظ." },
      { axisAr: "السرعة اليومية", soukshamAr: "طي/فرد بيتنجز في ثواني لتصبح عادة.", marketAr: "معقد أو ثقيل فلا بتستخدمه بعد أسبوع." },
      { axisAr: "الصدق في الوعد", soukshamAr: "راحة مقصورة — بدون ادعاءات صحية.", marketAr: "عبارات مبالغ فيها بترفع الشك وبتقتل التأكيد على COD." },
    ],
    goodIfAr: [
      "توقف طويل تحت الشمس (شغل، موقف مكشوف، الساحل، تنقل بين المحافظات).",
      "بدك دخول أهدأ للمقصورة خصوصاً في الصيف.",
      "بتفضّل منتج بيُشرح فيزيائياً لا انطباعياً فقط.",
    ],
    notIfAr: [
      "بتتوقع «تبريد فوري كالمكيف» — هيدا درع إشعاع مش مكيف.",
      "زجاج أمامي غير قياسي جداً — قد بحتاج قياس؛ راسلنا صورة.",
    ],
    problemSectionsAr: [
      {
        headlineAr: "صدمة الفرن — كل يوم بدون استثناء",
        bodyAr: "بتفتح باب السيارة بعد ساعة وقوف تحت الشمس — المقود ما بتقدر تمسكه، التابلو ساخن، والمكيف بياخد وقت حتى يبرّد. هاد مش رفاهية، هي مشكلة يومية بتأثر على تجربة القيادة كاملة.",
      },
      {
        headlineAr: "كيف بيشتغل بَرْق الظِلّ؟",
        bodyAr: "طبقة عاكسة عالية بتحجب أشعة الشمس قبل ما تتحول لحرارة داخل المقصورة. مش وعد سحري — هو فيزياء بسيطة: أقل إشعاع = أقل حرارة مخزّنة = دخول أريح.",
      },
    ],
    benefitGridAr: [
      { titleAr: "طي في ثواني", bodyAr: "هيكل بذاكرة شكل بيرجع لمكانه بدون جهد." },
      { titleAr: "أقل حرارة بالتابلو", bodyAr: "حجب الإشعاع من المصدر بدل انتظار المكيف." },
      { titleAr: "حماية لإطار الزجاج", bodyAr: "حواف ناعمة ما بتخدش الإطار الداخلي." },
      { titleAr: "للسيارة الثانية أيضاً", bodyAr: "عرض الاثنتين يغطي كل السيارات بالبيت." },
    ],
    pdpFaq: [
      { q: "هل بيخفض حرارة المحرك؟", a: "التركيز على المقصورة والتابلو أثناء التوقف — ما إلو علاقة بأداء المحرك." },
      { q: "كم مرة بستخدمه؟", a: "كل مرة بتوقف فيها السيارة تحت شمس قوية — العادة بتبني النتيجة." },
      { q: "هل بيناسب SUV وسيدان؟", a: "معظم المقاسات الشائعة؛ أرسل سنة السيارة وصورة للزجاج إن لزم." },
      { q: "هل فيني أرفض الطلب عند الباب؟", a: "بنفضّل التأكيد الهاتفي لتقليل الرفض — COD ناجح لما التوقع يكون واضحاً." },
    ],
  },
  {
    slug: "magnetic-mount-charger-kit",
    routineNameAr: "روتين «ثبات وشحن»",
    marketingNameAr: "وَثِيق",
    marketingNameEn: "SoukSham WATHIQ™",
    titleAr: "حامل مغناطيسي + شاحن سيارة",
    shortProblemAr:
      "الموبايل بيطيح مع كل مطبة، والشاحن البطيء بيخليك توصل نص الطريق والبطارية فارغة.",
    descriptionAr:
      "تثبيت قوي للهاتف مع مسار شحن واضح — منأكد معك نوع الموبايل والكابل المناسب قبل الشحن.",
    benefitHeadlineAr: "حوّل الموبايل من «مخاطرة على التابلو» لأداة ملاحة ثابتة ومشحونة.",
    outcomeStackAr: [
      "ثبات أعلى في المطبات مقارنة بالحامل اللاصق الضعيف.",
      "شحن بمسار واضح — منشرح لك شو يعني «سريع» فعلياً لهاتفك.",
      "أقل انقطاع للخرائط بالوقت الحرج.",
    ],
    priceFromUsd: 39,
    reviewCount: 0,
    rating: 0,
    crossSellPriority: 1,
    defaultOfferId: "mount-double",
    upsellOfferId: "mount-single",
    offers: [
      { id: "mount-single", labelAr: "طقم واحد", quantity: 1, priceUsd: 39, isDefault: false },
      { id: "mount-double", labelAr: "طقمان — سيارة ثانية أو هدية", quantity: 2, priceUsd: 69, compareAtUsd: 78, saveUsd: 9, badge: "popular", isDefault: true },
      { id: "mount-triple", labelAr: "ثلاثة أطقم", quantity: 3, priceUsd: 99, compareAtUsd: 117, saveUsd: 18, badge: "best_value" },
    ],
    bom: [
      { componentAr: "مغناطيس نيوديميوم (درجة تُذكر في بطاقة المنتج)", jobAr: "قوة مسك أعلى في الاهتزاز اليومي." },
      { componentAr: "مسار PD/QC حسب المواصفات الحقيقية للقطعة", jobAr: "ما نبيع «رقماً كبيراً» — نبيع تطابقاً مع هاتفك." },
      { componentAr: "ميكانيك تثبيت للمروحة / التكييف", jobAr: "نقطة رسو ثابتة بتقلل اهتزاز الصورة أثناء الملاحة." },
    ],
    vsTable: [
      { axisAr: "صدق الشحن", soukshamAr: "منصفي التوقع قبل الدفع عند الاستلام.", marketAr: "شاحن 66W وهمي بيذيب الثقة بالسوق كله." },
      { axisAr: "الثبات", soukshamAr: "مغناطيس + رسو = أقل سقوط في الدوارات.", marketAr: "وزن الموبايل بيقلب الحامل الضعيف." },
      { axisAr: "الأمان الذهني", soukshamAr: "ملاحة ثابتة = قرارات أوضح أثناء القيادة.", marketAr: "قلق مستمر بيقتل تجربة القيادة." },
    ],
    goodIfAr: [
      "بتستخدم خرائط يومياً في زحمة لبنان والمطبات والدوارات.",
      "بتشحن أثناء التنقل وبتلاحظ انقطاع الشحن.",
      "بدك تثبيت أسرع من «كابلات بتلتف».",
    ],
    notIfAr: [
      "هاتفك بغطاء سميك جداً قد يضعف المغناطيس — منسألك عن الغطاء قبل التأكيد.",
      "بتبحث عن حامل شاشة كاملة للترفيه الخلفي — هيدا للسائق/الراكب الأمامي.",
    ],
    problemSectionsAr: [
      {
        headlineAr: "الموبايل على التابلو — مخاطرة وإشغال بالو",
        bodyAr: "كل مطبة الموبايل بيطيح، الخريطة بتنقطع بالوقت الغلط. وبكره بيوصلك البطارية حامضة لأن الشاحن ما كان كافياً. مشكلة تقنية بسيطة بتأثر على كل رحلة.",
      },
      {
        headlineAr: "كيف بيشتغل وَثِيق؟",
        bodyAr: "مغناطيس نيوديميوم قوي بيمسك الهاتف حتى في أصعب المطبات. مع شاحن بمواصفات حقيقية — منأكد معك التوافق مع هاتفك قبل ما نبعت الطلب.",
      },
    ],
    benefitGridAr: [
      { titleAr: "ثبات حتى بالمطبات", bodyAr: "مغناطيس نيوديميوم مش حامل لاصق ضعيف." },
      { titleAr: "شحن بمواصفات صادقة", bodyAr: "منوضح لك الأرقام الحقيقية لهاتفك." },
      { titleAr: "ملاحة مستمرة", bodyAr: "خرائط ثابتة بدون انقطاع في الزحمة." },
      { titleAr: "مثالي كهدية", bodyAr: "طقمان للشخص اللي بيقضي وقته بالسيارة." },
    ],
    pdpFaq: [
      { q: "هل بيدعم آيفون وأندرويد؟", a: "نعم حسب الموديل والكابل. منسألك قبل الشحن لتقليل عدم التوافق." },
      { q: "هل المغناطيس بيضر البطارية؟", a: "التثبيت المغناطيسي ما يعني «شحن سيئ» — جودة الشريحة والحرارة هي الأهم." },
      { q: "شو لو كان شحني بطيئاً؟", a: "بنفضّل قياس التوقع: منبعث لك ما بيدعمه الطقم فعلياً لهاتفك." },
      { q: "ليش طقمين؟", a: "سيارة العيلة الثانية أو هدية عملية — أعلى قيمة لكل دولار عند التوصيل." },
    ],
  },
];

export function formatUsd(n: number) {
  return new Intl.NumberFormat("ar-LB", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
