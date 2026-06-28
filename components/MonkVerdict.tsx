import type { FinalMonkOutput, Verdict } from "@/lib/monk/schemas";

const VERDICT_STYLES: Record<
  Verdict,
  { badge: string; glow: string }
> = {
  "Clear Mind": {
    badge: "bg-solana-green/15 text-solana-green border-solana-green/40",
    glow: "glow-green",
  },
  "Scalp Only": {
    badge: "bg-candle-orange/15 text-candle-glow border-candle-orange/40",
    glow: "glow-candle",
  },
  "Hungry Ghosts": {
    badge: "bg-red-500/15 text-red-400 border-red-500/40",
    glow: "",
  },
  "Dev Karma": {
    badge: "bg-solana-purple/15 text-solana-purple border-solana-purple/40",
    glow: "glow-purple",
  },
  "False Temple": {
    badge: "bg-red-500/15 text-red-400 border-red-500/40",
    glow: "",
  },
  "Dead Candle": {
    badge: "bg-temple-elevated text-monk-muted border-temple-border",
    glow: "",
  },
  "CTO Rebirth": {
    badge: "bg-solana-purple/15 text-solana-purple border-solana-purple/40",
    glow: "glow-purple",
  },
  "Exit Ceremony": {
    badge: "bg-candle-orange/15 text-candle-glow border-candle-orange/40",
    glow: "glow-candle",
  },
  "Do Not Ape": {
    badge: "bg-red-500/15 text-red-400 border-red-500/40",
    glow: "",
  },
  "Meditate First": {
    badge: "bg-temple-elevated text-monk-muted border-temple-border",
    glow: "",
  },
};

function clarityColor(score: number): string {
  if (score >= 70) return "text-solana-green";
  if (score >= 40) return "text-candle-glow";
  return "text-red-400";
}

function clarityRing(score: number): string {
  if (score >= 70) return "border-solana-green/50";
  if (score >= 40) return "border-candle-orange/50";
  return "border-red-500/50";
}

interface MonkVerdictProps {
  verdict: FinalMonkOutput;
}

export function MonkVerdict({ verdict }: MonkVerdictProps) {
  const styles = VERDICT_STYLES[verdict.verdict];

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-candle-orange/30 bg-gradient-to-br from-temple-surface via-temple-elevated/50 to-temple-surface p-6 ${styles.glow}`}
    >
      <div className="absolute right-4 top-4 text-4xl opacity-20 animate-float">
        🧘
      </div>

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-candle-glow">
          Final Monk Verdict
        </h2>
        <p className="text-xs text-monk-muted">The one who does not ape</p>
      </div>

      <div className="rounded-xl border border-temple-border/60 bg-temple-bg/60 p-5">
        <div className="flex flex-wrap items-center gap-4">
          <span
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${styles.badge}`}
          >
            {verdict.verdict}
          </span>
          <span className="rounded-full border border-temple-border bg-temple-elevated px-3 py-1 text-xs capitalize text-monk-muted">
            {verdict.call_difficulty} call
          </span>
        </div>

        <div className="mt-5 flex items-center gap-5">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${clarityRing(verdict.clarity_score)}`}
          >
            <span
              className={`font-mono text-xl font-bold ${clarityColor(verdict.clarity_score)}`}
            >
              {verdict.clarity_score}
            </span>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-monk-muted">
              Clarity Score
            </div>
            <div className="text-sm text-monk-text">
              How clearly the Council sees this token
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-lg bg-red-500/5 border border-red-500/20 p-3">
          <div className="text-xs uppercase tracking-wider text-red-400/80">
            Main Danger
          </div>
          <p className="mt-1 text-sm font-medium text-monk-text">
            {verdict.main_danger}
          </p>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-monk-text/90">
          {verdict.summary}
        </p>

        <blockquote className="mt-5 border-l-2 border-candle-orange/50 pl-4 text-sm italic text-candle-glow/90">
          &ldquo;{verdict.monk_quote}&rdquo;
        </blockquote>

        <div className="mt-5">
          <div className="text-xs uppercase tracking-wider text-monk-muted">
            What to Watch Next
          </div>
          <ul className="mt-2 space-y-2">
            {verdict.what_to_watch_next.map((item, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-monk-text/90"
              >
                <span className="text-solana-green">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 border-t border-temple-border/50 pt-4 text-xs text-monk-muted/70">
          {verdict.disclaimer}
        </p>
      </div>
    </section>
  );
}
