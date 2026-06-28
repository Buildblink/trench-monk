import type { TokenData } from "@/lib/types";
import {
  formatAge,
  formatMultiple,
  formatRatioPercent,
  formatUsd,
} from "@/lib/format";

export const PAIR_LIQUIDITY_DISCLAIMER =
  "Liquidity shown is for the selected DexScreener pair only. It may not represent total token liquidity across all pools, routes, or CEXs. FDV and market cap comparisons to pair liquidity should be interpreted carefully.";

export type SizeTier = "micro" | "small" | "mid" | "large" | "unknown";
export type LiquidityTier = "very_low" | "low" | "medium" | "high" | "unknown";
export type PairAgeTier = "new" | "recent" | "established" | "unknown";

export interface PreAnalysis {
  liquidity_to_fdv_ratio: number | null;
  liquidity_to_market_cap_ratio: number | null;
  volume_to_liquidity_ratio_1h: number | null;
  volume_to_liquidity_ratio_24h: number | null;
  pair_age_hours: number | null;
  has_socials: boolean;
  has_paid_boost_or_ads: boolean;
  size_tier: SizeTier;
  liquidity_tier: LiquidityTier;
  pair_age_tier: PairAgeTier;
  pair_liquidity_disclaimer: string;
  calibration_hints: string[];
  formatted_metrics: string[];
  risk_flags: string[];
  data_available: string[];
  data_missing: string[];
}

const ALWAYS_MISSING = [
  "top holders",
  "holder count",
  "bundlers",
  "snipers",
  "dev wallet history",
  "creator wallet",
  "mint authority",
  "freeze authority",
  "KOL wallets",
  "insider wallets",
  "wallet clustering",
  "total liquidity across all pools/CEXs",
] as const;

function safeRatio(
  numerator: number | null,
  denominator: number | null
): number | null {
  if (
    numerator == null ||
    denominator == null ||
    denominator <= 0 ||
    Number.isNaN(numerator) ||
    Number.isNaN(denominator)
  ) {
    return null;
  }
  return numerator / denominator;
}

function computeSizeTier(tokenData: TokenData): SizeTier {
  const mc = tokenData.marketCap;
  const fdv = tokenData.fdv;
  const reference = mc ?? fdv;
  if (reference == null) return "unknown";
  if (reference < 1_000_000) return "micro";
  if (reference < 50_000_000) return "small";
  if (reference < 500_000_000) return "mid";
  return "large";
}

function computeLiquidityTier(liquidityUsd: number | null): LiquidityTier {
  if (liquidityUsd == null) return "unknown";
  if (liquidityUsd < 10_000) return "very_low";
  if (liquidityUsd < 50_000) return "low";
  if (liquidityUsd < 500_000) return "medium";
  return "high";
}

function computePairAgeTier(pairAgeHours: number | null): PairAgeTier {
  if (pairAgeHours == null) return "unknown";
  if (pairAgeHours < 24) return "new";
  if (pairAgeHours < 24 * 7) return "recent";
  return "established";
}

function isEstablishedWithMeaningfulLiquidity(
  sizeTier: SizeTier,
  liquidityTier: LiquidityTier
): boolean {
  const largeEnough = sizeTier === "large" || sizeTier === "mid";
  const liquidEnough =
    liquidityTier === "high" || liquidityTier === "medium";
  return largeEnough && liquidEnough;
}

interface RiskSignal {
  id: string;
  severity: "moderate" | "severe";
  message: string;
}

function buildRiskFlags(
  signals: RiskSignal[],
  sizeTier: SizeTier,
  liquidityTier: LiquidityTier
): string[] {
  const severe = signals.filter((s) => s.severity === "severe");
  const moderate = signals.filter((s) => s.severity === "moderate");
  const established = isEstablishedWithMeaningfulLiquidity(
    sizeTier,
    liquidityTier
  );

  if (established) {
    const nonRatio = signals.filter((s) => !s.id.startsWith("liq_ratio"));
    const count = nonRatio.length + (severe.length >= 2 ? 1 : 0);
    if (severe.length >= 2) {
      return signals.map((s) => s.message);
    }
    if (nonRatio.length >= 2 && (severe.length >= 1 || moderate.length >= 2)) {
      return nonRatio.map((s) => s.message);
    }
    if (count === 0) {
      return ["no_major_flags_from_available_data"];
    }
    return moderate
      .filter((s) => !s.id.startsWith("liq_ratio"))
      .map((s) => s.message);
  }

  if (severe.length >= 1) {
    return signals.map((s) => s.message);
  }
  if (moderate.length >= 2) {
    return moderate.map((s) => s.message);
  }
  if (moderate.length === 1) {
    return [moderate[0].message];
  }
  return ["no_major_flags_from_available_data"];
}

