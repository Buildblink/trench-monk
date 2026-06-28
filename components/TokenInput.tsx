"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { isValidSolanaAddress } from "@/lib/format";

export function TokenInput() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = address.trim();

    if (!trimmed) {
      setError("Paste a Solana token address.");
      return;
    }

    if (!isValidSolanaAddress(trimmed)) {
      setError("That does not look like a valid Solana address.");
      return;
    }

    setError("");
    router.push(`/sermon/${trimmed}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (error) setError("");
            }}
            placeholder="Paste Solana token address..."
            className="w-full min-w-0 rounded-xl border border-temple-border bg-temple-surface/80 px-4 py-4 font-mono text-sm text-monk-text placeholder:text-monk-muted/60 outline-none transition-all focus:border-solana-purple/60 focus:ring-2 focus:ring-solana-purple/20 sm:py-3.5"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="w-full shrink-0 rounded-xl bg-gradient-to-r from-solana-purple to-solana-green px-8 py-4 text-sm font-semibold text-temple-bg transition-all hover:opacity-90 hover:shadow-lg hover:shadow-solana-purple/25 active:scale-[0.98] sm:w-auto sm:py-3.5"
        >
          Receive Sermon
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
