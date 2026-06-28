import type { TokenData } from "@/lib/types";
import { runDevDetective } from "@/lib/monk/dev-detective";
import { runWalletMonk } from "@/lib/monk/wallet-monk";
import { runNarrativeOracle } from "@/lib/monk/narrative-oracle";
import { runFinalMonk } from "@/lib/monk/final-monk";
import { buildDataCoverage } from "@/lib/monk/pre-analysis";
import type { CouncilResult } from "@/lib/monk/schemas";

export async function runCouncil(tokenData: TokenData): Promise<CouncilResult> {
  const dataCoverage = buildDataCoverage(tokenData);

  const [devDetective, walletMonk, narrativeOracle] = await Promise.all([
    runDevDetective(tokenData),
    runWalletMonk(tokenData),
    runNarrativeOracle(tokenData),
  ]);

  const finalMonk = await runFinalMonk(tokenData, {
    devDetective,
    walletMonk,
    narrativeOracle,
  });

  return {
    devDetective,
    walletMonk,
    narrativeOracle,
    finalMonk,
    dataCoverage: {
      available: dataCoverage.available,
      missing: dataCoverage.missing,
    },
  };
}