function buildCalibrationHints(
  sizeTier: SizeTier,
  liquidityTier: LiquidityTier,
  pairAgeTier: PairAgeTier
): string[] {
  const hints: string[] = [PAIR_LIQUIDITY_DISCLAIMER];

  if (isEstablishedWithMeaningfulLiquidity(sizeTier, liquidityTier)) {
    hints.push(
      "Large/mid token with meaningful selected-pair liquidity — low pair-liq/FDV or pair-liq/MC ratio alone is NOT rug-level evidence."
    );
    hints.push(
      "Prefer Meditate First, Watchlist only, or Scalp Only unless multiple concrete danger signals exist in available data."
    );
  }

  if (pairAgeTier === "established") {
    hints.push(
      "Established pair age — launch-structure panic is less warranted; focus on current flow and narrative."
    );
  }

  if (sizeTier === "micro" || sizeTier === "small") {
    hints.push(
      "Micro/small token — thin selected-pair liquidity and new-pair signals carry more weight when combined."
    );
  }

  hints.push(
    "Hungry Ghosts requires bundler/sniper/top-holder evidence OR very new + very thin liquidity — not available holder data alone."
  );
  hints.push(
    "Do Not Ape requires multiple severe signals from available data, not pair-liq/FDV ratio alone."
  );

  return hints;
}

function buildFormattedMetrics(
  tokenData: TokenData,
  pre: Pick<
    PreAnalysis,
    | "liquidity_to_fdv_ratio"
    | "liquidity_to_market_cap_ratio"
    | "volume_to_liquidity_ratio_1h"
    | "volume_to_liquidity_ratio_24h"
    | "pair_age_hours"
    | "size_tier"
    | "liquidity_tier"
    | "pair_age_tier"
  >
): string[] {
  const lines: string[] = [
    `Size tier: ${pre.size_tier}`,
    `Selected pair liquidity tier: ${pre.liquidity_tier}`,
    `Pair age tier: ${pre.pair_age_tier}`,
  ];

  if (tokenData.liquidityUsd != null) {
    lines.push(
      `Selected pair liquidity: ${formatUsd(tokenData.liquidityUsd)}`
    );
  }
  if (pre.liquidity_to_fdv_ratio != null) {
    lines.push(
      `Selected pair liquidity / FDV: ${formatRatioPercent(pre.liquidity_to_fdv_ratio)}`
    );
  }
  if (pre.liquidity_to_market_cap_ratio != null) {
    lines.push(
      `Selected pair liquidity / market cap: ${formatRatioPercent(pre.liquidity_to_market_cap_ratio)}`
    );
  }
  if (pre.volume_to_liquidity_ratio_24h != null) {
    lines.push(
      `24h volume / selected pair liquidity: ${formatMultiple(pre.volume_to_liquidity_ratio_24h)}`
    );
  }
  if (pre.volume_to_liquidity_ratio_1h != null) {
    lines.push(
      `1h volume / selected pair liquidity: ${formatMultiple(pre.volume_to_liquidity_ratio_1h)}`
    );
  }
  if (pre.pair_age_hours != null) {
    lines.push(`Pair age: ${formatAge(pre.pair_age_hours)}`);
  }

  return lines;
}

