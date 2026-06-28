/** Anti-spam window — same username/wallet cannot vow twice on one token within this period. */
export const VOW_SPAM_TTL_MS = 15 * 60 * 1000;

export const RESOLVE_OFFSETS_MS = {
  h1: 60 * 60 * 1000,
  h3: 3 * 60 * 60 * 1000,
  h24: 24 * 60 * 60 * 1000,
} as const;

export const VOW_CALL_TYPES = [
  "Clear Mind",
  "Scalp Only",
  "Hungry Ghosts",
  "Dev Karma",
  "False Temple",
  "Dead Candle",
  "CTO Rebirth",
  "Exit Ceremony",
  "Do Not Ape",
  "Meditate First",
] as const;

export type VowCallType = (typeof VOW_CALL_TYPES)[number];

export const MAX_USERNAME_LENGTH = 32;
export const MAX_CALL_REASON_LENGTH = 280;
