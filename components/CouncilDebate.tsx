import type { AgentOutput } from "@/lib/monk/schemas";
import {
  AGENT_STYLES,
  confidenceBadgeClass,
  riskBadgeClass,
  riskBarColor,
  riskBarWidth,
} from "@/components/council-styles";

interface AgentCardProps {
  agent: AgentOutput;
}

export function AgentCard({ agent }: AgentCardProps) {
  const style = AGENT_STYLES[agent.agent] ?? {
    accent: "text-monk-text",
    border: "border-temple-border",
  };

  return (
    <div className={`rounded-xl border ${style.border} bg-temple-bg/50 p-4`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className={`font-semibold ${style.accent}`}>{agent.agent}</h3>
          <p className="text-xs text-monk-muted">{agent.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 text-xs capitalize ${riskBadgeClass(agent.risk_level)}`}
          >
            {agent.risk_level} risk
          </span>
          <span
            className={`rounded-full border px-2 py-0.5 text-xs capitalize ${confidenceBadgeClass(agent.confidence)}`}
          >
            {agent.confidence} confidence
          </span>
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-temple-elevated">
        <div
          className={`h-full rounded-full transition-all ${riskBarWidth(agent.risk_level)} ${riskBarColor(agent.risk_level)}`}
        />
      </div>

      <div className="mt-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-monk-muted">
          Evidence
        </div>
        <ul className="mt-2 space-y-1.5">
          {agent.evidence.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-monk-text/90">
              <span className="text-solana-green shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-4 space-y-2">
        {agent.observations.map((obs, i) => (
          <li key={i} className="flex gap-2 text-sm text-monk-text/90">
            <span className="text-monk-muted">•</span>
            <span>{obs}</span>
          </li>
        ))}
      </ul>

      {agent.warnings.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-t border-temple-border/50 pt-3">
          {agent.warnings.map((warning, i) => (
            <li key={i} className="text-sm text-candle-glow/90">
              ⚠ {warning}
            </li>
          ))}
        </ul>
      )}

      {agent.data_missing.length > 0 && (
        <div className="mt-3 rounded-lg border border-temple-border/50 bg-temple-elevated/40 px-3 py-2">
          <div className="text-xs text-monk-muted">Could not assess</div>
          <p className="mt-1 text-xs text-monk-muted/80">
            {agent.data_missing.slice(0, 4).join(" · ")}
            {agent.data_missing.length > 4 &&
              ` · +${agent.data_missing.length - 4} more`}
          </p>
        </div>
      )}

      <blockquote className="mt-4 border-l-2 border-candle-orange/40 pl-3 text-sm italic text-monk-muted">
        &ldquo;{agent.monk_line}&rdquo;
      </blockquote>
    </div>
  );
}

interface CouncilDebateProps {
  devDetective: AgentOutput;
  walletMonk: AgentOutput;
  narrativeOracle: AgentOutput;
}

export function CouncilDebate({
  devDetective,
  walletMonk,
  narrativeOracle,
}: CouncilDebateProps) {
  return (
    <section className="rounded-2xl border border-temple-border bg-temple-surface/50 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-monk-text">Council Debate</h2>
        <p className="mt-1 text-sm text-monk-muted">
          Three agents read the token. The Final Monk listens.
        </p>
      </div>

      <div className="space-y-4">
        <AgentCard agent={devDetective} />
        <AgentCard agent={walletMonk} />
        <AgentCard agent={narrativeOracle} />
      </div>
    </section>
  );
}
