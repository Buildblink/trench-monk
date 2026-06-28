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
import type { MonkCouncilResponse } from "@/app/api/monk-council/route";
import type { CouncilResult } from "@/lib/monk/schemas";
import type { ScanResponse } from "@/lib/types";

interface SermonPageClientProps {
  tokenAddress: string;
}

export function SermonPageClient({ tokenAddress }: SermonPageClientProps) {
  const [scanLoading, setScanLoading] = useState(true);
  const [scanError, setScanError] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<ScanResponse["data"] | null>(null);

  const [councilLoading, setCouncilLoading] = useState(false);
  const [councilError, setCouncilError] = useState<string | null>(null);
  const [council, setCouncil] = useState<CouncilResult | null>(null);

  const fetchCouncil = useCallback(async (data: NonNullable<ScanResponse["data"]>) => {
    setCouncilLoading(true);
    setCouncilError(null);

    try {
      const res = await fetch("/api/monk-council", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenData: data }),
      });
      const json: MonkCouncilResponse = await res.json();

      if (!json.success || !json.data) {
        setCouncil(null);
        setCouncilError(
          json.error ?? "The Monk Council could not complete the reading."
        );
      } else {
        setCouncil(json.data);
      }
    } catch {
      setCouncil(null);
      setCouncilError("Network error while summoning the Monk Council.");
    } finally {
      setCouncilLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchScan() {
      setScanLoading(true);
      setScanError(null);
      setCouncil(null);
      setCouncilError(null);

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
          fetchCouncil(json.data);
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
  }, [tokenAddress, fetchCouncil]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-monk-muted transition-colors hover:text-solana-green"
        >
          ← Back to Temple
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-monk-text">
          <span className="text-gradient-solana">Sermon</span>
        </h1>
        <p className="mt-1 text-sm text-monk-muted">
          The Monk Council reads the token. The chart has not yet spoken.
        </p>
      </div>

      {scanLoading && (
        <div className="space-y-6">
          <div className="h-48 animate-pulse rounded-2xl border border-temple-border bg-temple-surface/50" />
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
        <div className="space-y-8">
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
              <DataCoverage
                available={council.dataCoverage.available}
                missing={council.dataCoverage.missing}
                agents={{
                  devDetective: council.devDetective,
                  walletMonk: council.walletMonk,
                  narrativeOracle: council.narrativeOracle,
                }}
              />
              <CouncilDebate
                devDetective={council.devDetective}
                walletMonk={council.walletMonk}
                narrativeOracle={council.narrativeOracle}
              />
              <MonkVerdict verdict={council.finalMonk} />
            </>
          )}

          <KarmaMapLite council={council} />
          <MakeVowButton />
        </div>
      )}
    </div>
  );
}
