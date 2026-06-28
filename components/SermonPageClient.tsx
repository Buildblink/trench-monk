"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TokenSummaryCard } from "@/components/TokenSummaryCard";
import { CouncilDebatePlaceholder } from "@/components/CouncilDebatePlaceholder";
import { MonkVerdictPlaceholder } from "@/components/MonkVerdictPlaceholder";
import { KarmaMapLite } from "@/components/KarmaMapLite";
import { MakeVowButton } from "@/components/MakeVowButton";
import type { ScanResponse } from "@/lib/types";

interface SermonPageClientProps {
  tokenAddress: string;
}

export function SermonPageClient({ tokenAddress }: SermonPageClientProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ScanResponse["data"] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchScan() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/scan?tokenAddress=${encodeURIComponent(tokenAddress)}`
        );
        const json: ScanResponse = await res.json();

        if (cancelled) return;

        if (!json.success || !json.data) {
          setError(json.error ?? "Failed to load token data");
          setData(null);
        } else {
          setData(json.data);
        }
      } catch {
        if (!cancelled) {
          setError("Network error. The Temple is unreachable.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchScan();
    return () => {
      cancelled = true;
    };
  }, [tokenAddress]);

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

      {loading && (
        <div className="space-y-6">
          <div className="h-48 animate-pulse rounded-2xl border border-temple-border bg-temple-surface/50" />
          <div className="h-32 animate-pulse rounded-2xl border border-temple-border bg-temple-surface/50" />
          <p className="text-center text-sm text-monk-muted">
            Summoning data from DexScreener...
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <p className="text-red-400">{error}</p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-solana-green hover:underline"
          >
            Try another token
          </Link>
        </div>
      )}

      {data && !loading && (
        <div className="space-y-8">
          <TokenSummaryCard data={data} />
          <CouncilDebatePlaceholder />
          <MonkVerdictPlaceholder />
          <KarmaMapLite />
          <MakeVowButton />
        </div>
      )}
    </div>
  );
}
