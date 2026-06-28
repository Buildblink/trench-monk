import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { CouncilResult } from "@/lib/monk/schemas";
import type { PreAnalysis } from "@/lib/monk/pre-analysis";
import type { TokenData } from "@/lib/types";
import { buildPreAnalysis } from "@/lib/monk/pre-analysis";

export interface SaveScanInput {
  tokenData: TokenData;
  council: CouncilResult;
  preAnalysis?: PreAnalysis;
}

export interface SaveScanResult {
  id: string;
}

function toNumeric(value: number | null | undefined): number | null {
  if (value == null || Number.isNaN(value)) return null;
  return value;
}

export async function saveScan(
  input: SaveScanInput
): Promise<SaveScanResult | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { tokenData, council } = input;
  const preAnalysis = input.preAnalysis ?? buildPreAnalysis(tokenData);
  const { finalMonk } = council;

  try {
    const { data, error } = await supabase
      .from("scans")
      .insert({
        token_address: tokenData.tokenAddress,
        chain: tokenData.chain ?? "solana",
        symbol: tokenData.symbol,
        name: tokenData.name,
        pair_address: tokenData.pairAddress,
        dex: tokenData.dex,
        price_usd: toNumeric(tokenData.priceUsd),
        market_cap: toNumeric(tokenData.marketCap),
        fdv: toNumeric(tokenData.fdv),
        liquidity_usd: toNumeric(tokenData.liquidityUsd),
        volume_5m: toNumeric(tokenData.volume5m),
        volume_1h: toNumeric(tokenData.volume1h),
        volume_6h: toNumeric(tokenData.volume6h),
        volume_24h: toNumeric(tokenData.volume24h),
        pair_created_at: tokenData.pairCreatedAt,
        raw_data: tokenData.raw ?? null,
        pre_analysis: preAnalysis,
        data_coverage: council.dataCoverage,
        dev_detective_output: council.devDetective,
        wallet_monk_output: council.walletMonk,
        narrative_oracle_output: council.narrativeOracle,
        final_monk_output: council.finalMonk,
        verdict: finalMonk.verdict,
        clarity_score: finalMonk.clarity_score,
        main_danger: finalMonk.main_danger,
        monk_quote: finalMonk.monk_quote,
        confidence: finalMonk.confidence,
        best_use_case: finalMonk.best_use_case,
      })
      .select("id")
      .single();

    if (error || !data?.id) {
      console.error("[saveScan] Supabase insert failed:", error?.message);
      return null;
    }

    return { id: data.id as string };
  } catch (error) {
    console.error(
      "[saveScan] Unexpected error:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}
