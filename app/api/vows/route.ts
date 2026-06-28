import { NextRequest, NextResponse } from "next/server";
import { isValidSolanaAddress } from "@/lib/format";
import {
  createVow,
  VowDuplicateError,
  VowPersistenceError,
} from "@/lib/vows/create-vow";
import { getTokenVows } from "@/lib/vows/get-token-vows";
import {
  sanitizeCallReason,
  sanitizeUsername,
  sanitizeWalletAddress,
} from "@/lib/vows/sanitize";
import { VOW_CALL_TYPES } from "@/lib/vows/constants";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import type { CreateVowInput, TokenData, VowsResponse } from "@/lib/types";

const CALL_TYPE_SET = new Set<string>(VOW_CALL_TYPES);

function isTokenData(value: unknown): value is TokenData {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.tokenAddress === "string" && typeof v.chain === "string";
}

export async function GET(request: NextRequest) {
  const tokenAddress = request.nextUrl.searchParams
    .get("tokenAddress")
    ?.trim();

  if (!tokenAddress || !isValidSolanaAddress(tokenAddress)) {
    return NextResponse.json<VowsResponse>(
      { success: false, error: "Valid tokenAddress is required" },
      { status: 400 }
    );
  }

  try {
    const vows = await getTokenVows(tokenAddress);

    return NextResponse.json<VowsResponse>({
      success: true,
      vows,
    });
  } catch (error) {
    console.error(
      "[api/vows GET] Error:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json<VowsResponse>({
      success: true,
      vows: [],
    });
  }
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json<VowsResponse>(
      {
        success: false,
        error:
          "Vow persistence is offline. The Temple cannot record Vows right now.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    const tokenAddress =
      typeof body?.tokenAddress === "string"
        ? body.tokenAddress.trim()
        : "";

    if (!tokenAddress || !isValidSolanaAddress(tokenAddress)) {
      return NextResponse.json<VowsResponse>(
        { success: false, error: "Valid tokenAddress is required" },
        { status: 400 }
      );
    }

    const callType =
      typeof body?.callType === "string" ? body.callType.trim() : "";

    if (!CALL_TYPE_SET.has(callType)) {
      return NextResponse.json<VowsResponse>(
        { success: false, error: "Invalid call type" },
        { status: 400 }
      );
    }

    if (!isTokenData(body?.tokenData)) {
      return NextResponse.json<VowsResponse>(
        { success: false, error: "tokenData is required" },
        { status: 400 }
      );
    }

    const monkVerdictAtCall =
      typeof body?.monkVerdictAtCall === "string"
        ? body.monkVerdictAtCall.trim()
        : "";

    if (!monkVerdictAtCall) {
      return NextResponse.json<VowsResponse>(
        { success: false, error: "monkVerdictAtCall is required" },
        { status: 400 }
      );
    }

    const username = sanitizeUsername(body?.username);
    const walletAddress = sanitizeWalletAddress(body?.walletAddress);

    if (
      walletAddress &&
      !isValidSolanaAddress(walletAddress)
    ) {
      return NextResponse.json<VowsResponse>(
        { success: false, error: "Invalid wallet address" },
        { status: 400 }
      );
    }

    const callReason = sanitizeCallReason(body?.callReason);

    const scanId =
      typeof body?.scanId === "string" && body.scanId.trim()
        ? body.scanId.trim()
        : null;

    const input: CreateVowInput = {
      scanId,
      tokenAddress,
      username,
      walletAddress,
      callType,
      callReason,
      monkVerdictAtCall,
      tokenData: body.tokenData,
    };

    const vow = await createVow(input);

    return NextResponse.json<VowsResponse>({
      success: true,
      vow,
    });
  } catch (error) {
    if (error instanceof VowDuplicateError) {
      return NextResponse.json<VowsResponse>(
        { success: false, error: error.message },
        { status: 429 }
      );
    }

    if (error instanceof VowPersistenceError) {
      return NextResponse.json<VowsResponse>(
        { success: false, error: error.message },
        { status: 503 }
      );
    }

    console.error(
      "[api/vows POST] Error:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json<VowsResponse>(
      {
        success: false,
        error: "The Temple could not record your Vow right now.",
      },
      { status: 500 }
    );
  }
}
