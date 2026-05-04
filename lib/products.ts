import { site } from "./site";

export type ProductSlug =
  | "seat-gap-organizer"
  | "windshield-sun-shade"
  | "magnetic-mount-charger-kit";

export type ProductBundle = {
  labelAr: string;
  qty: number;
  priceUsd: number;
  saveUsd?: number;
  badge?: "popular" | "best_value";
};

export type Product = {
  slug: ProductSlug;
  routineNameAr: string;
  marketingNameAr: string;
  marketingNameEn: string;
  titleAr: string;
  shortProblemAr: string;
  descriptionAr: string;
  /** CRO: outcome-first headline for PDP + ads */
  benefitHeadlineAr: string;
  /** 3 scannable wins (above the fold on mobile) */
  outcomeStackAr: string[];
  priceFromUsd: number;
  reviewCount: number;
  rating: number;
  bundle: ProductBundle[];
  /** Pre-selected bundle index (usually "popular" middle) */
  defaultBundleIndex: number;
  /** "Ingredients" = transparent BoM (nama parallel) */
  bom: { componentAr: string; jobAr: string }[];
  /** 3-way: axis / SoukSham / typical cheap listing */
  vsTable: { axisAr: string; soukshamAr: string; marketAr: string }[];
  goodIfAr: string[];
  notIfAr: string[];
  pdpFaq: { q: string; a: string }[];
};

export type CartLine = {
  slug: ProductSlug;
  bundleIndex: number;
  quantity: number;
};

export function lineKey(line: Pick<CartLine, "slug" | "bundleIndex">): string {
  return `${line.slug}:${line.bundleIndex}`;
}

export function lineUnitUsd(line: Pick<CartLine, "slug" | "bundleIndex">): number {
  const p = getProduct(line.slug);
  if (!p) return 0;
  const b = p.bundle[line.bundleIndex];
  return b?.priceUsd ?? 0;
}

export function lineSubtotal(line: CartLine): number {
  return lineUnitUsd(line) * line.quantity;
}

export function cartLinesSubtotal(lines: CartLine[]): number {
  return lines.reduce((s, l) => s + lineSubtotal(l), 0);
}

export function getCrossSellProducts(inCart: CartLine[]): Product[] {
  const inSet = new Set(inCart.map((l) => l.slug));
  return products.filter((p) => !inSet.has(p.slug));
}

