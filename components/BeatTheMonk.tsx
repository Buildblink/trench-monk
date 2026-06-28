const PLACEHOLDER_PROOFS = [
  {
    user: "trench_ape_42",
    token: "SOLCAT",
    call: "Exit Ceremony",
    result: "Beat the Monk",
    wisdom: "+120",
  },
  {
    user: "karma_seeker",
    token: "RUGME",
    call: "Dead Candle",
    result: "Monk was right",
    wisdom: "+80",
  },
];

export function BeatTheMonk() {
  return (
    <section id="beat-the-monk" className="scroll-mt-24">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-monk-text">Beat the Monk</h2>
        <p className="mt-1 text-sm text-monk-muted">
          Public Vows resolved. Correct hard calls earn Wisdom.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PLACEHOLDER_PROOFS.map((proof) => (
          <div
            key={proof.user}
            className="rounded-xl border border-temple-border bg-gradient-to-br from-temple-surface/80 to-temple-elevated/40 p-5 glow-green"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-solana-green">
                {proof.result}
              </span>
              <span className="font-mono text-sm font-semibold text-candle-glow">
                {proof.wisdom} Wisdom
              </span>
            </div>
            <div className="mt-3">
              <p className="text-sm text-monk-text">
                <span className="text-monk-muted">@{proof.user}</span> called{" "}
                <span className="font-semibold text-solana-purple">
                  {proof.call}
                </span>{" "}
                on ${proof.token}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-1 flex-1 rounded-full bg-solana-green/60" />
              <div className="h-1 w-8 rounded-full bg-solana-purple/60" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
