const PLACEHOLDER_SCANS = [
  {
    symbol: "BONK",
    verdict: "Scalp Only",
    status: "pending",
    timer: "1H",
  },
  {
    symbol: "WIF",
    verdict: "Hungry Ghosts",
    status: "resolved",
    outcome: "Monk was right",
  },
  {
    symbol: "POPCAT",
    verdict: "Do Not Ape",
    status: "pending",
    timer: "3H",
  },
];

export function MonkLive() {
  return (
    <section id="monk-live" className="scroll-mt-24">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold text-monk-text">Monk Live</h2>
          <p className="mt-1 text-sm text-monk-muted">
            Auto-scanned tokens from the trenches. The Council watches.
          </p>
        </div>
        <span className="flex items-center gap-2 text-xs text-solana-green">
          <span className="h-2 w-2 animate-pulse rounded-full bg-solana-green" />
          Live feed · coming soon
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_SCANS.map((scan) => (
          <div
            key={scan.symbol}
            className="group rounded-xl border border-temple-border bg-temple-surface/60 p-4 transition-colors hover:border-solana-purple/40"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-solana-green">
                ${scan.symbol}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  scan.status === "pending"
                    ? "bg-candle-orange/15 text-candle-glow"
                    : "bg-solana-purple/15 text-solana-purple"
                }`}
              >
                {scan.status === "pending" ? scan.timer : scan.outcome}
              </span>
            </div>
            <p className="mt-2 text-sm text-monk-muted">Verdict: {scan.verdict}</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-temple-elevated">
              <div
                className={`h-full rounded-full ${
                  scan.status === "pending"
                    ? "w-2/3 bg-gradient-to-r from-candle-orange to-candle-glow animate-pulse-glow"
                    : "w-full bg-gradient-to-r from-solana-purple to-solana-green"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
