import type { AgentOutput } from "@/lib/monk/schemas";
import { Badge } from "@/components/ui/Badge";
import { MonkQuote } from "@/components/ui/MonkQuote";
import { RiskMeter } from "@/components/ui/RiskMeter";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AGENT_STYLES } from "@/components/council-styles";

const AGENT_ICONS: Record<string, string> = {
  "Dev Detective": "🕵️",
  "Wallet Monk": "⛓️",
  "Narrative Oracle": "👁️",
};

interface AgentCardProps {
  agent: AgentOutput;
}

function AgentCard({ agent }: AgentCardProps) {
  const style = AGENT_STYLES[agent.agent] ?? {
    accent: "text-monk-text",
    border: "border-temple-border",
  };
  const icon = AGENT_ICONS[agent.agent] ?? "🧘";

  const riskVariant =
    agent.risk_level === "high"
      ? "red"
      : agent.risk_level === "medium"
        ? "orange"
        : agent.risk_level === "low"
          ? "green"
          : "muted";

  const confVariant =
    agent.confidence === "high"
      ? "green"
      : agent.confidence === "medium"
        ? "orange"
        : "muted";

  return (
    <article
      className={`rounded-2xl border ${style.border} bg-temple-bg/40 p-5 sm:p-6`}
    >
      <div className="flex gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${style.border} bg-temple-elevated/80 text-2xl`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className={`text-lg font-semibold ${style.accent}`}>
                {agent.agent}
              </h3>
              <p className="text-sm text-monk-muted">{agent.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant={riskVariant}>{agent.risk_level} risk</Badge>
              <Badge variant={confVariant}>{agent.confidence} conf.</Badge>
            </div>
          </div>
          <RiskMeter level={agent.risk_level} className="mt-4" />
        </div>
      </div>

      <ul className="mt-5 space-y-2.5">
        {agent.evidence.slice(0, 3).map((item, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-sm leading-relaxed text-monk-text/90"
          >
            <span className="mt-0.5 shrink-0 text-solana-green">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {agent.warnings.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-temple-border/40 pt-4">
          {agent.warnings.slice(0, 2).map((warning, i) => (
            <li
              key={i}
              className="text-sm leading-relaxed text-candle-glow/90"
            >
              ⚠ {warning}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5">
        <MonkQuote quote={agent.monk_line} />
      </div>
    </article>
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
    <section>
      <SectionHeader
        eyebrow="Supporting evidence"
        title="Council Debate"
        subtitle="Three agents read the token. The Final Monk listened."
      />
      <div className="space-y-5">
        <AgentCard agent={devDetective} />
        <AgentCard agent={walletMonk} />
        <AgentCard agent={narrativeOracle} />
      </div>
    </section>
  );
}
