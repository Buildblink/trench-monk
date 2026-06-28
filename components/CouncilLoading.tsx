interface CouncilLoadingProps {
  message?: string;
}

export function CouncilLoading({
  message = "The Monk Council is reading the token...",
}: CouncilLoadingProps) {
  return (
    <div className="rounded-2xl border border-solana-purple/25 bg-temple-surface/40 px-6 py-10 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-candle-orange/40 bg-candle-orange/10 text-2xl animate-pulse">
        🧘
      </div>
      <p className="text-base text-monk-muted">{message}</p>
      <p className="mt-2 text-xs text-monk-muted/60">
        Dev Detective · Wallet Monk · Narrative Oracle · Final Monk
      </p>
      <div className="mx-auto mt-6 h-1 max-w-xs overflow-hidden rounded-full bg-temple-elevated">
        <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-solana-purple to-solana-green" />
      </div>
    </div>
  );
}
