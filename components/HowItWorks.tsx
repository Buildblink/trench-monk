const STEPS = [
  {
    step: "01",
    title: "Receive Sermon",
    description:
      "Paste any Solana token. The Monk Council reads dev karma, wallet ghosts, and narrative illusion.",
    icon: "📜",
  },
  {
    step: "02",
    title: "Make Your Vow",
    description:
      "Publicly call what happens next — before the chart proves you right or wrong.",
    icon: "🕯️",
  },
  {
    step: "03",
    title: "Face the Candle",
    description:
      "Your Vow resolves after 1H, 3H, or 24H. The market judges. Karma is recorded.",
    icon: "🕉️",
  },
  {
    step: "04",
    title: "Gain Wisdom",
    description:
      "Correct hard calls earn Wisdom. Beat the Monk and receive proof cards.",
    icon: "✨",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold text-monk-text">How It Works</h2>
        <p className="mt-1 text-sm text-monk-muted">
          The Temple Loop. Call it before the chart calls it.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((item) => (
          <div
            key={item.step}
            className="relative rounded-xl border border-temple-border bg-temple-surface/50 p-5 text-center transition-colors hover:border-solana-purple/30"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-candle-orange/30 bg-candle-orange/10 text-xl">
              {item.icon}
            </div>
            <div className="mb-1 font-mono text-xs text-solana-purple">
              {item.step}
            </div>
            <h3 className="font-semibold text-monk-text">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-monk-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
