import { NextRequest, NextResponse } from "next/server";
import { fetchTokenFromDexScreener } from "@/lib/dexscreener";
import { isValidSolanaAddress } from "@/lib/format";
import type { ScanResponse } from "@/lib/types";

export async function GET(request: NextRequest) {
  const tokenAddress = request.nextUrl.searchParams.get("tokenAddress");

  if (!tokenAddress?.trim()) {
    return NextResponse.json<ScanResponse>(
      { success: false, error: "tokenAddress is required" },
      { status: 400 }
    );
  }

  const trimmed = tokenAddress.trim();

  if (!isValidSolanaAddress(trimmed)) {
    return NextResponse.json<ScanResponse>(
      { success: false, error: "Invalid Solana token address" },
      { status: 400 }
    );
  }

  try {
    const data = await fetchTokenFromDexScreener(trimmed);

    if (!data) {
      return NextResponse.json<ScanResponse>(
        { success: false, error: "No trading pair found for this token" },
        { status: 404 }
      );
    }

    return NextResponse.json<ScanResponse>({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch token data";
    return NextResponse.json<ScanResponse>(
      { success: false, error: message },
      { status: 502 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tokenAddress = body?.tokenAddress as string | undefined;

    if (!tokenAddress?.trim()) {
      return NextResponse.json<ScanResponse>(
        { success: false, error: "tokenAddress is required" },
        { status: 400 }
      );
    }

    const url = new URL(request.url);
    url.searchParams.set("tokenAddress", tokenAddress.trim());
    return GET(new NextRequest(url, request));
  } catch {
    return NextResponse.json<ScanResponse>(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
