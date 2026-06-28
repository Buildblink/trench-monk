interface CouncilErrorProps {
  error: string;
  onRetry?: () => void;
}

export function CouncilError({ error, onRetry }: CouncilErrorProps) {
  return (
    <div className="rounded-2xl border border-candle-orange/30 bg-candle-orange/5 p-6">
      <h3 className="text-sm font-semibold text-candle-glow">
        Monk Council unavailable
      </h3>
      <p className="mt-2 text-sm text-monk-muted">{error}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg border border-solana-purple/40 bg-solana-purple/10 px-4 py-2 text-sm text-solana-purple transition-colors hover:bg-solana-purple/20"
        >
          Summon Council again
        </button>
      )}
    </div>
  );
}
