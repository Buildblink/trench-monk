import { NextRequest, NextResponse } from "next/server";
import { fetchTokenFromDexScreener } from "@/lib/dexscreener";
import { isValidSolanaAddress } from "@/lib/format";
import {
  CouncilUnavailableError,
  isCouncilConfigured,
} from "@/lib/monk/client";
import { buildPreAnalysis } from "@/lib/monk/pre-analysis";
import { runCouncil } from "@/lib/monk/run-council";
import { getRecentScan } from "@/lib/scans/get-recent-scan";
import { saveScan } from "@/lib/scans/save-scan";
import type { TokenData } from "@/lib/types";
import type { CouncilResult } from "@/lib/monk/schemas";

export interface MonkCouncilResponse {
  success: boolean;
  data?: CouncilResult;
  error?: string;
  configured?: boolean;
  scanId?: string;
  fromCache?: boolean;
  createdAt?: string;
}

function isTokenData(value: unknown): value is TokenData {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.tokenAddress === "string" && typeof v.chain === "string";
}

export async function POST(request: NextRequest) {
  if (!isCouncilConfigured()) {
    return NextResponse.json<MonkCouncilResponse>(
      {
        success: false,
        configured: false,
        error:
          "OpenAI API key not configured. Monk Council unavailable.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const forceRefresh = body?.forceRefresh === true;
    let tokenData: TokenData | null = null;

    if (isTokenData(body?.tokenData)) {
      tokenData = body.tokenData;
    } else if (
      typeof body?.tokenAddress === "string" &&
      isValidSolanaAddress(body.tokenAddress.trim())
    ) {
      tokenData = await fetchTokenFromDexScreener(body.tokenAddress.trim());
      if (!tokenData) {
        return NextResponse.json<MonkCouncilResponse>(
          { success: false, error: "No trading pair found for this token" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json<MonkCouncilResponse>(
        {
          success: false,
          error: "tokenData or valid tokenAddress is required",
        },
        { status: 400 }
      );
    }

    if (!tokenData) {
      return NextResponse.json<MonkCouncilResponse>(
        {
          success: false,
          error: "tokenData or valid tokenAddress is required",
        },
        { status: 400 }
      );
    }

    if (!forceRefresh) {
      const recent = await getRecentScan(tokenData.tokenAddress);
      if (recent) {
        return NextResponse.json<MonkCouncilResponse>({
          success: true,
          configured: true,
          data: recent.council,
          scanId: recent.id,
          fromCache: true,
          createdAt: recent.createdAt,
        });
      }
    }

    const data = await runCouncil(tokenData);

    const preAnalysis = buildPreAnalysis(tokenData);
    const saved = await saveScan({ tokenData, council: data, preAnalysis });

    return NextResponse.json<MonkCouncilResponse>({
      success: true,
      configured: true,
      data,
      scanId: saved?.id,
      fromCache: false,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof CouncilUnavailableError) {
      return NextResponse.json<MonkCouncilResponse>(
        {
          success: false,
          configured: false,
          error: error.message,
        },
        { status: 503 }
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : "Monk Council failed to complete the reading.";

    return NextResponse.json<MonkCouncilResponse>(
      { success: false, configured: true, error: message },
      { status: 502 }
    );
  }
}
