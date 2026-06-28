import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  RESOLVE_OFFSETS_MS,
  VOW_SPAM_TTL_MS,
} from "@/lib/vows/constants";
import { vowRowToRecord, type VowRow } from "@/lib/vows/map-vow";
import type { CreateVowInput, VowRecord } from "@/lib/types";

export class VowDuplicateError extends Error {
  constructor(
    message = "You already made a Vow on this token recently. The chart needs time to breathe."
  ) {
    super(message);
    this.name = "VowDuplicateError";
  }
}

export class VowPersistenceError extends Error {
  constructor(message = "The Temple could not record your Vow right now.") {
    super(message);
    this.name = "VowPersistenceError";
  }
}

function toNumeric(value: number | null | undefined): number | null {
  if (value == null || Number.isNaN(value)) return null;
  return value;
}

async function hasRecentDuplicateVow(
  tokenAddress: string,
  username: string | null,
  walletAddress: string | null
): Promise<boolean> {
  if (!username && !walletAddress) return false;

  const supabase = getSupabaseServerClient();
  if (!supabase) return false;

  const cutoff = new Date(Date.now() - VOW_SPAM_TTL_MS).toISOString();
  const conditions: string[] = [];

  if (username) {
    conditions.push(`username.eq.${username}`);
  }
  if (walletAddress) {
    conditions.push(`wallet_address.eq.${walletAddress}`);
  }

  const { data, error } = await supabase
    .from("vows")
    .select("id")
    .eq("token_address", tokenAddress)
    .gte("created_at", cutoff)
    .or(conditions.join(","))
    .limit(1);

  if (error) {
    console.error("[createVow] Duplicate check failed:", error.message);
    return false;
  }

  return (data?.length ?? 0) > 0;
}

export async function createVow(input: CreateVowInput): Promise<VowRecord> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    throw new VowPersistenceError(
      "Vow persistence is offline. The Temple cannot record Vows right now."
    );
  }

  const duplicate = await hasRecentDuplicateVow(
    input.tokenAddress,
    input.username ?? null,
    input.walletAddress ?? null
  );

  if (duplicate) {
    throw new VowDuplicateError();
  }

  const now = Date.now();
  const resolve1hAt = new Date(now + RESOLVE_OFFSETS_MS.h1).toISOString();
  const resolve3hAt = new Date(now + RESOLVE_OFFSETS_MS.h3).toISOString();
  const resolve24hAt = new Date(now + RESOLVE_OFFSETS_MS.h24).toISOString();

  const { tokenData } = input;

  try {
    const { data, error } = await supabase
      .from("vows")
      .insert({
        scan_id: input.scanId ?? null,
        token_address: input.tokenAddress,
        wallet_address: input.walletAddress ?? null,
        username: input.username ?? null,
        call_type: input.callType,
        call_reason: input.callReason ?? null,
        monk_verdict_at_call: input.monkVerdictAtCall,
        initial_market_cap: toNumeric(tokenData.marketCap),
        initial_liquidity_usd: toNumeric(tokenData.liquidityUsd),
        initial_price_usd: toNumeric(tokenData.priceUsd),
        initial_fdv: toNumeric(tokenData.fdv),
        resolve_1h_at: resolve1hAt,
        resolve_3h_at: resolve3hAt,
        resolve_24h_at: resolve24hAt,
        result_1h: "pending",
        result_3h: "pending",
        result_24h: "pending",
      })
      .select("*")
      .single();

    if (error || !data) {
      console.error("[createVow] Supabase insert failed:", error?.message);
      throw new VowPersistenceError();
    }

    return vowRowToRecord(data as VowRow);
  } catch (error) {
    if (
      error instanceof VowDuplicateError ||
      error instanceof VowPersistenceError
    ) {
      throw error;
    }

    console.error(
      "[createVow] Unexpected error:",
      error instanceof Error ? error.message : error
    );
    throw new VowPersistenceError();
  }
}
