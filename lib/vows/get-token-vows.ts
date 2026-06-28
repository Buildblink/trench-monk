import { getSupabaseServerClient } from "@/lib/supabase/server";
import { vowRowToRecord, type VowRow } from "@/lib/vows/map-vow";
import type { VowRecord } from "@/lib/types";

const DEFAULT_LIMIT = 10;

export async function getTokenVows(
  tokenAddress: string,
  limit = DEFAULT_LIMIT
): Promise<VowRecord[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const normalizedAddress = tokenAddress.trim();
  if (!normalizedAddress) return [];

  try {
    const { data, error } = await supabase
      .from("vows")
      .select("*")
      .eq("token_address", normalizedAddress)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("[getTokenVows] Supabase query failed:", error.message);
      return [];
    }

    return (data as VowRow[]).map(vowRowToRecord);
  } catch (error) {
    console.error(
      "[getTokenVows] Unexpected error:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
}
