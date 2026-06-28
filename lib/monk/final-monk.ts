import type { TokenData } from "@/lib/types";
import {
  runStructuredAgent,
  serializeTokenDataForAgents,
} from "@/lib/monk/client";
import { FINAL_MONK_SYSTEM } from "@/lib/monk/prompts";
import type {
  DevDetectiveOutput,
  WalletMonkOutput,
  NarrativeOracleOutput,
  FinalMonkOutput,
} from "@/lib/monk/schemas";
import { finalMonkSchema } from "@/lib/monk/schemas";

interface AgentInputs {
  devDetective: DevDetectiveOutput;
  walletMonk: WalletMonkOutput;
  narrativeOracle: NarrativeOracleOutput;
}

export async function runFinalMonk(
  tokenData: TokenData,
  agents: AgentInputs
): Promise<FinalMonkOutput> {
  const payload = {
    tokenData: serializeTokenDataForAgents(tokenData),
    council: agents,
  };

  return runStructuredAgent(
    finalMonkSchema,
    "final_monk",
    FINAL_MONK_SYSTEM,
    JSON.stringify(payload, null, 2)
  );
}
