import type { FinalMonkOutput, Verdict } from "@/lib/monk/schemas";
import { Badge } from "@/components/ui/Badge";
import { MonkQuote } from "@/components/ui/MonkQuote";
import { SectionHeader } from "@/components/ui/SectionHeader";

const VERDICT_ACCENT: Record<
  Verdict,
  { glow: string; ring: string; text: string }
> = {
  "Clear Mind": {
    glow: "glow-green",
    ring: "#14f195",
    text: "text-solana-green",
  },
  "Scalp Only": {
    glow: "glow-candle",
    ring: "#ffb347",
    text: "text-candle-glow",
  },
  "Hungry Ghosts": {
    glow: "",
    ring: "#f87171",
    text: "text-red-400",
  },
  "Dev Karma": {
    glow: "glow-purple",
    ring: "#9945ff",
    text: "text-solana-purple",
  },
  "False Temple": {
    glow: "",
    ring: "#f87171",
    text: "text-red-400",
  },
  "Dead Candle": {
    glow: "",
    ring: "#8b8ba3",
    text: "text-monk-muted",
  },
  "CTO Rebirth": {
    glow: "glow-purple",
    ring: "#9945ff",
    text: "text-solana-purple",
  },
  "Exit Ceremony": {
    glow: "glow-candle",
    ring: "#ffb347",
    text: "text-candle-glow",
  },
  "Do Not Ape": {
    glow: "",
    ring: "#f87171",
    text: "text-red-400",
  },
  "Meditate First": {
    glow: "",
    ring: "#8b8ba3",
    text: "text-monk-muted",
  },
};

interface MonkVerdictProps {
  verdict: FinalMonkOutput;
}

export function MonkVerdict({ verdict }: MonkVerdictProps) {
  const accent = VERDICT_ACCENT[verdict.verdict];

  return (
    <section
      className={`verdict-hero relative overflow-hidden rounded-3xl border border-candle-orange/35 p-6 sm:p-8 ${accent.glow}`}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-solana-purple/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 left-1/4 h-32 w-32 rounded-full bg-candle-orange/10 blur-3xl" />

      <SectionHeader
        eyebrow="The Monk has spoken"
        title="Final Monk Verdict"
        subtitle="The one who does not ape."
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        {/* Verdict + clarity */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <p
            className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${accent.text}`}
          >
            {verdict.verdict}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
            <Badge variant="orange">{verdict.confidence} confidence</Badge>
            <Badge variant="purple">{verdict.best_use_case}</Badge>
            <Badge variant="muted">{verdict.call_difficulty} call</Badge>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-monk-text/90 sm:text-lg">
            {verdict.summary}
          </p>
        </div>

        {/* Clarity ring */}
        <div className="flex shrink-0 flex-col items-center">
          <div
            className="clarity-ring rounded-full p-[3px]"
            style={
              {
                "--score": verdict.clarity_score,
                "--ring-color": accent.ring,
              } as Record<string, string | number>
            }
          >
            <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-temple-bg sm:h-32 sm:w-32">
              <span
                className={`font-mono text-4xl font-bold sm:text-5xl ${accent.text}`}
              >
                {verdict.clarity_score}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-widest text-monk-muted">
                Clarity
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="ritual-divider my-8" />

      {/* Main danger */}
      <div className="rounded-xl border border-red-500/25 bg-red-500/5 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-red-400/90">
          Main Danger
        </p>
        <p className="mt-2 text-base font-medium leading-snug text-monk-text sm:text-lg">
          {verdict.main_danger}
        </p>
      </div>

      <div className="mt-6">
        <MonkQuote quote={verdict.monk_quote} size="lg" />
      </div>

      <div className="mt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-monk-muted">
          What to Watch Next
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {verdict.what_to_watch_next.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-lg border border-temple-border/50 bg-temple-bg/40 px-3 py-2.5 text-sm text-monk-text/90"
            >
              <span className="text-solana-green">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <details className="mt-6 group">
        <summary className="cursor-pointer list-none text-sm text-monk-muted transition-colors hover:text-monk-text [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            <span className="text-solana-purple">+</span>
            Data limitations ({verdict.data_limitations.length})
          </span>
        </summary>
        <ul className="mt-3 space-y-1.5 rounded-lg border border-temple-border/40 bg-temple-bg/30 px-4 py-3">
          {verdict.data_limitations.map((item, i) => (
            <li key={i} className="text-sm text-monk-muted">
              — {item}
            </li>
          ))}
        </ul>
      </details>

      <p className="mt-6 text-xs leading-relaxed text-monk-muted/60">
        {verdict.disclaimer}
      </p>
    </section>
  );
}
