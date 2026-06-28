import type { Confidence, RiskLevel } from "@/lib/monk/schemas";

function confidenceBadgeClass(level: Confidence): string {
  switch (level) {
    case "high":
      return "bg-solana-green/15 text-solana-green border-solana-green/30";
    case "medium":
      return "bg-candle-orange/15 text-candle-glow border-candle-orange/30";
    default:
      return "bg-temple-elevated text-monk-muted border-temple-border";
  }
}

function riskBadgeClass(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "bg-solana-green/15 text-solana-green border-solana-green/30";
    case "medium":
      return "bg-candle-orange/15 text-candle-glow border-candle-orange/30";
    case "high":
      return "bg-red-500/15 text-red-400 border-red-500/30";
    default:
      return "bg-temple-elevated text-monk-muted border-temple-border";
  }
}

function riskBarWidth(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "w-1/4";
    case "medium":
      return "w-2/3";
    case "high":
      return "w-full";
    default:
      return "w-1/4";
  }
}

function riskBarColor(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "bg-solana-green";
    case "medium":
      return "bg-candle-orange";
    case "high":
      return "bg-red-500";
    default:
      return "bg-monk-muted/30";
  }
}

const AGENT_STYLES: Record<string, { accent: string; border: string }> = {
  "Dev Detective": {
    accent: "text-solana-purple",
    border: "border-solana-purple/30",
  },
  "Wallet Monk": {
    accent: "text-solana-green",
    border: "border-solana-green/30",
  },
  "Narrative Oracle": {
    accent: "text-candle-glow",
    border: "border-candle-orange/30",
  },
};

export { confidenceBadgeClass, riskBadgeClass, riskBarWidth, riskBarColor, AGENT_STYLES };
