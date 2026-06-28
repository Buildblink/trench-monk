import type { TokenData } from "@/lib/types";
import {
  runStructuredAgent,
  serializeTokenDataForAgents,
} from "@/lib/monk/client";
import { NARRATIVE_ORACLE_SYSTEM } from "@/lib/monk/prompts";
import {
  narrativeOracleSchema,
  type NarrativeOracleOutput,
} from "@/lib/monk/schemas";

export async function runNarrativeOracle(
  tokenData: TokenData
): Promise<NarrativeOracleOutput> {
  const payload = serializeTokenDataForAgents(tokenData);

  return runStructuredAgent(
    narrativeOracleSchema,
    "narrative_oracle",
    NARRATIVE_ORACLE_SYSTEM,
    JSON.stringify(payload, null, 2)
  );
}
