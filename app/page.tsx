import { TokenInput } from "@/components/TokenInput";
import { TempleFeatures } from "@/components/TempleFeatures";
import { MonkLive } from "@/components/MonkLive";
import { RecentSermons } from "@/components/RecentSermons";
import { BeatTheMonk } from "@/components/BeatTheMonk";
import { HowItWorks } from "@/components/HowItWorks";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl overflow-x-hidden px-4 py-10 sm:px-6 sm:py-16">
      {/* Hero */}
      <section className="relative mb-16 text-center sm:mb-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-full max-w-lg -translate-x-1/2 rounded-full bg-solana-purple/10 blur-3xl" />

        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-solana-purple/30 bg-solana-purple/10 px-4 py-1.5 text-xs font-medium text-solana-purple">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-solana-green" />
            Powered by $SERMON
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-monk-text">Before you ape,</span>
            <span className="mt-1 block text-gradient-solana">
              receive a sermon.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-monk-muted sm:text-lg md:text-xl">
            Paste a Solana token. The Monk Council reads the chart, the
            liquidity, the narrative, and the unknowns.
          </p>

          <div className="mx-auto mt-10 max-w-xl">
            <TokenInput />
          </div>

          <p className="mt-6 font-mono text-xs text-monk-muted/60">
            Call it before the chart calls it.
          </p>
        </div>
      </section>

      {/* Product features */}
      <section className="mb-20 sm:mb-24">
        <SectionHeader
          align="center"
          eyebrow="The Temple"
          title="Four rituals. One loop."
          subtitle="Website first. Ritual first. Alive first."
        />
        <TempleFeatures />
      </section>

      {/* Live sections */}
      <div className="space-y-20 sm:space-y-24">
        <MonkLive />
        <RecentSermons />
        <BeatTheMonk />
        <HowItWorks />
      </div>

      <footer className="mt-20 border-t border-temple-border/60 pt-10 text-center sm:mt-24">
        <p className="text-sm text-monk-muted">
          Trench Monk · The Temple · Sermons · Vows · Karma Maps · Wisdom
        </p>
        <p className="mt-2 text-xs text-monk-muted/50">
          Fictional monk branding. Not financial advice.
        </p>
      </footer>
    </div>
  );
}
