/**
 * Phone normalization for tickets.
 *
 * Accepted input: digits with an optional country code, spaces, dashes and
 * "+" are stripped first.
 *  - exactly 10 digits  -> prefix "91" (India)
 *  - 11..15 digits      -> kept as-is (already has a country code)
 *  - anything else      -> rejected (returns null)
 */
export const PHONE_STORED_RE = /^\d{11,15}$/;

export function normalizePhone(raw: string): string | null {
  const stripped = raw.replace(/[\s\-+]/g, "");
  if (!/^\d+$/.test(stripped)) return null;
  if (stripped.length === 10) return `91${stripped}`;
  if (stripped.length >= 11 && stripped.length <= 15) return stripped;
  return null;
}

/** Human-readable reason a raw phone value was rejected. */
export function phoneRejectionReason(raw: string): string {
  const stripped = raw.replace(/[\s\-+]/g, "");
  if (stripped.length === 0) return "phone is required";
  if (!/^\d+$/.test(stripped)) return "phone must contain digits only";
  if (stripped.length < 10) return "phone must be 10 digits or a country-coded number";
  if (stripped.length > 15) return "phone must be 15 digits or fewer";
  return "phone is not valid";
}
