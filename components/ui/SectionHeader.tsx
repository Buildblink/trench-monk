interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "left",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-6 ${alignClass}`}>
      {eyebrow && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-solana-purple">
          {eyebrow}
        </p>
      )}
      <h2 className="text-xl font-bold tracking-tight text-monk-text sm:text-2xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-monk-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
