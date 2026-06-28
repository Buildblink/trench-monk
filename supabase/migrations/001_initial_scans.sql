create table if not exists scans (
  id uuid primary key default gen_random_uuid(),
  token_address text not null,
  chain text default 'solana',
  symbol text,
  name text,
  pair_address text,
  dex text,
  price_usd numeric,
  market_cap numeric,
  fdv numeric,
  liquidity_usd numeric,
  volume_5m numeric,
  volume_1h numeric,
  volume_6h numeric,
  volume_24h numeric,
  pair_created_at timestamptz,
  raw_data jsonb,
  pre_analysis jsonb,
  data_coverage jsonb,
  dev_detective_output jsonb,
  wallet_monk_output jsonb,
  narrative_oracle_output jsonb,
  final_monk_output jsonb,
  verdict text,
  clarity_score integer,
  main_danger text,
  monk_quote text,
  confidence text,
  best_use_case text,
  created_at timestamptz default now()
);

create index if not exists scans_token_address_idx on scans (token_address);
create index if not exists scans_created_at_idx on scans (created_at desc);
create index if not exists scans_verdict_idx on scans (verdict);
create index if not exists scans_clarity_score_idx on scans (clarity_score);
