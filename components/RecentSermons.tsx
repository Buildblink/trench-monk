const PLACEHOLDER_SERMONS = [
  {
    symbol: "PEPE2",
    verdict: "False Temple",
    quote: "The candle is green. Your mind is not.",
    age: "2h ago",
  },
  {
    symbol: "MOON",
    verdict: "Dev Karma",
    quote: "The dev did not disappear. He simply achieved exit.",
    age: "5h ago",
  },
  {
    symbol: "GHOST",
    verdict: "Meditate First",
    quote: "The liquidity is thin. Your hope is thick.",
    age: "12h ago",
  },
];

export function RecentSermons() {
  return (
    <section id="recent-sermons" className="scroll-mt-24">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-monk-text">Recent Sermons</h2>
        <p className="mt-1 text-sm text-monk-muted">
          Past readings from the Monk Council. Wisdom accumulates.
        </p>
      </div>

      <div className="space-y-3">
        {PLACEHOLDER_SERMONS.map((sermon) => (
          <div
            key={sermon.symbol}
            className="candle-accent rounded-r-xl border border-temple-border border-l-0 bg-temple-surface/40 px-5 py-4 transition-colors hover:bg-temple-surface/70"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-semibold text-solana-purple">
                  ${sermon.symbol}
                </span>
                <span className="rounded-md bg-temple-elevated px-2 py-0.5 text-xs text-candle-glow">
                  {sermon.verdict}
                </span>
              </div>
              <span className="text-xs text-monk-muted">{sermon.age}</span>
            </div>
            <p className="mt-2 text-sm italic text-monk-muted/90">
              &ldquo;{sermon.quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
