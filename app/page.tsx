import { TokenInput } from "@/components/TokenInput";
import { MonkLive } from "@/components/MonkLive";
import { RecentSermons } from "@/components/RecentSermons";
import { BeatTheMonk } from "@/components/BeatTheMonk";
import { HowItWorks } from "@/components/HowItWorks";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero */}
      <section className="mb-20 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-solana-purple/30 bg-solana-purple/10 px-4 py-1.5 text-xs text-solana-purple">
          <span className="h-1.5 w-1.5 rounded-full bg-solana-green animate-pulse" />
          Powered by $SERMON
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-monk-text">Before you ape, </span>
          <span className="text-gradient-solana">receive a sermon.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base text-monk-muted sm:text-lg">
          Call it before the chart calls it. Paste any Solana token and let the
          Monk Council read the trenches.
        </p>

        <div className="mx-auto mt-10 flex justify-center">
          <TokenInput />
        </div>

        <p className="mt-6 font-mono text-xs text-monk-muted/60">
          All candles are impermanent. On-chain karma is forever.
        </p>
      </section>

      {/* Sections */}
      <div className="space-y-20">
        <MonkLive />
        <RecentSermons />
        <BeatTheMonk />
        <HowItWorks />
      </div>

      {/* Footer tagline */}
      <footer className="mt-20 border-t border-temple-border/60 pt-10 text-center">
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
