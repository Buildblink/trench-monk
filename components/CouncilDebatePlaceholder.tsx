const COUNCIL_MEMBERS = [
  {
    name: "Dev Detective",
    subtitle: "Reader of past lives",
    status: "Awaiting scan",
    color: "solana-purple",
  },
  {
    name: "Wallet Monk",
    subtitle: "Keeper of on-chain karma",
    status: "Awaiting scan",
    color: "solana-green",
  },
  {
    name: "Narrative Oracle",
    subtitle: "Watcher of illusion",
    status: "Awaiting scan",
    color: "candle-orange",
  },
];

export function CouncilDebatePlaceholder() {
  return (
    <section className="rounded-2xl border border-temple-border bg-temple-surface/50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-monk-text">
            Council Debate
          </h2>
          <p className="mt-1 text-sm text-monk-muted">
            Three agents read the token. The Final Monk listens.
          </p>
        </div>
        <span className="rounded-full border border-solana-purple/30 bg-solana-purple/10 px-3 py-1 text-xs text-solana-purple">
          Phase 2
        </span>
      </div>

      <div className="space-y-4">
        {COUNCIL_MEMBERS.map((member) => (
          <div
            key={member.name}
            className="rounded-xl border border-temple-border/80 bg-temple-bg/50 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className={`font-semibold ${
                    member.color === "solana-purple"
                      ? "text-solana-purple"
                      : member.color === "solana-green"
                        ? "text-solana-green"
                        : "text-candle-glow"
                  }`}
                >
                  {member.name}
                </h3>
                <p className="text-xs text-monk-muted">{member.subtitle}</p>
              </div>
              <span className="text-xs text-monk-muted/60">{member.status}</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-3 w-3/4 animate-pulse rounded bg-temple-elevated" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-temple-elevated" />
            </div>
            <p className="mt-3 text-sm italic text-monk-muted/50">
              AI analysis will appear here in Phase 2.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
