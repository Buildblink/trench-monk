import type { CouncilResult, RiskLevel } from "@/lib/monk/schemas";

interface KarmaMapLiteProps {
  council?: CouncilResult | null;
}

function riskColor(level: RiskLevel) {
  switch (level) {
    case "low":
      return "bg-solana-green/20 text-solana-green border-solana-green/30";
    case "medium":
      return "bg-candle-orange/20 text-candle-glow border-candle-orange/30";
    case "high":
      return "bg-red-500/20 text-red-400 border-red-500/30";
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

function riskBarGradient(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "from-solana-green/60 to-solana-green/30";
    case "medium":
      return "from-candle-orange/60 to-candle-glow/30";
    case "high":
      return "from-red-500/60 to-red-400/30";
    default:
      return "from-solana-purple/40 to-monk-muted/20";
  }
}

export function KarmaMapLite({ council }: KarmaMapLiteProps) {
  const categories = council
    ? [
        {
          label: "Dev Risk",
          level: council.devDetective.risk_level,
          description: council.devDetective.monk_line,
          confidence: council.devDetective.confidence,
        },
        {
          label: "Liquidity Risk",
          level: council.walletMonk.risk_level,
          description: council.walletMonk.observations[0] ?? "Pool karma read.",
          confidence: council.walletMonk.confidence,
        },
        {
          label: "Holder Risk",
          level: "unknown" as RiskLevel,
          description:
            "Top holders and wallet clustering unknown from current data.",
          confidence: "low" as const,
        },
        {
          label: "Narrative Risk",
          level: council.narrativeOracle.risk_level,
          description: council.narrativeOracle.monk_line,
          confidence: council.narrativeOracle.confidence,
        },
      ]
    : [
        {
          label: "Dev Risk",
          level: "unknown" as RiskLevel,
          description: "Awaiting Council reading",
          confidence: null,
        },
        {
          label: "Liquidity Risk",
          level: "unknown" as RiskLevel,
          description: "Awaiting Council reading",
          confidence: null,
        },
        {
          label: "Holder Risk",
          level: "unknown" as RiskLevel,
          description: "Wallet karma unavailable",
          confidence: null,
        },
        {
          label: "Narrative Risk",
          level: "unknown" as RiskLevel,
          description: "Awaiting Council reading",
          confidence: null,
        },
      ];

  return (
    <section className="rounded-2xl border border-temple-border bg-temple-surface/50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-monk-text">Karma Map Lite</h2>
          <p className="mt-1 text-sm text-monk-muted">
            Visual risk panel from Council readings. Full wallet clustering
            comes later.
          </p>
        </div>
        <span className="rounded-full border border-solana-green/30 bg-solana-green/10 px-3 py-1 text-xs text-solana-green">
          Lite
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((risk) => (
          <div
            key={risk.label}
            className="rounded-xl border border-temple-border/80 bg-temple-bg/40 p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-monk-text">
                {risk.label}
              </span>
              <div className="flex items-center gap-2">
                {risk.confidence && (
                  <span className="text-xs capitalize text-monk-muted/70">
                    {risk.confidence} conf.
                  </span>
                )}
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs capitalize ${riskColor(risk.level)}`}
                >
                  {risk.level}
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-monk-muted line-clamp-2">
              {risk.description}
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-temple-elevated">
              <div
                className={`h-full rounded-full bg-gradient-to-r transition-all ${riskBarWidth(risk.level)} ${riskBarGradient(risk.level)}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
