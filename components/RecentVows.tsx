"use client";

import { useCallback, useEffect, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import type { VowRecord, VowsResponse } from "@/lib/types";

interface RecentVowsProps {
  tokenAddress: string;
  refreshKey?: number;
}

function formatTimeAgo(isoDate: string): string {
  const created = new Date(isoDate).getTime();
  const minutes = Math.max(0, Math.floor((Date.now() - created) / 60_000));

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function PendingBadge() {
  return (
    <Badge variant="muted" className="text-[10px]">
      Pending
    </Badge>
  );
}

function VowCard({ vow }: { vow: VowRecord }) {
  const displayName = vow.username ?? "Anonymous monk";

  return (
    <li className="rounded-xl border border-temple-border bg-temple-surface/40 px-4 py-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-monk-text">{displayName}</p>
          <p className="mt-0.5 text-xs text-monk-muted">
            {formatTimeAgo(vow.createdAt)}
          </p>
        </div>
        <Badge variant="purple">{vow.callType}</Badge>
      </div>

      {vow.callReason && (
        <p className="mt-2 text-sm leading-relaxed text-monk-muted">
          {vow.callReason}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 text-[11px] text-monk-muted">
          <span className="font-semibold text-monk-text/80">1H</span>
          {vow.result1h === "pending" ? <PendingBadge /> : vow.result1h}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-monk-muted">
          <span className="font-semibold text-monk-text/80">3H</span>
          {vow.result3h === "pending" ? <PendingBadge /> : vow.result3h}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-monk-muted">
          <span className="font-semibold text-monk-text/80">24H</span>
          {vow.result24h === "pending" ? <PendingBadge /> : vow.result24h}
        </span>
      </div>
    </li>
  );
}

export function RecentVows({ tokenAddress, refreshKey = 0 }: RecentVowsProps) {
  const [vows, setVows] = useState<VowRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVows = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/vows?tokenAddress=${encodeURIComponent(tokenAddress)}`
      );
      const json: VowsResponse = await res.json();

      if (json.success && json.vows) {
        setVows(json.vows);
      } else {
        setVows([]);
      }
    } catch {
      setVows([]);
    } finally {
      setLoading(false);
    }
  }, [tokenAddress]);

  useEffect(() => {
    fetchVows();
  }, [fetchVows, refreshKey]);

  if (loading) {
    return (
      <section>
        <SectionHeader
          eyebrow="Monk Trials"
          title="Recent Vows"
          subtitle="Public calls on this token. The chart has not yet judged."
        />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-xl border border-temple-border bg-temple-surface/30"
            />
          ))}
        </div>
      </section>
    );
  }

  if (vows.length === 0) {
    return (
      <section>
        <SectionHeader
          eyebrow="Monk Trials"
          title="Recent Vows"
          subtitle="Public calls on this token. The chart has not yet judged."
        />
        <p className="rounded-xl border border-dashed border-temple-border bg-temple-surface/20 px-4 py-6 text-center text-sm text-monk-muted">
          No Vows yet. Be the first to face the candle.
        </p>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader
        eyebrow="Monk Trials"
        title="Recent Vows"
        subtitle="Public calls on this token. The chart has not yet judged."
      />
      <ul className="space-y-3">
        {vows.map((vow) => (
          <VowCard key={vow.id} vow={vow} />
        ))}
      </ul>
    </section>
  );
}
