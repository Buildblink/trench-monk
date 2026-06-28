import type { TokenData } from "@/lib/types";
import {
  buildAgentPayload,
  enforceAgentDataCoverage,
  runStructuredAgent,
} from "@/lib/monk/client";
import { buildPreAnalysis } from "@/lib/monk/pre-analysis";
import { NARRATIVE_ORACLE_SYSTEM } from "@/lib/monk/prompts";
import {
  narrativeOracleSchema,
  type NarrativeOracleOutput,
} from "@/lib/monk/schemas";

export async function runNarrativeOracle(
  tokenData: TokenData
): Promise<NarrativeOracleOutput> {
  const payload = buildAgentPayload(tokenData);
  const preAnalysis = buildPreAnalysis(tokenData);

  const result = await runStructuredAgent(
    narrativeOracleSchema,
    "narrative_oracle",
    NARRATIVE_ORACLE_SYSTEM,
    JSON.stringify(payload, null, 2)
  );

  return enforceAgentDataCoverage(result, preAnalysis);
}
