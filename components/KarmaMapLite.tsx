const RISK_CATEGORIES = [
  {
    label: "Dev Risk",
    level: "unknown",
    description: "Past lives not yet read",
  },
  {
    label: "Liquidity Risk",
    level: "unknown",
    description: "Pool depth pending analysis",
  },
  {
    label: "Holder Risk",
    level: "unknown",
    description: "Wallet karma unavailable",
  },
  {
    label: "Narrative Risk",
    level: "unknown",
    description: "Illusion not yet judged",
  },
];

function riskColor(level: string) {
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

export function KarmaMapLite() {
  return (
    <section className="rounded-2xl border border-temple-border bg-temple-surface/50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-monk-text">Karma Map Lite</h2>
          <p className="mt-1 text-sm text-monk-muted">
            Visual risk panel. Full wallet clustering comes later.
          </p>
        </div>
        <span className="rounded-full border border-solana-green/30 bg-solana-green/10 px-3 py-1 text-xs text-solana-green">
          Lite
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {RISK_CATEGORIES.map((risk) => (
          <div
            key={risk.label}
            className="rounded-xl border border-temple-border/80 bg-temple-bg/40 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-monk-text">
                {risk.label}
              </span>
              <span
                className={`rounded-full border px-2 py-0.5 text-xs capitalize ${riskColor(risk.level)}`}
              >
                {risk.level}
              </span>
            </div>
            <p className="mt-2 text-xs text-monk-muted">{risk.description}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-temple-elevated">
              <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-solana-purple/40 to-monk-muted/20" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
