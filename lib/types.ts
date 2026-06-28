import type { CouncilResult } from "@/lib/monk/schemas";

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

/** Hydrated saved scan — council output ready for UI components. */
export interface SavedScanRecord {
  id: string;
  tokenAddress: string;
  createdAt: string;
  council: CouncilResult;
}

export interface RecentScanResponse {
  success: boolean;
  scan: SavedScanRecord | null;
  error?: string;
  persistenceAvailable?: boolean;
}

export interface VowRecord {
  id: string;
  scanId: string | null;
  tokenAddress: string;
  walletAddress: string | null;
  username: string | null;
  callType: string;
  callReason: string | null;
  monkVerdictAtCall: string | null;
  initialMarketCap: number | null;
  initialLiquidityUsd: number | null;
  initialPriceUsd: number | null;
  initialFdv: number | null;
  resolve1hAt: string;
  resolve3hAt: string;
  resolve24hAt: string;
  result1h: string;
  result3h: string;
  result24h: string;
  wisdomAwarded: number;
  beatMonk: boolean;
  createdAt: string;
}

export interface CreateVowInput {
  scanId?: string | null;
  tokenAddress: string;
  username?: string | null;
  walletAddress?: string | null;
  callType: string;
  callReason?: string | null;
  monkVerdictAtCall: string;
  tokenData: TokenData;
}

export interface VowsResponse {
  success: boolean;
  vows?: VowRecord[];
  vow?: VowRecord;
  error?: string;
}
