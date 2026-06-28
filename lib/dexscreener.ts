import type { TokenData } from "./types";

interface DexScreenerPair {
  chainId: string;
  dexId: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceUsd?: string;
  fdv?: number;
  marketCap?: number;
  liquidity?: {
    usd?: number;
  };
  volume?: {
    m5?: number;
    h1?: number;
    h6?: number;
    h24?: number;
  };
  priceChange?: {
    m5?: number;
    h1?: number;
    h6?: number;
    h24?: number;
  };
  pairCreatedAt?: number;
  info?: {
    imageUrl?: string;
    websites?: { url: string }[];
    socials?: { type: string; url: string }[];
  };
  boosts?: {
    active?: number;
  };
}

interface DexScreenerResponse {
  pairs: DexScreenerPair[] | null;
}

function pickBestPair(pairs: DexScreenerPair[]): DexScreenerPair | null {
  if (!pairs.length) return null;

  const solanaPairs = pairs.filter((p) => p.chainId === "solana");
  const candidates = solanaPairs.length ? solanaPairs : pairs;

  return candidates.reduce((best, current) => {
    const bestLiq = best.liquidity?.usd ?? 0;
    const currentLiq = current.liquidity?.usd ?? 0;
    return currentLiq > bestLiq ? current : best;
  });
}

function getSocialUrl(
  socials: { type: string; url: string }[] | undefined,
  type: string
): string | null {
  if (!socials) return null;
  const match = socials.find((s) => s.type.toLowerCase() === type.toLowerCase());
  return match?.url ?? null;
}

export function normalizeDexScreenerData(
  tokenAddress: string,
  response: DexScreenerResponse
): TokenData | null {
  const pairs = response.pairs;
  if (!pairs?.length) return null;

  const pair = pickBestPair(pairs);
  if (!pair) return null;

  const pairCreatedAt = pair.pairCreatedAt
    ? new Date(pair.pairCreatedAt).toISOString()
    : null;

  const pairAgeHours = pair.pairCreatedAt
    ? (Date.now() - pair.pairCreatedAt) / (1000 * 60 * 60)
    : null;

  const socials = pair.info?.socials;

  return {
    tokenAddress: pair.baseToken.address || tokenAddress,
    chain: pair.chainId,
    name: pair.baseToken.name ?? null,
    symbol: pair.baseToken.symbol ?? null,
    pairAddress: pair.pairAddress ?? null,
    dex: pair.dexId ?? null,
    priceUsd: pair.priceUsd ? parseFloat(pair.priceUsd) : null,
    marketCap: pair.marketCap ?? null,
    fdv: pair.fdv ?? null,
    liquidityUsd: pair.liquidity?.usd ?? null,
    volume5m: pair.volume?.m5 ?? null,
    volume1h: pair.volume?.h1 ?? null,
    volume6h: pair.volume?.h6 ?? null,
    volume24h: pair.volume?.h24 ?? null,
    priceChange5m: pair.priceChange?.m5 ?? null,
    priceChange1h: pair.priceChange?.h1 ?? null,
    priceChange6h: pair.priceChange?.h6 ?? null,
    priceChange24h: pair.priceChange?.h24 ?? null,
    pairCreatedAt,
    pairAgeHours,
    imageUrl: pair.info?.imageUrl ?? null,
    website: pair.info?.websites?.[0]?.url ?? null,
    twitter: getSocialUrl(socials, "twitter"),
    telegram: getSocialUrl(socials, "telegram"),
    boosts: pair.boosts?.active ?? null,
    raw: pair,
  };
}

export async function fetchTokenFromDexScreener(
  tokenAddress: string
): Promise<TokenData | null> {
  const url = `https://api.dexscreener.com/latest/dex/tokens/${encodeURIComponent(tokenAddress)}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`DexScreener returned ${res.status}`);
  }

  const data: DexScreenerResponse = await res.json();
  return normalizeDexScreenerData(tokenAddress, data);
}
