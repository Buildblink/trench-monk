import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon?: ReactNode;
  accent?: "purple" | "green" | "orange" | "default";
}

const ACCENT_BORDER = {
  purple: "border-solana-purple/30",
  green: "border-solana-green/30",
  orange: "border-candle-orange/30",
  default: "border-temple-border/80",
};

export function MetricCard({
  label,
  value,
  subValue,
  icon,
  accent = "default",
}: MetricCardProps) {
  return (
    <div
      className={`rounded-xl border bg-temple-bg/50 p-4 ${ACCENT_BORDER[accent]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-monk-muted">
          {label}
        </span>
        {icon && <span className="text-lg opacity-80">{icon}</span>}
      </div>
      <div className="mt-2 font-mono text-lg font-semibold text-monk-text sm:text-xl">
        {value}
      </div>
      {subValue && (
        <p className="mt-1 text-xs leading-snug text-monk-muted line-clamp-2">
          {subValue}
        </p>
      )}
    </div>
  );
}
