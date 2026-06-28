export function MonkVerdictPlaceholder() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-candle-orange/30 bg-gradient-to-br from-temple-surface via-temple-elevated/50 to-temple-surface p-6 glow-candle">
      <div className="absolute right-4 top-4 text-4xl opacity-20 animate-float">
        🧘
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-candle-glow">
            Final Monk Verdict
          </h2>
          <p className="text-xs text-monk-muted">
            The one who does not ape
          </p>
        </div>
        <span className="rounded-full border border-candle-orange/30 bg-candle-orange/10 px-3 py-1 text-xs text-candle-glow">
          Phase 2
        </span>
      </div>

      <div className="rounded-xl border border-temple-border/60 bg-temple-bg/60 p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-monk-muted/30">
            <span className="font-mono text-xl text-monk-muted/40">—</span>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-monk-muted">
              Clarity Score
            </div>
            <div className="text-sm text-monk-muted/60">Pending AI scan</div>
          </div>
        </div>

        <blockquote className="mt-5 border-l-2 border-candle-orange/50 pl-4 text-sm italic text-monk-muted/70">
          &ldquo;All candles are impermanent. The Council has not yet spoken on
          this token.&rdquo;
        </blockquote>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-temple-elevated/50 p-3">
            <div className="text-xs text-monk-muted">Main Danger</div>
            <div className="mt-1 h-4 w-2/3 animate-pulse rounded bg-temple-border" />
          </div>
          <div className="rounded-lg bg-temple-elevated/50 p-3">
            <div className="text-xs text-monk-muted">What to Watch</div>
            <div className="mt-1 h-4 w-1/2 animate-pulse rounded bg-temple-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