export function buildPreAnalysis(tokenData: TokenData): PreAnalysis {
  const data_available: string[] = [];
  const data_missing: string[] = [...ALWAYS_MISSING];

  if (tokenData.liquidityUsd != null) {
    data_available.push("selected pair liquidity");
  }
  if (tokenData.fdv != null) data_available.push("FDV");
  if (tokenData.marketCap != null) data_available.push("market cap");
  if (tokenData.volume5m != null) data_available.push("volume 5m");
  if (tokenData.volume1h != null) data_available.push("volume 1h");
  if (tokenData.volume6h != null) data_available.push("volume 6h");
  if (tokenData.volume24h != null) data_available.push("volume 24h");
  if (tokenData.pairAgeHours != null || tokenData.pairCreatedAt != null) {
    data_available.push("pair age");
  }
  if (tokenData.priceUsd != null) data_available.push("price");
  if (tokenData.priceChange5m != null) data_available.push("price change 5m");
  if (tokenData.priceChange1h != null) data_available.push("price change 1h");
  if (tokenData.priceChange6h != null) data_available.push("price change 6h");
  if (tokenData.priceChange24h != null) data_available.push("price change 24h");
  if (tokenData.name) data_available.push("token name");
  if (tokenData.symbol) data_available.push("token symbol");
  if (tokenData.dex) data_available.push("DEX");
  if (tokenData.website) data_available.push("website");
  if (tokenData.twitter) data_available.push("twitter");
  if (tokenData.telegram) data_available.push("telegram");

  const has_socials = Boolean(
    tokenData.website || tokenData.twitter || tokenData.telegram
  );
  if (has_socials) {
    data_available.push("socials");
  } else {
    data_missing.push("social links");
  }

  const has_paid_boost_or_ads =
    tokenData.boosts != null && tokenData.boosts > 0;
  if (has_paid_boost_or_ads) {
    data_available.push("DEX boosts / paid signals");
  }

  const liquidity_to_fdv_ratio = safeRatio(
    tokenData.liquidityUsd,
    tokenData.fdv
  );
  const liquidity_to_market_cap_ratio = safeRatio(
    tokenData.liquidityUsd,
    tokenData.marketCap
  );
  const volume_to_liquidity_ratio_1h = safeRatio(
    tokenData.volume1h,
    tokenData.liquidityUsd
  );
  const volume_to_liquidity_ratio_24h = safeRatio(
    tokenData.volume24h,
    tokenData.liquidityUsd
  );
  const pair_age_hours = tokenData.pairAgeHours;

  const size_tier = computeSizeTier(tokenData);
  const liquidity_tier = computeLiquidityTier(tokenData.liquidityUsd);
  const pair_age_tier = computePairAgeTier(pair_age_hours);
  const established = isEstablishedWithMeaningfulLiquidity(
    size_tier,
    liquidity_tier
  );

  const signals: RiskSignal[] = [];

  if (tokenData.liquidityUsd != null && tokenData.liquidityUsd < 10_000) {
    signals.push({
      id: "micro_liquidity",
      severity: "severe",
      message: "micro_liquidity: selected pair under $10K",
    });
  } else if (
    tokenData.liquidityUsd != null &&
    tokenData.liquidityUsd < 50_000
  ) {
    signals.push({
      id: "thin_liquidity",
      severity: "moderate",
      message: "thin_liquidity: selected pair under $50K",
    });
  }

  if (
    !established &&
    liquidity_to_fdv_ratio != null &&
    liquidity_to_fdv_ratio < 0.005 &&
    (liquidity_tier === "very_low" || liquidity_tier === "low")
  ) {
    signals.push({
      id: "liq_ratio_fdv_severe",
      severity: "severe",
      message: `very_thin_pair_liquidity_vs_fdv: ${formatRatioPercent(liquidity_to_fdv_ratio)} — tiny pool vs FDV`,
    });
  } else if (
    !established &&
    liquidity_to_fdv_ratio != null &&
    liquidity_to_fdv_ratio < 0.02 &&
    size_tier !== "large" &&
    size_tier !== "mid"
  ) {
    signals.push({
      id: "liq_ratio_fdv_moderate",
      severity: "moderate",
      message: `thin_pair_liquidity_vs_fdv: ${formatRatioPercent(liquidity_to_fdv_ratio)} — interpret with pair-level caveat`,
    });
  }

  if (
    !established &&
    liquidity_to_market_cap_ratio != null &&
    liquidity_to_market_cap_ratio < 0.01 &&
    (liquidity_tier === "very_low" || liquidity_tier === "low")
  ) {
    signals.push({
      id: "liq_ratio_mc",
      severity: "moderate",
      message: `thin_pair_liquidity_vs_mc: ${formatRatioPercent(liquidity_to_market_cap_ratio)}`,
    });
  }

  if (pair_age_hours != null && pair_age_hours < 6) {
    signals.push({
      id: "very_new_pair",
      severity: "severe",
      message: "very_new_pair: under 6 hours old",
    });
  } else if (pair_age_hours != null && pair_age_hours < 24) {
    signals.push({
      id: "new_pair",
      severity: "moderate",
      message: "new_pair: under 24 hours old",
    });
  }

  if (
    tokenData.fdv != null &&
    tokenData.marketCap != null &&
    tokenData.fdv > tokenData.marketCap * 1.25 &&
    size_tier !== "large"
  ) {
    signals.push({
      id: "fdv_mc_gap",
      severity: "moderate",
      message: "fdv_above_market_cap: dilution / supply overhang signal",
    });
  }

  if (
    volume_to_liquidity_ratio_24h != null &&
    volume_to_liquidity_ratio_24h > 15 &&
    (liquidity_tier === "very_low" || liquidity_tier === "low")
  ) {
    signals.push({
      id: "high_turnover_24h",
      severity: "severe",
      message: `high_turnover_24h: ${formatMultiple(volume_to_liquidity_ratio_24h)} vol/liq on thin selected pair`,
    });
  } else if (
    volume_to_liquidity_ratio_24h != null &&
    volume_to_liquidity_ratio_24h > 15
  ) {
    signals.push({
      id: "high_turnover_24h_moderate",
      severity: "moderate",
      message: `elevated_turnover_24h: ${formatMultiple(volume_to_liquidity_ratio_24h)} vol/selected-pair-liq`,
    });
  }

  if (
    volume_to_liquidity_ratio_1h != null &&
    volume_to_liquidity_ratio_1h > 8 &&
    liquidity_tier !== "high"
  ) {
    signals.push({
      id: "high_turnover_1h",
      severity: "moderate",
      message: `high_turnover_1h: ${formatMultiple(volume_to_liquidity_ratio_1h)} vol/selected-pair-liq`,
    });
  }

  if (
    !has_socials &&
    (size_tier === "micro" || size_tier === "small" || pair_age_tier === "new")
  ) {
    signals.push({
      id: "no_socials",
      severity: "moderate",
      message: "no_socials: no website/twitter/telegram on file",
    });
  }

  if (
    tokenData.priceChange24h != null &&
    tokenData.priceChange24h > 50 &&
    liquidity_to_market_cap_ratio != null &&
    liquidity_to_market_cap_ratio < 0.03 &&
    liquidity_tier !== "high"
  ) {
    signals.push({
      id: "pump_thin_pool",
      severity: "severe",
      message:
        "pump_thin_pool: large 24h move with thin selected-pair liquidity",
    });
  }

  const risk_flags = buildRiskFlags(signals, size_tier, liquidity_tier);
  const calibration_hints = buildCalibrationHints(
    size_tier,
    liquidity_tier,
    pair_age_tier
  );

  const partial = {
    liquidity_to_fdv_ratio,
    liquidity_to_market_cap_ratio,
    volume_to_liquidity_ratio_1h,
    volume_to_liquidity_ratio_24h,
    pair_age_hours,
    size_tier,
    liquidity_tier,
    pair_age_tier,
  };

  return {
    ...partial,
    has_socials,
    has_paid_boost_or_ads,
    pair_liquidity_disclaimer: PAIR_LIQUIDITY_DISCLAIMER,
    calibration_hints,
    formatted_metrics: buildFormattedMetrics(tokenData, partial),
    risk_flags,
    data_available,
    data_missing,
  };
}

export interface DataCoverageReport {
  available: string[];
  missing: string[];
  preAnalysis: PreAnalysis;
  contextTiers: {
    size_tier: SizeTier;
    liquidity_tier: LiquidityTier;
    pair_age_tier: PairAgeTier;
  };
  pairLiquidityDisclaimer: string;
}

export function buildDataCoverage(tokenData: TokenData): DataCoverageReport {
  const preAnalysis = buildPreAnalysis(tokenData);
  return {
    available: preAnalysis.data_available,
    missing: preAnalysis.data_missing,
    preAnalysis,
    contextTiers: {
      size_tier: preAnalysis.size_tier,
      liquidity_tier: preAnalysis.liquidity_tier,
      pair_age_tier: preAnalysis.pair_age_tier,
    },
    pairLiquidityDisclaimer: preAnalysis.pair_liquidity_disclaimer,
  };
}
