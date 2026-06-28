import { SectionHeader } from "@/components/ui/SectionHeader";

export function MakeVowButton() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-dashed border-solana-green/35 bg-gradient-to-br from-solana-green/5 via-temple-surface/40 to-solana-purple/5 px-6 py-8 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-solana-green/5 via-transparent to-transparent" />
      <SectionHeader
        align="center"
        eyebrow="Coming in Phase 4"
        title="Make Your Vow"
        subtitle="Agree or disagree with the Monk. Public Vows resolve after 1H / 3H / 24H."
      />
      <button
        type="button"
        disabled
        className="relative cursor-not-allowed rounded-xl border border-solana-green/50 bg-solana-green/10 px-12 py-4 text-base font-semibold text-solana-green/80 shadow-lg shadow-solana-green/5"
        title="Available in Phase 4"
      >
        Make Your Vow
      </button>
      <p className="relative mt-4 text-xs text-monk-muted/70">
        Wallet connect &amp; vow submission — Phase 4
      </p>
    </section>
  );
}
