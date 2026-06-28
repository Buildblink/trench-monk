import type { TokenData } from "@/lib/types";

export interface PreAnalysis {
  liquidity_to_fdv_ratio: number | null;
  liquidity_to_market_cap_ratio: number | null;
  volume_to_liquidity_ratio_1h: number | null;
  volume_to_liquidity_ratio_24h: number | null;
  pair_age_hours: number | null;
  has_socials: boolean;
  has_paid_boost_or_ads: boolean;
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
] as const;

function safeRatio(numerator: number | null, denominator: number | null): number | null {
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

function formatRatio(ratio: number | null): string | null {
  if (ratio == null) return null;
  return `${(ratio * 100).toFixed(2)}%`;
}

export function buildPreAnalysis(tokenData: TokenData): PreAnalysis {
  const data_available: string[] = [];
  const data_missing: string[] = [...ALWAYS_MISSING];

  if (tokenData.liquidityUsd != null) data_available.push("liquidity");
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

  const risk_flags: string[] = [];

  if (tokenData.liquidityUsd != null && tokenData.liquidityUsd < 10_000) {
    risk_flags.push("micro_liquidity: pool under $10K");
  } else if (tokenData.liquidityUsd != null && tokenData.liquidityUsd < 50_000) {
    risk_flags.push("thin_liquidity: pool under $50K");
  }

  if (liquidity_to_fdv_ratio != null && liquidity_to_fdv_ratio < 0.005) {
    risk_flags.push(
      `very_thin_liquidity_vs_fdv: ${formatRatio(liquidity_to_fdv_ratio)} of FDV in pool`
    );
  } else if (
    liquidity_to_fdv_ratio != null &&
    liquidity_to_fdv_ratio < 0.02
  ) {
    risk_flags.push(
      `thin_liquidity_vs_fdv: ${formatRatio(liquidity_to_fdv_ratio)} of FDV in pool`
    );
  }

  if (
    liquidity_to_market_cap_ratio != null &&
    liquidity_to_market_cap_ratio < 0.01
  ) {
    risk_flags.push(
      `thin_liquidity_vs_mc: ${formatRatio(liquidity_to_market_cap_ratio)} of market cap in pool`
    );
  }

  if (pair_age_hours != null && pair_age_hours < 6) {
    risk_flags.push("very_new_pair: under 6 hours old");
  } else if (pair_age_hours != null && pair_age_hours < 24) {
    risk_flags.push("new_pair: under 24 hours old");
  }

  if (
    tokenData.fdv != null &&
    tokenData.marketCap != null &&
    tokenData.fdv > tokenData.marketCap * 1.25
  ) {
    risk_flags.push("fdv_above_market_cap: dilution / supply overhang signal");
  }

  if (
    volume_to_liquidity_ratio_24h != null &&
    volume_to_liquidity_ratio_24h > 15
  ) {
    risk_flags.push(
      `high_turnover_24h: 24h volume is ${volume_to_liquidity_ratio_24h.toFixed(1)}x liquidity — exit-flow risk`
    );
  }

  if (
    volume_to_liquidity_ratio_1h != null &&
    volume_to_liquidity_ratio_1h > 8
  ) {
    risk_flags.push(
      `high_turnover_1h: 1h volume is ${volume_to_liquidity_ratio_1h.toFixed(1)}x liquidity`
    );
  }

  if (!has_socials) {
    risk_flags.push("no_socials: no website/twitter/telegram on file");
  }

  if (
    tokenData.priceChange24h != null &&
    tokenData.priceChange24h > 50 &&
    liquidity_to_market_cap_ratio != null &&
    liquidity_to_market_cap_ratio < 0.03
  ) {
    risk_flags.push(
      "pump_thin_pool: large 24h move with thin liquidity — volatility / exit risk"
    );
  }

  if (risk_flags.length === 0 && data_available.length > 3) {
    risk_flags.push("no_major_flags_from_available_data");
  }

  return {
    liquidity_to_fdv_ratio,
    liquidity_to_market_cap_ratio,
    volume_to_liquidity_ratio_1h,
    volume_to_liquidity_ratio_24h,
    pair_age_hours,
    has_socials,
    has_paid_boost_or_ads,
    risk_flags,
    data_available,
    data_missing,
  };
}

export interface DataCoverageReport {
  available: string[];
  missing: string[];
  preAnalysis: PreAnalysis;
}

export function buildDataCoverage(tokenData: TokenData): DataCoverageReport {
  const preAnalysis = buildPreAnalysis(tokenData);
  return {
    available: preAnalysis.data_available,
    missing: preAnalysis.data_missing,
    preAnalysis,
  };
}
