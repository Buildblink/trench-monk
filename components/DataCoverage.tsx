import { Badge } from "@/components/ui/Badge";
import { formatTierLabel } from "@/lib/format";

interface DataCoverageProps {
  available: string[];
  missing: string[];
  contextTiers?: {
    size_tier: string;
    liquidity_tier: string;
    pair_age_tier: string;
  };
}

export function DataCoverage({
  available,
  missing,
  contextTiers,
}: DataCoverageProps) {
  return (
    <section className="rounded-xl border border-temple-border/60 bg-temple-surface/30 px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-sm text-monk-muted">
        The Monk only speaks from available data. Unknowns are not invented.
      </p>

      {contextTiers && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge variant="purple">Size: {formatTierLabel(contextTiers.size_tier)}</Badge>
          <Badge variant="green">
            Pair liq: {formatTierLabel(contextTiers.liquidity_tier)}
          </Badge>
          <Badge variant="orange">
            Age: {formatTierLabel(contextTiers.pair_age_tier)}
          </Badge>
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-solana-green">
            Available from DexScreener
          </p>
          <div className="flex flex-wrap gap-1">
            {available.map((item) => (
              <Badge key={item} variant="muted" className="text-[11px]">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-monk-muted">
            Not in current data
          </p>
          <div className="flex flex-wrap gap-1">
            {missing.map((item) => (
              <Badge key={item} variant="muted" className="text-[11px] opacity-80">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
