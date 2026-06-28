import {
  MAX_CALL_REASON_LENGTH,
  MAX_USERNAME_LENGTH,
} from "@/lib/vows/constants";

/** Strip control chars and collapse excessive whitespace. */
export function sanitizeText(value: string): string {
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeUsername(value: string | null | undefined): string | null {
  if (value == null) return null;
  const cleaned = sanitizeText(value).slice(0, MAX_USERNAME_LENGTH);
  return cleaned.length > 0 ? cleaned : null;
}

export function sanitizeCallReason(
  value: string | null | undefined
): string | null {
  if (value == null) return null;
  const cleaned = sanitizeText(value).slice(0, MAX_CALL_REASON_LENGTH);
  return cleaned.length > 0 ? cleaned : null;
}

export function sanitizeWalletAddress(
  value: string | null | undefined
): string | null {
  if (value == null) return null;
  const cleaned = value.trim();
  return cleaned.length > 0 ? cleaned : null;
}
