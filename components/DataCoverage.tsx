import type { AgentOutput } from "@/lib/monk/schemas";
import { formatTierLabel } from "@/lib/format";

interface DataCoverageProps {
  available: string[];
  missing: string[];
  contextTiers?: {
    size_tier: string;
    liquidity_tier: string;
    pair_age_tier: string;
  };
  pairLiquidityDisclaimer?: string;
  agents?: {
    devDetective: AgentOutput;
    walletMonk: AgentOutput;
    narrativeOracle: AgentOutput;
  };
}

export function DataCoverage({
  available,
  missing,
  contextTiers,
  pairLiquidityDisclaimer,
  agents,
}: DataCoverageProps) {
  return (
    <section className="rounded-2xl border border-temple-border bg-temple-surface/40 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-monk-text">Data Coverage</h2>
        <p className="mt-1 text-sm text-monk-muted">
          The Monk only speaks from available data. Unknowns are not invented.
        </p>
        {pairLiquidityDisclaimer && (
          <p className="mt-2 rounded-lg border border-temple-border/60 bg-temple-bg/50 px-3 py-2 text-xs leading-relaxed text-monk-muted">
            {pairLiquidityDisclaimer}
          </p>
        )}
      </div>

      {contextTiers && (
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-solana-purple/30 bg-solana-purple/10 px-3 py-1 text-xs text-solana-purple">
            Size: {formatTierLabel(contextTiers.size_tier)}
          </span>
          <span className="rounded-full border border-solana-green/30 bg-solana-green/10 px-3 py-1 text-xs text-solana-green">
            Selected pair liquidity: {formatTierLabel(contextTiers.liquidity_tier)}
          </span>
          <span className="rounded-full border border-candle-orange/30 bg-candle-orange/10 px-3 py-1 text-xs text-candle-glow">
            Pair age: {formatTierLabel(contextTiers.pair_age_tier)}
          </span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-solana-green/25 bg-solana-green/5 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-solana-green">
            Available from DexScreener
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {available.map((item) => (
              <li
                key={item}
                className="rounded-full border border-solana-green/30 bg-temple-bg/60 px-2.5 py-0.5 text-xs text-monk-text"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-temple-border bg-temple-elevated/30 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-monk-muted">
            Not in current data
          </h3>
          <p className="mt-1 text-xs text-monk-muted/70">
            Absence here is normal — the Council will not pretend to see these.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {missing.map((item) => (
              <li
                key={item}
                className="rounded-full border border-temple-border bg-temple-bg/60 px-2.5 py-0.5 text-xs text-monk-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {agents && (
        <div className="mt-6 space-y-3 border-t border-temple-border/50 pt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-monk-muted">
            Per-agent coverage
          </h3>
          {[agents.devDetective, agents.walletMonk, agents.narrativeOracle].map(
            (agent) => (
              <div
                key={agent.agent}
                className="rounded-lg border border-temple-border/60 bg-temple-bg/40 px-4 py-3"
              >
                <div className="text-sm font-medium text-monk-text">
                  {agent.agent}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {agent.data_available.slice(0, 6).map((d) => (
                    <span
                      key={`${agent.agent}-av-${d}`}
                      className="text-xs text-solana-green"
                    >
                      ✓ {d}
                    </span>
                  ))}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {agent.data_missing.slice(0, 5).map((d) => (
                    <span
                      key={`${agent.agent}-miss-${d}`}
                      className="text-xs text-monk-muted"
                    >
                      ○ {d}
                    </span>
                  ))}
                  {agent.data_missing.length > 5 && (
                    <span className="text-xs text-monk-muted/60">
                      +{agent.data_missing.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}
