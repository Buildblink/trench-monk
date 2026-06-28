import type { CouncilResult, RiskLevel } from "@/lib/monk/schemas";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import { RiskMeter } from "@/components/ui/RiskMeter";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface KarmaMapLiteProps {
  council?: CouncilResult | null;
}

const TILE_ICONS: Record<string, string> = {
  "Dev Risk": "🕵️",
  "Liquidity Risk": "💧",
  "Holder Risk": "👻",
  "Narrative Risk": "📿",
};

function riskBadgeVariant(level: RiskLevel) {
  if (level === "high") return "red" as const;
  if (level === "medium") return "orange" as const;
  if (level === "low") return "green" as const;
  return "muted" as const;
}

function tileAccent(level: RiskLevel): "purple" | "green" | "orange" | "default" {
  if (level === "high") return "orange";
  if (level === "medium") return "orange";
  if (level === "low") return "green";
  return "default";
}

export function KarmaMapLite({ council }: KarmaMapLiteProps) {
  const categories = council
    ? [
        {
          label: "Dev Risk",
          level: council.devDetective.risk_level,
          description: council.devDetective.monk_line,
          confidence: council.devDetective.confidence,
        },
        {
          label: "Liquidity Risk",
          level: council.walletMonk.risk_level,
          description:
            council.walletMonk.observations[0] ?? "Selected-pair liquidity read.",
          confidence: council.walletMonk.confidence,
        },
        {
          label: "Holder Risk",
          level: "unknown" as RiskLevel,
          description:
            "Top holders unknown from current data.",
          confidence: "low" as const,
        },
        {
          label: "Narrative Risk",
          level: council.narrativeOracle.risk_level,
          description: council.narrativeOracle.monk_line,
          confidence: council.narrativeOracle.confidence,
        },
      ]
    : [
        {
          label: "Dev Risk",
          level: "unknown" as RiskLevel,
          description: "Awaiting Council",
          confidence: null,
        },
        {
          label: "Liquidity Risk",
          level: "unknown" as RiskLevel,
          description: "Awaiting Council",
          confidence: null,
        },
        {
          label: "Holder Risk",
          level: "unknown" as RiskLevel,
          description: "Awaiting Council",
          confidence: null,
        },
        {
          label: "Narrative Risk",
          level: "unknown" as RiskLevel,
          description: "Awaiting Council",
          confidence: null,
        },
      ];

  return (
    <section className="rounded-2xl border border-temple-border/80 bg-gradient-to-b from-temple-surface/60 to-temple-bg/40 p-5 sm:p-6">
      <SectionHeader
        eyebrow="Risk battlefield"
        title="Karma Map Lite"
        subtitle="Four fronts of on-chain karma. Full wallet clustering comes later."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((risk) => (
          <div key={risk.label} className="relative">
            <MetricCard
              label={risk.label}
              value={risk.level}
              subValue={risk.description}
              icon={TILE_ICONS[risk.label]}
              accent={tileAccent(risk.level)}
            />
            <div className="mt-2 px-1">
              <RiskMeter level={risk.level} />
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5 px-1">
              <Badge variant={riskBadgeVariant(risk.level)}>
                {risk.level} risk
              </Badge>
              {risk.confidence && (
                <Badge variant="muted">{risk.confidence} conf.</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
