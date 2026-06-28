import { NextRequest, NextResponse } from "next/server";
import { isValidSolanaAddress } from "@/lib/format";
import { getRecentScan } from "@/lib/scans/get-recent-scan";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import type { RecentScanResponse } from "@/lib/types";

export async function GET(request: NextRequest) {
  const tokenAddress = request.nextUrl.searchParams
    .get("tokenAddress")
    ?.trim();

  if (!tokenAddress || !isValidSolanaAddress(tokenAddress)) {
    return NextResponse.json<RecentScanResponse>(
      { success: false, scan: null, error: "Valid tokenAddress is required" },
      { status: 400 }
    );
  }

  try {
    const scan = await getRecentScan(tokenAddress);

    return NextResponse.json<RecentScanResponse>({
      success: true,
      scan,
      persistenceAvailable: isSupabaseConfigured(),
    });
  } catch (error) {
    console.error(
      "[api/scans/recent] Error:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json<RecentScanResponse>({
      success: true,
      scan: null,
      persistenceAvailable: isSupabaseConfigured(),
    });
  }
}
