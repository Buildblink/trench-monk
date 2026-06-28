export interface TokenData {
  tokenAddress: string;
  chain: string;
  name: string | null;
  symbol: string | null;
  pairAddress: string | null;
  dex: string | null;
  priceUsd: number | null;
  marketCap: number | null;
  fdv: number | null;
  liquidityUsd: number | null;
  volume5m: number | null;
  volume1h: number | null;
  volume6h: number | null;
  volume24h: number | null;
  priceChange5m: number | null;
  priceChange1h: number | null;
  priceChange6h: number | null;
  priceChange24h: number | null;
  pairCreatedAt: string | null;
  pairAgeHours: number | null;
  imageUrl: string | null;
  website: string | null;
  twitter: string | null;
  telegram: string | null;
  boosts: number | null;
  raw: unknown;
}

export interface ScanResponse {
  success: boolean;
  data?: TokenData;
  error?: string;
}
