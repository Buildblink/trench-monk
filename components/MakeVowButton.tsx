"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { VOW_CALL_TYPES } from "@/lib/vows/constants";
import type { TokenData, VowRecord, VowsResponse } from "@/lib/types";

interface MakeVowButtonProps {
  tokenAddress: string;
  tokenData: TokenData;
  scanId: string | null;
  monkVerdict: string;
  onVowCreated?: (vow: VowRecord) => void;
}

function formatResolveCountdown(isoDate: string): string {
  const target = new Date(isoDate).getTime();
  const remainingMs = target - Date.now();

  if (remainingMs <= 0) return "awaiting judgement";

  const totalMinutes = Math.ceil(remainingMs / 60_000);
  if (totalMinutes < 60) return `${totalMinutes}m`;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

function PendingTimers({ vow }: { vow: VowRecord }) {
  const windows = [
    { label: "1H", resolveAt: vow.resolve1hAt, result: vow.result1h },
    { label: "3H", resolveAt: vow.resolve3hAt, result: vow.result3h },
    { label: "24H", resolveAt: vow.resolve24hAt, result: vow.result24h },
  ] as const;

  return (
    <div className="mt-4 space-y-2">
      <p className="text-xs font-medium uppercase tracking-wider text-monk-muted">
        Face the candle
      </p>
      <div className="flex flex-wrap gap-2">
        {windows.map(({ label, resolveAt, result }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-lg border border-temple-border bg-temple-bg/60 px-3 py-1.5 text-xs text-monk-muted"
          >
            <span className="font-semibold text-monk-text">{label}</span>
            <span className="text-monk-muted/60">·</span>
            {result === "pending" ? (
              <>
                <span>Pending judgement</span>
                <span className="text-monk-muted/50">
                  ({formatResolveCountdown(resolveAt)})
                </span>
              </>
            ) : (
              <span className="capitalize">{result}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MakeVowButton({
  tokenAddress,
  tokenData,
  scanId,
  monkVerdict,
  onVowCreated,
}: MakeVowButtonProps) {
  const [callType, setCallType] = useState("");
  const [username, setUsername] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [callReason, setCallReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdVow, setCreatedVow] = useState<VowRecord | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!callType || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/vows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenAddress,
          scanId,
          callType,
          username: username.trim() || undefined,
          walletAddress: walletAddress.trim() || undefined,
          callReason: callReason.trim() || undefined,
          monkVerdictAtCall: monkVerdict,
          tokenData,
        }),
      });

      const json: VowsResponse = await res.json();

      if (!json.success || !json.vow) {
        setError(json.error ?? "The Temple could not record your Vow.");
        return;
      }

      setCreatedVow(json.vow);
      onVowCreated?.(json.vow);
    } catch {
      setError("Network error. The Temple is unreachable.");
    } finally {
      setSubmitting(false);
    }
  };

  if (createdVow) {
    return (
      <section className="relative overflow-hidden rounded-2xl border border-solana-green/35 bg-gradient-to-br from-solana-green/5 via-temple-surface/40 to-solana-purple/5 px-6 py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-solana-green/5 via-transparent to-transparent" />
        <div className="relative text-center">
          <Badge variant="green" className="mb-4">
            Vow recorded
          </Badge>
          <h2 className="text-xl font-bold text-monk-text sm:text-2xl">
            Your Vow has entered the Temple.
          </h2>
          <p className="mt-2 text-sm text-monk-muted">
            The chart has not yet judged. Your call:{" "}
            <span className="font-medium text-monk-text">
              {createdVow.callType}
            </span>
          </p>
          <PendingTimers vow={createdVow} />
          <p className="mt-6 text-xs text-monk-muted/70">
            Not financial advice. Public calls are for ritual and reputation
            only.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-dashed border-solana-green/35 bg-gradient-to-br from-solana-green/5 via-temple-surface/40 to-solana-purple/5 px-6 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-solana-green/5 via-transparent to-transparent" />
      <div className="relative">
        <SectionHeader
          eyebrow="Monk Trials"
          title="Make Your Vow"
          subtitle="Agree or disagree with the Monk. Public Vows resolve after 1H / 3H / 24H. The chart has not yet judged."
        />

        <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4">
          <div>
            <label
              htmlFor="call-type"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-monk-muted"
            >
              Your call
            </label>
            <select
              id="call-type"
              value={callType}
              onChange={(e) => setCallType(e.target.value)}
              required
              className="w-full rounded-xl border border-temple-border bg-temple-bg/80 px-4 py-2.5 text-sm text-monk-text outline-none transition-colors focus:border-solana-green/50"
            >
              <option value="">Select a call type…</option>
              {VOW_CALL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="vow-username"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-monk-muted"
              >
                Username <span className="normal-case text-monk-muted/60">(optional)</span>
              </label>
              <input
                id="vow-username"
                type="text"
                maxLength={32}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Anonymous monk"
                className="w-full rounded-xl border border-temple-border bg-temple-bg/80 px-4 py-2.5 text-sm text-monk-text placeholder:text-monk-muted/50 outline-none transition-colors focus:border-solana-green/50"
              />
            </div>
            <div>
              <label
                htmlFor="vow-wallet"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-monk-muted"
              >
                Wallet <span className="normal-case text-monk-muted/60">(optional)</span>
              </label>
              <input
                id="vow-wallet"
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Solana address"
                className="w-full rounded-xl border border-temple-border bg-temple-bg/80 px-4 py-2.5 text-sm text-monk-text placeholder:text-monk-muted/50 outline-none transition-colors focus:border-solana-green/50"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="vow-reason"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-monk-muted"
            >
              Reason <span className="normal-case text-monk-muted/60">(optional)</span>
            </label>
            <textarea
              id="vow-reason"
              maxLength={280}
              rows={3}
              value={callReason}
              onChange={(e) => setCallReason(e.target.value)}
              placeholder="Why do you see it differently from the Monk?"
              className="w-full resize-none rounded-xl border border-temple-border bg-temple-bg/80 px-4 py-2.5 text-sm text-monk-text placeholder:text-monk-muted/50 outline-none transition-colors focus:border-solana-green/50"
            />
            <p className="mt-1 text-right text-xs text-monk-muted/60">
              {callReason.length}/280
            </p>
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={!callType || submitting}
              className="rounded-xl border border-solana-green/50 bg-solana-green/10 px-12 py-4 text-base font-semibold text-solana-green shadow-lg shadow-solana-green/5 transition-colors hover:bg-solana-green/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Entering the Temple…" : "Make Your Vow"}
            </button>
            <p className="mt-4 text-xs text-monk-muted/70">
              Not financial advice. Wallet connect coming later — paste an
              address if you wish to be named.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
