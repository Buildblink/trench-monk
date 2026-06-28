import type { VowRecord } from "@/lib/types";

/** Raw vows table row from Supabase. */
export interface VowRow {
  id: string;
  scan_id: string | null;
  token_address: string;
  wallet_address: string | null;
  username: string | null;
  call_type: string;
  call_reason: string | null;
  monk_verdict_at_call: string | null;
  initial_market_cap: number | null;
  initial_liquidity_usd: number | null;
  initial_price_usd: number | null;
  initial_fdv: number | null;
  resolve_1h_at: string | null;
  resolve_3h_at: string | null;
  resolve_24h_at: string | null;
  result_1h: string | null;
  result_3h: string | null;
  result_24h: string | null;
  wisdom_awarded: number | null;
  beat_monk: boolean | null;
  created_at: string;
}

export function vowRowToRecord(row: VowRow): VowRecord {
  return {
    id: row.id,
    scanId: row.scan_id,
    tokenAddress: row.token_address,
    walletAddress: row.wallet_address,
    username: row.username,
    callType: row.call_type,
    callReason: row.call_reason,
    monkVerdictAtCall: row.monk_verdict_at_call,
    initialMarketCap: row.initial_market_cap,
    initialLiquidityUsd: row.initial_liquidity_usd,
    initialPriceUsd: row.initial_price_usd,
    initialFdv: row.initial_fdv,
    resolve1hAt: row.resolve_1h_at ?? "",
    resolve3hAt: row.resolve_3h_at ?? "",
    resolve24hAt: row.resolve_24h_at ?? "",
    result1h: row.result_1h ?? "pending",
    result3h: row.result_3h ?? "pending",
    result24h: row.result_24h ?? "pending",
    wisdomAwarded: row.wisdom_awarded ?? 0,
    beatMonk: row.beat_monk ?? false,
    createdAt: row.created_at,
  };
}
