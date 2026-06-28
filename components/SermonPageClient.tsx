"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { TokenSummaryCard } from "@/components/TokenSummaryCard";
import { DataCoverage } from "@/components/DataCoverage";
import { CouncilDebate } from "@/components/CouncilDebate";
import { MonkVerdict } from "@/components/MonkVerdict";
import { CouncilLoading } from "@/components/CouncilLoading";
import { CouncilError } from "@/components/CouncilError";
import { KarmaMapLite } from "@/components/KarmaMapLite";
import { MakeVowButton } from "@/components/MakeVowButton";
import { RecentVows } from "@/components/RecentVows";
import { Badge } from "@/components/ui/Badge";
import type { MonkCouncilResponse } from "@/app/api/monk-council/route";
import type { CouncilResult } from "@/lib/monk/schemas";
import type { RecentScanResponse, ScanResponse } from "@/lib/types";

interface SermonPageClientProps {
  tokenAddress: string;
}

type SermonSource = "live" | "saved" | null;

function formatMinutesAgo(isoDate: string): string {
  const created = new Date(isoDate).getTime();
  const minutes = Math.max(0, Math.floor((Date.now() - created) / 60_000));

  if (minutes < 1) return "just now";
  if (minutes === 1) return "1 minute ago";
  return `${minutes} minutes ago`;
}

