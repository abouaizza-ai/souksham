/** Saudi mobile in local form: 05XXXXXXXX (10 digits). User requested this format. */
export function isValidCheckoutPhone(raw: string): boolean {
  const digits = raw.replace(/\s+/g, "").trim();
  return /^05\d{8}$/.test(digits);
}

export function normalizeCheckoutPhone(raw: string): string {
  return raw.replace(/\s+/g, "").trim();
}

export const checkoutPhoneExampleAr = "مثال: 05XX XXX XXX — ١٠ أرقام وتبدأ بـ 05";
