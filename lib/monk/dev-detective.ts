import type { TokenData } from "@/lib/types";
import {
  runStructuredAgent,
  serializeTokenDataForAgents,
} from "@/lib/monk/client";
import { DEV_DETECTIVE_SYSTEM } from "@/lib/monk/prompts";
import {
  devDetectiveSchema,
  type DevDetectiveOutput,
} from "@/lib/monk/schemas";

export async function runDevDetective(
  tokenData: TokenData
): Promise<DevDetectiveOutput> {
  const payload = serializeTokenDataForAgents(tokenData);

  return runStructuredAgent(
    devDetectiveSchema,
    "dev_detective",
    DEV_DETECTIVE_SYSTEM,
    JSON.stringify(payload, null, 2)
  );
}
