# Trench Monk — Test Tokens & Manual QA

Use these scenarios to verify Phase 2.2 (Council calibration, pair-liquidity context, and output quality).

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

## 1. BONK (established token — calibration check)

**Address:** `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263`

**Expected behavior (Phase 2.2):**
- Should **not** auto-label **Hungry Ghosts** solely because selected-pair liquidity is small vs FDV/market cap
- Data Coverage shows **pair liquidity disclaimer** and context tiers (size: large, liquidity: high, pair age: established)
- Wallet Monk should note selected-pair limitation calmly
- Agents should **not** all repeat the same liquidity/FDV evidence
- Final Monk likely: **Meditate First**, **Scalp Only**, or **Watchlist only** — balanced, not alarmist
- Must state top holders, bundlers, snipers, dev wallet history are **not in current data**
- Metrics formatted cleanly (e.g. `0.0052%`, `$109.11M`, `347d 7h`)

**How to test:**
1. Paste address → **Receive Sermon**
2. Verify token summary says **Selected Pair Liquidity**
3. Check Data Coverage tiers and disclaimer
4. Review agent cards for distinct domains and max 3 evidence bullets each
5. Confirm verdict is cautious, not rug-theater

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
1. Home page: paste `not-a-valid-address` → validation error before navigation
2. Or visit `/sermon/not-a-valid-address` directly
3. Scan API returns `400 Invalid Solana token address`

**API test:**

```bash
curl "http://localhost:3000/api/scan?tokenAddress=invalid"
```

---

## 4. Very new / microcap token (manual)

1. Open [DexScreener Solana new pairs](https://dexscreener.com/solana)
2. Pick a token under **6 hours old** and/or **&lt; $50K selected-pair liquidity**
3. Copy the token CA and run a Sermon

**Expected:**
- Context tiers: size micro/small, liquidity very_low/low, pair age new
- Multiple risk flags when justified (new pair + thin liquidity, etc.)
- Severe warnings allowed when **multiple signals** align
- Still no invented bundler/sniper/dev history

---

## 5. Token with no DexScreener pair

**Expected:** Scan returns `404 No trading pair found`

---

## Build check

```bash
npm run build
```

Must pass with no type errors.
