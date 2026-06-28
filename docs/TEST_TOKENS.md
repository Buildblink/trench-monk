# Trench Monk — Test Tokens & Manual QA

Use these scenarios to verify Phase 2.1 (Monk Council quality, data coverage, and error handling).

## Prerequisites

```bash
npm run dev
```

Ensure `.env.local` contains:

```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini   # optional
```

---

## 1. BONK (known liquid token)

**Address:** `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263`

**How to test:**
1. Paste address on home page → **Receive Sermon**
2. Confirm DexScreener token summary loads
3. Wait for Monk Council (~15–30s)
4. Check **Data Coverage** shows available fields (liquidity, FDV, volume, pair age, etc.)
5. Check **Unknown** lists holder/bundler/dev data
6. Agent cards should cite **evidence** with real ratios (e.g. liquidity/FDV %)
7. Final Monk should show verdict, confidence, best use case, data limitations

**API test:**

```bash
curl -X POST http://localhost:3000/api/monk-council \
  -H "Content-Type: application/json" \
  -d "{\"tokenAddress\":\"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263\"}"
```

---

## 2. Missing OpenAI key

**How to test:**
1. Rename or comment out `OPENAI_API_KEY` in `.env.local`
2. Restart dev server
3. Paste any valid token address
4. Token summary should still load
5. Council section shows: *"OpenAI API key not configured. Monk Council unavailable."*
6. Retry button should appear; re-enable key and retry to recover

**API test:** Same curl as above → expect `503` with `configured: false`

---

## 3. Invalid token address

**How to test:**
1. Home page: paste `not-a-valid-address` → should show validation error before navigation
2. Or visit `/sermon/not-a-valid-address` directly
3. Scan API should return `400 Invalid Solana token address`

**API test:**

```bash
curl "http://localhost:3000/api/scan?tokenAddress=invalid"
```

---

## 4. Very new / microcap token (manual)

DexScreener does not provide a fixed test CA — find one manually:

1. Open [DexScreener Solana new pairs](https://dexscreener.com/solana)
2. Pick a token under **6 hours old** and/or **&lt; $50K liquidity**
3. Copy the token CA and run a Sermon

**What to verify:**
- `preAnalysis` risk flags include `very_new_pair` and/or `thin_liquidity`
- Agents mark **confidence: low** when data is thin
- Final Monk `best_use_case` may be **"Too little data"** or **"Scalp-only risk check"**
- Council does **not** claim bundler/sniper/dev history
- **Data Limitations** section lists missing wallet-level intelligence

---

## 5. Token with no DexScreener pair

Use a valid Solana address that has no trading pair (e.g. a random wallet address):

`11111111111111111111111111111111` may fail validation; try a valid-format but unlisted mint if needed.

**Expected:** Scan returns `404 No trading pair found`

---

## Build check

```bash
npm run build
```

Must pass with no type errors.
