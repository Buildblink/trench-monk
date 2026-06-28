import { getSupabaseServerClient } from "@/lib/supabase/server";
import { RECENT_SCAN_TTL_MS } from "@/lib/scans/constants";
import { scanRowToSavedScan, type ScanRow } from "@/lib/scans/map-scan";
import type { SavedScanRecord } from "@/lib/types";

export async function getRecentScan(
  tokenAddress: string
): Promise<SavedScanRecord | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const normalizedAddress = tokenAddress.trim();
  if (!normalizedAddress) return null;

  const cutoff = new Date(Date.now() - RECENT_SCAN_TTL_MS).toISOString();

  try {
    const { data, error } = await supabase
      .from("scans")
      .select("*")
      .eq("token_address", normalizedAddress)
      .gte("created_at", cutoff)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("[getRecentScan] Supabase query failed:", error.message);
      return null;
    }

    if (!data) return null;

    return scanRowToSavedScan(data as ScanRow);
  } catch (error) {
    console.error(
      "[getRecentScan] Unexpected error:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}
