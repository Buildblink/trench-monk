interface CouncilLoadingProps {
  message?: string;
}

export function CouncilLoading({
  message = "The Monk Council is reading the token...",
}: CouncilLoadingProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-solana-purple/30 bg-temple-surface/50 p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-solana-purple/40 bg-solana-purple/10">
          <span className="animate-pulse text-xl">🧘</span>
        </div>
        <p className="text-sm text-monk-muted">{message}</p>
        <p className="mt-2 text-xs text-monk-muted/60">
          Dev Detective · Wallet Monk · Narrative Oracle · Final Monk
        </p>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-36 animate-pulse rounded-xl border border-temple-border bg-temple-surface/40"
          />
        ))}
      </div>
    </div>
  );
}
