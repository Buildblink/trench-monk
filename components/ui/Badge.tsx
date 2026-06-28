import type { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "purple"
  | "green"
  | "orange"
  | "red"
  | "muted";

const VARIANTS: Record<BadgeVariant, string> = {
  default:
    "border-temple-border bg-temple-elevated text-monk-text",
  purple:
    "border-solana-purple/40 bg-solana-purple/10 text-solana-purple",
  green:
    "border-solana-green/40 bg-solana-green/10 text-solana-green",
  orange:
    "border-candle-orange/40 bg-candle-orange/10 text-candle-glow",
  red: "border-red-500/40 bg-red-500/10 text-red-400",
  muted: "border-temple-border bg-temple-bg/60 text-monk-muted",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