export function SermonPageClient({ tokenAddress }: SermonPageClientProps) {
  const [scanLoading, setScanLoading] = useState(true);
  const [scanError, setScanError] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<ScanResponse["data"] | null>(null);

  const [councilLoading, setCouncilLoading] = useState(false);
  const [councilError, setCouncilError] = useState<string | null>(null);
  const [council, setCouncil] = useState<CouncilResult | null>(null);
  const [sermonSource, setSermonSource] = useState<SermonSource>(null);
  const [sermonReceivedAt, setSermonReceivedAt] = useState<string | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);
  const [scanId, setScanId] = useState<string | null>(null);
  const [vowsRefreshKey, setVowsRefreshKey] = useState(0);

  const fetchCouncil = useCallback(
    async (
      data: NonNullable<ScanResponse["data"]>,
      options?: { forceRefresh?: boolean }
    ) => {
      const forceRefresh = options?.forceRefresh ?? false;

      if (forceRefresh) {
        setRefreshing(true);
      } else {
        setCouncilLoading(true);
      }
      setCouncilError(null);

      try {
        const res = await fetch("/api/monk-council", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenData: data, forceRefresh }),
        });
        const json: MonkCouncilResponse = await res.json();

        if (!json.success || !json.data) {
          setCouncil(null);
          setSermonSource(null);
          setSermonReceivedAt(null);
          setScanId(null);
          setCouncilError(
            json.error ?? "The Monk Council could not complete the reading."
          );
        } else {
          setCouncil(json.data);
          setSermonSource(json.fromCache ? "saved" : "live");
          setSermonReceivedAt(json.createdAt ?? new Date().toISOString());
          setScanId(json.scanId ?? null);
        }
      } catch {
        setCouncil(null);
        setSermonSource(null);
        setSermonReceivedAt(null);
        setScanId(null);
        setCouncilError("Network error while summoning the Monk Council.");
      } finally {
        setCouncilLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  const loadRecentOrCouncil = useCallback(
    async (data: NonNullable<ScanResponse["data"]>) => {
      setCouncilLoading(true);
      setCouncilError(null);

      try {
        const recentRes = await fetch(
          `/api/scans/recent?tokenAddress=${encodeURIComponent(tokenAddress)}`
        );
        const recentJson: RecentScanResponse = await recentRes.json();

        if (recentJson.success && recentJson.scan) {
          setCouncil(recentJson.scan.council);
          setSermonSource("saved");
          setSermonReceivedAt(recentJson.scan.createdAt);
          setScanId(recentJson.scan.id);
          setCouncilLoading(false);
          return;
        }
      } catch {
        // Fall through to live council — persistence offline is non-fatal.
      }

      await fetchCouncil(data);
    },
    [tokenAddress, fetchCouncil]
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchScan() {
      setScanLoading(true);
      setScanError(null);
      setCouncil(null);
      setCouncilError(null);
      setSermonSource(null);
      setSermonReceivedAt(null);
      setScanId(null);

      try {
        const res = await fetch(
          `/api/scan?tokenAddress=${encodeURIComponent(tokenAddress)}`
        );
        const json: ScanResponse = await res.json();

        if (cancelled) return;

        if (!json.success || !json.data) {
          setScanError(json.error ?? "Failed to load token data");
          setTokenData(null);
        } else {
          setTokenData(json.data);
          await loadRecentOrCouncil(json.data);
        }
      } catch {
        if (!cancelled) {
          setScanError("Network error. The Temple is unreachable.");
        }
      } finally {
        if (!cancelled) setScanLoading(false);
      }
    }

    fetchScan();
    return () => {
      cancelled = true;
    };
  }, [tokenAddress, loadRecentOrCouncil]);

  const handleVowCreated = () => {
    setVowsRefreshKey((key) => key + 1);
  };

  const handleRefreshSermon = () => {
    if (!tokenData || refreshing || councilLoading) return;
    fetchCouncil(tokenData, { forceRefresh: true });
  };

  return (
    <div className="mx-auto max-w-4xl overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8">
        <Link
          href="/"
          className="text-sm text-monk-muted transition-colors hover:text-solana-green"
        >
          ← Back to Temple
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-monk-text sm:text-3xl">
            <span className="text-gradient-solana">Sermon</span>
          </h1>
          {sermonSource === "live" && (
            <Badge variant="green">Live Sermon</Badge>
          )}
          {sermonSource === "saved" && (
            <Badge variant="purple">Saved Sermon</Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-monk-muted sm:text-base">
          The Monk Council reads the token. The chart has not yet spoken.
        </p>
        {sermonSource === "saved" && sermonReceivedAt && (
          <p className="mt-1 text-xs text-monk-muted">
            Sermon received {formatMinutesAgo(sermonReceivedAt)}
          </p>
        )}
      </header>

      {scanLoading && (
        <div className="space-y-6">
          <div className="h-40 animate-pulse rounded-2xl border border-temple-border bg-temple-surface/50 sm:h-48" />
          <CouncilLoading message="Summoning data from DexScreener..." />
        </div>
      )}

      {scanError && !scanLoading && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <p className="text-red-400">{scanError}</p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-solana-green hover:underline"
          >
            Try another token
          </Link>
        </div>
      )}

      {tokenData && !scanLoading && (
        <div className="space-y-10">
          <TokenSummaryCard data={tokenData} />

          {councilLoading && (
            <CouncilLoading message="The Monk Council is debating..." />
          )}

          {councilError && !councilLoading && (
            <CouncilError
              error={councilError}
              onRetry={() => fetchCouncil(tokenData)}
            />
          )}

          {council && !councilLoading && (
            <>
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleRefreshSermon}
                  disabled={refreshing}
                  className="rounded-lg border border-temple-border bg-temple-surface px-3 py-1.5 text-xs font-medium text-monk-muted transition-colors hover:border-solana-purple/40 hover:text-monk-text disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                >
                  {refreshing ? "Refreshing..." : "Refresh Sermon"}
                </button>
              </div>

              <MonkVerdict verdict={council.finalMonk} />

              <DataCoverage
                available={council.dataCoverage.available}
                missing={council.dataCoverage.missing}
                contextTiers={council.dataCoverage.contextTiers}
              />

              <KarmaMapLite council={council} />

              <CouncilDebate
                devDetective={council.devDetective}
                walletMonk={council.walletMonk}
                narrativeOracle={council.narrativeOracle}
              />
            </>
          )}

          {!council && !councilLoading && !councilError && (
            <KarmaMapLite council={null} />
          )}

          {council && !councilLoading && (
            <MakeVowButton
              tokenAddress={tokenAddress}
              tokenData={tokenData}
              scanId={scanId}
              monkVerdict={council.finalMonk.verdict}
              onVowCreated={handleVowCreated}
            />
          )}

          <RecentVows tokenAddress={tokenAddress} refreshKey={vowsRefreshKey} />
        </div>
      )}
    </div>
  );
}
