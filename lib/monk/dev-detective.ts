import type { TokenData } from "@/lib/types";
import {
  buildAgentPayload,
  enforceAgentDataCoverage,
  runStructuredAgent,
} from "@/lib/monk/client";
import { buildPreAnalysis } from "@/lib/monk/pre-analysis";
import { DEV_DETECTIVE_SYSTEM } from "@/lib/monk/prompts";
import {
  devDetectiveSchema,
  type DevDetectiveOutput,
} from "@/lib/monk/schemas";

export async function runDevDetective(
  tokenData: TokenData
): Promise<DevDetectiveOutput> {
  const payload = buildAgentPayload(tokenData);
  const preAnalysis = buildPreAnalysis(tokenData);

  const result = await runStructuredAgent(
    devDetectiveSchema,
    "dev_detective",
    DEV_DETECTIVE_SYSTEM,
    JSON.stringify(payload, null, 2)
  );

  return enforceAgentDataCoverage(result, preAnalysis);
}