export const products: Product[] = [
  {
    slug: "seat-gap-organizer",
    routineNameAr: "روتين «صفّ الفجوة»",
    marketingNameAr: "بَيْنَة",
    marketingNameEn: "SoukSham BAYNA™",
    titleAr: "منظم الفجوة بين المقاعد — بَيْنَة",
    shortProblemAr:
      "مفاتيح، عملات، جوال—كي يطيحو بين المقاعد وتضيع النهار كامل تدور عليهم.",
    descriptionAr:
      "صندوق تخزين يملأ الفجوة بين المقعد والكونسول: أقل فوضى، أقل إحراج لما يكون معاك راكب.",
    benefitHeadlineAr: "أوقف «مقلب الفجوة» اللي يسرق وقتك كل ما ركبت السيارة.",
    outcomeStackAr: [
      "تخزين سريع للصغار: عملات، بطاقات، سماعة، أدوات يومية.",
      "تصميم يهدّئ الطنّة — مو صندوق يرجّ في المنعطفات.",
      "تركيب بدون أدوات خلال دقيقة — مناسب لزحمة الطرقات والتوقف المتكرر في لبنان.",
    ],
    priceFromUsd: 39,
    reviewCount: 128,
    rating: 4.8,
    defaultBundleIndex: 1,
    bundle: [
      { labelAr: "قطعة واحدة", qty: 1, priceUsd: 39 },
      {
        labelAr: "قطعتان — الأكثر اختياراً",
        qty: 2,
        priceUsd: 69,
        saveUsd: 9,
        badge: "popular",
      },
      {
        labelAr: "ثلاث قطع — الأكثر توفيراً",
        qty: 3,
        priceUsd: 99,
        saveUsd: 18,
        badge: "best_value",
      },
    ],
    bom: [
      {
        componentAr: "هيكل ABS مدروس الحرارة",
        jobAr: "يقلّل التشوّه تحت شمس الانتظار الطويلة.",
      },
      {
        componentAr: "حواف سدّ مطاطية / TPE",
        jobAr: "تمسّك أدقّ بين المقعد والكونسول وتخفّف الاهتزاز.",
      },
      {
        componentAr: "فتحات تخزين منفصلة",
        jobAr: "ما يختلط «المهم» مع «الممكن تركه» — أقل قرارات أثناء القيادة.",
      },
    ],
    vsTable: [
      {
        axisAr: "الثبات في المطبات والدوارات",
        soukshamAr: "يُبنى كـ «قناة» وليس صندوقًا سائبًا.",
        marketAr: "نسخ رخيصة تتحرّك وتزعج أو تسقط بين المقاعد.",
      },
      {
        axisAr: "وضوح الفائدة",
        soukshamAr: "روتين واضح: صفّ الفجوة = أقل فقدان.",
        marketAr: "قطعة «شكلها حلو» بدون منطق استخدام يومي.",
      },
      {
        axisAr: "الاحراج أمام الركاب",
        soukshamAr: "مقصورة أنظف بصريًا خلال ثواني.",
        marketAr: "تبقى الفوضى لأن الحل غير مكتمل.",
      },
    ],
    goodIfAr: [
      "تستخدم السيارة يوميًا وتضيع أشياء صغيرة باستمرار.",
      "تستقبل راكبين (عمل، عائلة) وتحسّ بالفوضى.",
      "تفضّل حلًا ماديًا واضحًا بدل «تنظيم معنوي».",
    ],
    notIfAr: [
      "فجوة مقاعدك ضيقة جدًا أو شكل الكونسول غير شائع — أرسل صورة للتأكد قبل الطلب.",
      "تبحث عن «تخزين خلفي للعائلة» — هذه الوحدة لمقعد السائق/الراكب الأمامي.",
    ],
    pdpFaq: [
      {
        q: "هل يناسب كل السيارات؟",
        a: "معظم الكونسول الوسطي الشائع. أرسل صورة داخلية سريعة عبر واتساب قبل الشحن إذا عندك شك.",
      },
      {
        q: "هل يحجب أي زر مهم؟",
        a: "صُمم لعدم التداخل مع أزرار السفتي والفرامل — إن كان عندك كونسول غير تقليدي، ننبهك قبل التأكيد.",
      },
      {
        q: "لماذا قطعتان غالبًا أفضل؟",
        a: "سيارة ثانية في البيت، أو نفس السيارة بجانبين مختلفين للاستخدام العملي.",
      },
      {
        q: "ماذا لو وصلت وما اشتغلت مع كونسولي؟",
        a: "نراجع التوافق قبل الشحن لتقليل هذا. راجع سياسة الاسترجاع للعطل/عدم المطابقة.",
      },
    ],
  },
  {
    slug: "windshield-sun-shade",
    routineNameAr: "روتين «درع الزجاج»",
    marketingNameAr: "بَرْق الظِلّ",
    marketingNameEn: "SoukSham BARQ SHADE™",
    titleAr: "درع حراري للزجاج الأمامي — بَرْق الظِلّ",
    shortProblemAr:
      "المقود والتابلو يسخنو؛ الدخول للسيارة يكون عذاب أول دقيقتين.",
    descriptionAr:
      "حاجز يعكس أشعة الشمس ويخفّف حمل الحرارة على المقصورة — راحة وتشغيل أسرع للمكيّف بدون وعود طبية.",
    benefitHeadlineAr: "قلّل «صدمة الفرن» قبل ما تمسك المقود بيدك.",
    outcomeStackAr: [
      "يعمل على تقليل الإشعاع على التابلو والمقود عند الوقوف الطويل.",
      "طيّ سريع — ما يحتاج ترتيب معقد كل صباح.",
      "مناسب لثقافة «انتظار» الطرقات والمواقف المكشوفة.",
    ],
    priceFromUsd: 39,
    reviewCount: 96,
    rating: 4.7,
    defaultBundleIndex: 1,
    bundle: [
      { labelAr: "واحدة", qty: 1, priceUsd: 39 },
      {
        labelAr: "اثنتان (سيارتين أو احتياط)",
        qty: 2,
        priceUsd: 69,
        saveUsd: 9,
        badge: "popular",
      },
      {
        labelAr: "ثلاث + حافظة حمل",
        qty: 3,
        priceUsd: 99,
        saveUsd: 18,
        badge: "best_value",
      },
    ],
    bom: [
      {
        componentAr: "طبقة عاكسة عالية",
        jobAr: "تعكس جزءًا كبيرًا من الإشعاع بدل تخزينه داخل المقصورة.",
      },
      {
        componentAr: "هيكل قابل للطي بذاكرة شكل",
        jobAr: "يرجع للاستخدام بسرعة بدون «حرب» مع الزجاج كل مرة.",
      },
      {
        componentAr: "حواف تحمي من الخدوش السطحية",
        jobAr: "تقليل احتكاك غير المرغوب مع الإطار الداخلي للزجاج.",
      },
    ],
    vsTable: [
      {
        axisAr: "النتيجة الحرارية",
        soukshamAr: "منطق: عكس + تظليل — تخفيف ملموس للإشعاع.",
        marketAr: "قطعة رقيقة «للصورة» بدون أداء ملحوظ.",
      },
      {
        axisAr: "السرعة اليومية",
        soukshamAr: "طيّ/فرد يُنجز في ثوانٍ لتصبح عادة.",
        marketAr: "معقد أو ثقيل فلا تستخدمه بعد أسبوع.",
      },
      {
        axisAr: "الصدق في الوعد",
        soukshamAr: "راحة مقصورة — بدون ادّعاءات صحية.",
        marketAr: "عبارات مبالغة ترفع الشك وتقتل التأكيد على COD.",
      },
    ],
    goodIfAr: [
      "توقف طويل تحت الشمس (عمل، موقف مكشوف، الساحل، تنقل بين المحافظات).",
      "تريد دخولًا أهدأ للمقصورة خصوصًا في الصيف.",
      "تفضّل منتجًا يُشرح فيزيائيًا لا انطباعيًا فقط.",
    ],
    notIfAr: [
      "تتوقع «تبريدًا فوريًا كالمكيّف» — هذا درع إشعاع وليس مكيّفًا.",
      "زجاج أمامي غير قياسي جدًا — قد يحتاج قياسًا؛ راسلنا صورة.",
    ],
    pdpFaq: [
      {
        q: "هل يخفّض حرارة المحرك؟",
        a: "التركيز على المقصورة والتابلو أثناء التوقف — لا علاقة له بأداء المحرك.",
      },
      {
        q: "كم مرة أستخدمه؟",
        a: "كل مرة توقف فيها السيارة تحت شمس قوية — العادة تبني النتيجة.",
      },
      {
        q: "هل يناسب SUV وسيدان؟",
        a: "معظم المقاسات الشائعة؛ أرسل سنة السيارة وصورة للزجاج إن لزم.",
      },
      {
        q: "هل أستطيع رفض الطلب عند الباب؟",
        a: "نفضّل التأكيد الهاتفي لتقليل الرفض — COD ناجح عندما يكون التوقع واضحًا.",
      },
    ],
  },
  {
    slug: "magnetic-mount-charger-kit",
    routineNameAr: "روتين «ثبات وشحن»",
    marketingNameAr: "وَثِيق",
    marketingNameEn: "SoukSham WATHIQ™",
    titleAr: "حامل مغناطيسي + شاحن سيارة — وَثِيق",
    shortProblemAr:
      "الجوال يطيح مع كل مطبّة، والشاحن البطيء يخلّيك توصل نص الطريق والبطارية حامضة.",
    descriptionAr:
      "تثبيت قوي للهاتف مع مسار شحن واضح — نؤكد معك نوع الجوال والكابل المناسب قبل الشحن لتقليل الإحباط.",
    benefitHeadlineAr: "حوّل الجوال من «مخاطرة على التابلو» إلى أداة ملاحة ثابتة ومشحونة.",
    outcomeStackAr: [
      "ثبات أعلى في المطبات مقارنة بالحامل اللاصق الضعيف.",
      "شحن بمسار واضح — نشرح لك ماذا يعني «سريع» حقًا لهاتفك.",
      "أقل انقطاع للخرائط في اللحظة الحرجة.",
    ],
    priceFromUsd: 39,
    reviewCount: 154,
    rating: 4.9,
    defaultBundleIndex: 1,
    bundle: [
      { labelAr: "طقم واحد", qty: 1, priceUsd: 39 },
      {
        labelAr: "طقمين — سيارة ثانية أو هدية",
        qty: 2,
        priceUsd: 69,
        saveUsd: 9,
        badge: "popular",
      },
      {
        labelAr: "ثلاثة أطقم",
        qty: 3,
        priceUsd: 99,
        saveUsd: 18,
        badge: "best_value",
      },
    ],
    bom: [
      {
        componentAr: "مغناطيس نيوديميوم (درجة تُذكر في بطاقة المنتج)",
        jobAr: "قوة مسك أعلى في الاهتزاز اليومي.",
      },
      {
        componentAr: "مسار PD/QC حسب المواصفات الحقيقية للقطعة",
        jobAr: "لا نبيع «رقمًا كبيرًا» — نبيع تطابقًا مع هاتفك.",
      },
      {
        componentAr: "ميكانيك تثبيت للمروحة / التكييف",
        jobAr: "نقطة رسو ثابتة تقلل اهتزاز الصورة أثناء التصوير أو الملاحة الليلية.",
      },
    ],
    vsTable: [
      {
        axisAr: "صدق الشحن",
        soukshamAr: "نصفّي التوقع قبل الدفع عند الاستلام.",
        marketAr: "شاحن 66W وهمي يذيب الثقة في السوق كله.",
      },
      {
        axisAr: "الثبات",
        soukshamAr: "مغناطيس + رسو = أقل سقوط في الدوارات.",
        marketAr: "وزن الجوال يقلب الحامل الضعيف.",
      },
      {
        axisAr: "السلامة الذهنية",
        soukshamAr: "ملاحة ثابتة = قرارات أوضح أثناء القيادة.",
        marketAr: "قلق مستمر يقتل تجربة القيادة.",
      },
    ],
    goodIfAr: [
      "تستخدم خرائط يوميًا في زحمة لبنان والمطبات والدوارات.",
      "تشحن أثناء التنقل وتلاحظ انقطاع الشحن.",
      "تريد تثبيتًا أسرع من «كابلات تلتف حول ناقل الحركة».",
    ],
    notIfAr: [
      "هاتفك بغطاء سميك جدًا قد يضعف المغناطيس — نسألك عن الغطاء قبل التأكيد.",
      "تبحث عن حامل شاشة كاملة للترفيه الخلفي — هذا لسائق/راكب أمامي.",
    ],
    pdpFaq: [
      {
        q: "هل يدعم آيفون وأندرويد؟",
        a: "نعم حسب الموديل والكابل. نسألك قبل الشحن لتقليل عدم التوافق.",
      },
      {
        q: "هل المغناطيس يضرّ البطارية؟",
        a: "التثبيت المغناطيسي لا يعني «شحنًا سيئًا» — جودة الشريحة والحرارة هي الأهم.",
      },
      {
        q: "ماذا لو كان شحني بطيئًا رغم الادّعاء؟",
        a: "نفضّل قياس التوقع: نرسل لك ما يدعمه الطقم فعليًا لهاتفك.",
      },
      {
        q: "لماذا طقمين؟",
        a: "سيارة العائلة الثانية أو هدية عملية — أعلى قيمة لكل دولار عند التوصيل.",
      },
    ],
  },
];

export function formatUsd(n: number) {
  return new Intl.NumberFormat(site.locale, {
    style: "currency",
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
