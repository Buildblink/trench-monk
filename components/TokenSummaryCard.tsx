import type { TokenData } from "@/lib/types";
import {
  formatUsd,
  formatPercent,
  formatAge,
  truncateAddress,
} from "@/lib/format";

interface TokenSummaryCardProps {
  data: TokenData;
}

function StatCell({
  label,
  value,
  subValue,
  positive,
}: {
  label: string;
  value: string;
  subValue?: string;
  positive?: boolean | null;
}) {
  return (
    <div className="rounded-lg border border-temple-border/60 bg-temple-bg/40 p-3">
      <div className="text-xs text-monk-muted">{label}</div>
      <div className="mt-1 font-mono text-sm font-semibold text-monk-text">
        {value}
      </div>
      {subValue && (
        <div
          className={`mt-0.5 text-xs ${
            positive === true
              ? "text-solana-green"
              : positive === false
                ? "text-red-400"
                : "text-monk-muted"
          }`}
        >
          {subValue}
        </div>
      )}
    </div>
  );
}

export function TokenSummaryCard({ data }: TokenSummaryCardProps) {
  return (
    <section className="rounded-2xl border border-temple-border bg-temple-surface/70 p-6 glow-purple">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {data.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.imageUrl}
              alt={data.symbol ?? "Token"}
              className="h-14 w-14 rounded-xl border border-temple-border object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-solana-purple/30 bg-temple-elevated text-2xl">
              🪙
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-monk-text">
              {data.name ?? "Unknown Token"}
              {data.symbol && (
                <span className="ml-2 font-mono text-lg text-solana-green">
                  ${data.symbol}
                </span>
              )}
            </h1>
            <p className="mt-1 font-mono text-xs text-monk-muted">
              {truncateAddress(data.tokenAddress, 6)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.dex && (
            <span className="rounded-full border border-temple-border bg-temple-elevated px-3 py-1 text-xs text-monk-muted">
              {data.dex}
            </span>
          )}
          {data.pairAgeHours != null && (
            <span className="rounded-full border border-candle-orange/30 bg-candle-orange/10 px-3 py-1 text-xs text-candle-glow">
              Age: {formatAge(data.pairAgeHours)}
            </span>
          )}
          {data.boosts != null && data.boosts > 0 && (
            <span className="rounded-full border border-solana-purple/30 bg-solana-purple/10 px-3 py-1 text-xs text-solana-purple">
              {data.boosts} boost{data.boosts !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <StatCell label="Price" value={formatUsd(data.priceUsd)} />
        <StatCell label="Market Cap" value={formatUsd(data.marketCap)} />
        <StatCell label="FDV" value={formatUsd(data.fdv)} />
        <StatCell label="Selected Pair Liquidity" value={formatUsd(data.liquidityUsd)} />
        <StatCell
          label="Vol 24H"
          value={formatUsd(data.volume24h)}
          subValue={formatPercent(data.priceChange24h)}
          positive={
            data.priceChange24h != null ? data.priceChange24h >= 0 : null
          }
        />
        <StatCell
          label="Vol 1H"
          value={formatUsd(data.volume1h)}
          subValue={formatPercent(data.priceChange1h)}
          positive={
            data.priceChange1h != null ? data.priceChange1h >= 0 : null
          }
        />
        <StatCell label="Vol 5M" value={formatUsd(data.volume5m)} />
        <StatCell
          label="Chain"
          value={data.chain.charAt(0).toUpperCase() + data.chain.slice(1)}
        />
      </div>

      <p className="mt-3 text-xs text-monk-muted/70">
        Liquidity is for the selected DexScreener pair only — not necessarily
        total token liquidity across all pools or CEXs.
      </p>

      {(data.website || data.twitter || data.telegram) && (
        <div className="mt-4 flex flex-wrap gap-3 border-t border-temple-border/60 pt-4">
          {data.website && (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-solana-green transition-colors hover:text-solana-purple"
            >
              Website ↗
            </a>
          )}
          {data.twitter && (
            <a
              href={data.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-solana-green transition-colors hover:text-solana-purple"
            >
              Twitter ↗
            </a>
          )}
          {data.telegram && (
            <a
              href={data.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-solana-green transition-colors hover:text-solana-purple"
            >
              Telegram ↗
            </a>
          )}
        </div>
      )}
    </section>
  );
}
