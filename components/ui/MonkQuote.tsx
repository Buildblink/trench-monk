interface MonkQuoteProps {
  quote: string;
  size?: "md" | "lg";
}

export function MonkQuote({ quote, size = "md" }: MonkQuoteProps) {
  const sizeClass =
    size === "lg"
      ? "text-lg sm:text-xl leading-relaxed"
      : "text-sm leading-relaxed";

  return (
    <blockquote className="relative rounded-xl border border-candle-orange/25 bg-gradient-to-br from-candle-orange/10 via-temple-bg/40 to-temple-bg/20 px-5 py-4">
      <span
        className="absolute left-3 top-2 font-serif text-3xl leading-none text-candle-orange/30"
        aria-hidden
      >
        &ldquo;
      </span>
      <p className={`pl-4 italic text-candle-glow/95 ${sizeClass}`}>
        {quote}
      </p>
    </blockquote>
  );
}
