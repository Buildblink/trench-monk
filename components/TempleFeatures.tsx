const FEATURES = [
  {
    icon: "📜",
    title: "Receive Sermons",
    description:
      "Paste any Solana token. The Monk Council reads liquidity, narrative, and launch context.",
    accent: "border-solana-purple/30 from-solana-purple/10",
  },
  {
    icon: "🕯️",
    title: "Make Vows",
    description:
      "Publicly call what happens next — before the chart proves you right or wrong.",
    accent: "border-candle-orange/30 from-candle-orange/10",
  },
  {
    icon: "✨",
    title: "Earn Wisdom",
    description:
      "Correct hard calls earn reputation. Beat the Monk and receive proof cards.",
    accent: "border-solana-green/30 from-solana-green/10",
  },
  {
    icon: "🗺️",
    title: "Study Karma Maps",
    description:
      "Visual risk panels across dev, liquidity, holders, and narrative fronts.",
    accent: "border-solana-purple/30 from-solana-purple/5",
  },
];

export function TempleFeatures() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map((feature) => (
        <div
          key={feature.title}
          className={`rounded-2xl border bg-gradient-to-br to-transparent p-5 ${feature.accent}`}
        >
          <span className="text-2xl" aria-hidden>
            {feature.icon}
          </span>
          <h3 className="mt-3 font-semibold text-monk-text">{feature.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-monk-muted">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
}
