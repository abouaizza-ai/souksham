/**
 * Lebanese mobile phone validation and normalization.
 * Accepted local prefixes: 03, 70, 71, 76, 78, 79, 81
 * Examples: 03123456, 70123456, +96170123456, 0096170123456
 */

export const LEBANON_MOBILE_PREFIXES = ["03", "70", "71", "76", "78", "79", "81"] as const;
const LEBANON_MOBILE_RE = /^(?:03|70|71|76|78|79|81)\d{6}$/;

/** Strip formatting characters and convert various Lebanese formats to local 8-digit form */
export function normalizeLebanesePhone(raw: string): string {
  let s = raw.replace(/[\s\-().]/g, "").trim();
  // Remove leading +, 00, or spaces
  if (s.startsWith("+961")) s = s.slice(4);
  else if (s.startsWith("00961")) s = s.slice(5);
  else if (s.startsWith("961") && s.length >= 11) s = s.slice(3);
  // Remove leading 0 if followed by known prefix (e.g. 070... is not Lebanese, but handle gracefully)
  // Lebanese local: 03XXXXXX (8 digits) or 70XXXXXX (8 digits)
  return s;
}

export function isValidLebanesePhone(raw: string): boolean {
  const local = normalizeLebanesePhone(raw);
  return LEBANON_MOBILE_RE.test(local);
}

export const checkoutPhoneExampleAr = "مثال: 03123456 أو 70123456";
export const checkoutPhoneHelperAr = "رقم موبايل لبناني يبدأ بـ 03، 70، 71، 76، 78، 79، أو 81";
export const checkoutPhoneErrorAr = "اكتب رقم موبايل لبناني صحيح — مثال: 03123456 أو 70123456";
