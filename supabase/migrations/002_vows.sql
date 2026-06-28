create table if not exists vows (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid references scans(id) on delete set null,
  token_address text not null,
  wallet_address text,
  username text,
  call_type text not null,
  call_reason text,
  monk_verdict_at_call text,
  initial_market_cap numeric,
  initial_liquidity_usd numeric,
  initial_price_usd numeric,
  initial_fdv numeric,
  resolve_1h_at timestamptz,
  resolve_3h_at timestamptz,
  resolve_24h_at timestamptz,
  result_1h text default 'pending',
  result_3h text default 'pending',
  result_24h text default 'pending',
  wisdom_awarded integer default 0,
  beat_monk boolean default false,
  created_at timestamptz default now()
);

create index if not exists vows_token_address_idx on vows (token_address);
create index if not exists vows_scan_id_idx on vows (scan_id);
create index if not exists vows_created_at_idx on vows (created_at desc);
create index if not exists vows_result_1h_idx on vows (result_1h);
create index if not exists vows_result_3h_idx on vows (result_3h);
create index if not exists vows_result_24h_idx on vows (result_24h);

alter table public.vows enable row level security;
