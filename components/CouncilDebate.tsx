import type { AgentOutput, RiskLevel } from "@/lib/monk/schemas";

const AGENT_STYLES: Record<
  string,
  { accent: string; border: string }
> = {
  "Dev Detective": {
    accent: "text-solana-purple",
    border: "border-solana-purple/30",
  },
  "Wallet Monk": {
    accent: "text-solana-green",
    border: "border-solana-green/30",
  },
  "Narrative Oracle": {
    accent: "text-candle-glow",
    border: "border-candle-orange/30",
  },
};

function riskBadgeClass(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "bg-solana-green/15 text-solana-green border-solana-green/30";
    case "medium":
      return "bg-candle-orange/15 text-candle-glow border-candle-orange/30";
    case "high":
      return "bg-red-500/15 text-red-400 border-red-500/30";
    default:
      return "bg-temple-elevated text-monk-muted border-temple-border";
  }
}

function riskBarWidth(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "w-1/4";
    case "medium":
      return "w-2/3";
    case "high":
      return "w-full";
    default:
      return "w-1/4";
  }
}

function riskBarColor(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "bg-solana-green";
    case "medium":
      return "bg-candle-orange";
    case "high":
      return "bg-red-500";
    default:
      return "bg-monk-muted/30";
  }
}

interface AgentCardProps {
  agent: AgentOutput;
}

export function AgentCard({ agent }: AgentCardProps) {
  const style = AGENT_STYLES[agent.agent] ?? {
    accent: "text-monk-text",
    border: "border-temple-border",
  };

  return (
    <div
      className={`rounded-xl border ${style.border} bg-temple-bg/50 p-4`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`font-semibold ${style.accent}`}>{agent.agent}</h3>
          <p className="text-xs text-monk-muted">{agent.subtitle}</p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs capitalize ${riskBadgeClass(agent.risk_level)}`}
        >
          {agent.risk_level} risk
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-temple-elevated">
        <div
          className={`h-full rounded-full transition-all ${riskBarWidth(agent.risk_level)} ${riskBarColor(agent.risk_level)}`}
        />
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
