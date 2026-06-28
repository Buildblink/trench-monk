export function formatUsd(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(2)}K`;
  if (abs >= 1) return `${sign}$${abs.toFixed(2)}`;
  if (abs >= 0.0001) return `${sign}$${abs.toFixed(4)}`;
  return `${sign}$${abs.toExponential(2)}`;
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  const sign = value >= 0 ? "+" : "";
  const abs = Math.abs(value);
  if (abs >= 100) return `${sign}${value.toFixed(1)}%`;
  if (abs >= 1) return `${sign}${value.toFixed(2)}%`;
  return `${sign}${value.toFixed(2)}%`;
}

/** Format a decimal ratio (0.000052) as a readable percent (0.0052%). */
export function formatRatioPercent(
  ratio: number | null | undefined,
  decimals = 4
): string {
  if (ratio == null || Number.isNaN(ratio)) return "—";
  const pct = ratio * 100;
  if (pct >= 1) return `${pct.toFixed(2)}%`;
  if (pct >= 0.01) return `${pct.toFixed(2)}%`;
  return `${pct.toFixed(decimals)}%`;
}

/** Format a multiplier ratio (e.g. volume/liquidity) as "2.1x". */
export function formatMultiple(ratio: number | null | undefined): string {
  if (ratio == null || Number.isNaN(ratio)) return "—";
  if (ratio >= 100) return `${ratio.toFixed(0)}x`;
  if (ratio >= 10) return `${ratio.toFixed(1)}x`;
  return `${ratio.toFixed(1)}x`;
}

export function formatAge(hours: number | null | undefined): string {
  if (hours == null || Number.isNaN(hours)) return "—";
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  if (hours < 24) return `${Math.round(hours)}h`;
  const days = Math.floor(hours / 24);
  const remainingHours = Math.round(hours % 24);
  return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
}

export function truncateAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function isValidSolanaAddress(address: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address.trim());
}

export function formatTierLabel(tier: string): string {
  return tier.replace(/_/g, " ");
}
