export function MakeVowButton() {
  return (
    <div className="rounded-2xl border border-solana-green/30 bg-gradient-to-r from-solana-green/5 to-solana-purple/5 p-6 text-center">
      <p className="mb-4 text-sm text-monk-muted">
        Agree or disagree with the Monk. Public Vows resolve after 1H / 3H / 24H.
      </p>
      <button
        type="button"
        disabled
        className="cursor-not-allowed rounded-xl border border-solana-green/40 bg-solana-green/10 px-10 py-3.5 text-sm font-semibold text-solana-green opacity-70"
        title="Available in Phase 4"
      >
        Make Your Vow
      </button>
      <p className="mt-3 text-xs text-monk-muted/60">
        Wallet connect & Vow submission — Phase 4
      </p>
    </div>
  );
}
