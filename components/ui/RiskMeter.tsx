import type { RiskLevel } from "@/lib/monk/schemas";
import { riskBarWidth, riskBarColor } from "@/components/council-styles";

interface RiskMeterProps {
  level: RiskLevel;
  className?: string;
}

export function RiskMeter({ level, className = "" }: RiskMeterProps) {
  return (
    <div
      className={`h-2 overflow-hidden rounded-full bg-temple-elevated ${className}`}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${riskBarWidth(level)} ${riskBarColor(level)}`}
      />
    </div>
  );
}
