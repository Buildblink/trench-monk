import type { TokenData } from "@/lib/types";
import {
  buildAgentPayload,
  enforceAgentDataCoverage,
  runStructuredAgent,
} from "@/lib/monk/client";
import { buildPreAnalysis } from "@/lib/monk/pre-analysis";
import { WALLET_MONK_SYSTEM } from "@/lib/monk/prompts";
import {
  walletMonkSchema,
  type WalletMonkOutput,
} from "@/lib/monk/schemas";

export async function runWalletMonk(
  tokenData: TokenData
): Promise<WalletMonkOutput> {
  const payload = buildAgentPayload(tokenData);
  const preAnalysis = buildPreAnalysis(tokenData);

  const result = await runStructuredAgent(
    walletMonkSchema,
    "wallet_monk",
    WALLET_MONK_SYSTEM,
    JSON.stringify(payload, null, 2)
  );

  return enforceAgentDataCoverage(result, preAnalysis);
}
