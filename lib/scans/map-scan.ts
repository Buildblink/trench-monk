import type { CouncilResult } from "@/lib/monk/schemas";
import type { PreAnalysis } from "@/lib/monk/pre-analysis";
import type { SavedScanRecord } from "@/lib/types";

/** Raw scans table row from Supabase. */
export interface ScanRow {
  id: string;
  token_address: string;
  chain: string | null;
  symbol: string | null;
  name: string | null;
  pair_address: string | null;
  dex: string | null;
  price_usd: number | null;
  market_cap: number | null;
  fdv: number | null;
  liquidity_usd: number | null;
  volume_5m: number | null;
  volume_1h: number | null;
  volume_6h: number | null;
  volume_24h: number | null;
  pair_created_at: string | null;
  raw_data: unknown;
  pre_analysis: unknown;
  data_coverage: unknown;
  dev_detective_output: unknown;
  wallet_monk_output: unknown;
  narrative_oracle_output: unknown;
  final_monk_output: unknown;
  verdict: string | null;
  clarity_score: number | null;
  main_danger: string | null;
  monk_quote: string | null;
  confidence: string | null;
  best_use_case: string | null;
  created_at: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseCouncilResult(row: ScanRow): CouncilResult | null {
  const devDetective = row.dev_detective_output;
  const walletMonk = row.wallet_monk_output;
  const narrativeOracle = row.narrative_oracle_output;
  const finalMonk = row.final_monk_output;
  const dataCoverage = row.data_coverage;

  if (
    !isRecord(devDetective) ||
    !isRecord(walletMonk) ||
    !isRecord(narrativeOracle) ||
    !isRecord(finalMonk) ||
    !isRecord(dataCoverage)
  ) {
    return null;
  }

  const contextTiers = dataCoverage.contextTiers;
  if (!isRecord(contextTiers)) {
    return null;
  }

  return {
    devDetective: devDetective as CouncilResult["devDetective"],
    walletMonk: walletMonk as CouncilResult["walletMonk"],
    narrativeOracle: narrativeOracle as CouncilResult["narrativeOracle"],
    finalMonk: finalMonk as CouncilResult["finalMonk"],
    dataCoverage: {
      available: Array.isArray(dataCoverage.available)
        ? (dataCoverage.available as string[])
        : [],
      missing: Array.isArray(dataCoverage.missing)
        ? (dataCoverage.missing as string[])
        : [],
      contextTiers: {
        size_tier: String(contextTiers.size_tier ?? "unknown"),
        liquidity_tier: String(contextTiers.liquidity_tier ?? "unknown"),
        pair_age_tier: String(contextTiers.pair_age_tier ?? "unknown"),
      },
      pairLiquidityDisclaimer: String(
        dataCoverage.pairLiquidityDisclaimer ?? ""
      ),
    },
  };
}

export function scanRowToSavedScan(row: ScanRow): SavedScanRecord | null {
  const council = parseCouncilResult(row);
  if (!council) return null;

  return {
    id: row.id,
    tokenAddress: row.token_address,
    createdAt: row.created_at,
    council,
  };
}

export type { PreAnalysis };
