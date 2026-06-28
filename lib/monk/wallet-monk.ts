import type { TokenData } from "@/lib/types";
import {
  runStructuredAgent,
  serializeTokenDataForAgents,
} from "@/lib/monk/client";
import { WALLET_MONK_SYSTEM } from "@/lib/monk/prompts";
import {
  walletMonkSchema,
  type WalletMonkOutput,
} from "@/lib/monk/schemas";

export async function runWalletMonk(
  tokenData: TokenData
): Promise<WalletMonkOutput> {
  const payload = serializeTokenDataForAgents(tokenData);

  return runStructuredAgent(
    walletMonkSchema,
    "wallet_monk",
    WALLET_MONK_SYSTEM,
    JSON.stringify(payload, null, 2)
  );
}
