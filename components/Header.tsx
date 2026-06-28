import Link from "next/link";

export function Header() {
  return (
    <header className="relative z-20 border-b border-temple-border/60 bg-temple-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-solana-purple/40 bg-temple-elevated glow-purple">
            <span className="text-lg" aria-hidden>
              🧘
            </span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-monk-text">
              Trench Monk
            </div>
            <div className="text-xs text-solana-green">$SERMON</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-monk-muted sm:flex">
          <Link href="/#monk-live" className="transition-colors hover:text-solana-green">
            Monk Live
          </Link>
          <Link href="/#recent-sermons" className="transition-colors hover:text-solana-green">
            Sermons
          </Link>
          <Link href="/#how-it-works" className="transition-colors hover:text-solana-green">
            How It Works
          </Link>
        </nav>

        <div className="rounded-full border border-candle-orange/30 bg-candle-orange/10 px-3 py-1 text-xs text-candle-glow">
          Phase 2 · Council Live
        </div>
      </div>
    </header>
  );
}
