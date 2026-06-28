Yes — make one **single reference doc** first. Put it in your repo as:

`TRĒNCH_MONK_SPEC.md` or `PRODUCT_SPEC.md`

Then Cursor can always refer back to it instead of drifting.

Copy this into Cursor as the master spec:

# Trench Monk / $SERMON — Product + Build Spec

## 0. Core Concept

**Project name:** Trench Monk
**Ticker:** $SERMON
**Category:** Solana memecoin + AI reputation game + token risk interpretation tool
**Tagline:** Before you ape, receive a sermon.
**Secondary tagline:** Call it before the chart calls it.
**Philosophy:** All candles are impermanent. On-chain karma is forever.

Trench Monk is a fictional cyber-monk for the Solana trenches. It analyzes Solana tokens through a visible AI Council, gives a brutal but useful “sermon,” and lets users publicly call what happens next before the chart proves them right or wrong.

The project is not just an AI scanner. It is a live ritual/game:

1. Paste a token address.
2. Receive a Sermon from the Monk Council.
3. See the Karma Map.
4. Make your Vow: agree or disagree with the Monk.
5. Wait 1H / 3H / 24H.
6. The chart judges the outcome.
7. Correct hard calls earn Wisdom and proof cards.

The goal is to make the website feel alive from day one, even with a small community.

---

## 1. Brand Language

### Main Brand Terms

| Normal term               | Trench Monk term  |
| ------------------------- | ----------------- |
| Token analysis            | Sermon            |
| Prediction / public call  | Vow               |
| Reputation points         | Wisdom            |
| Wallet/risk visualization | Karma Map         |
| Auto-scanned tokens       | Monk Live         |
| Prediction rounds         | Monk Trials       |
| Historical rug patterns   | Past Lives        |
| Rug/risk database         | Book of Suffering |
| Early holders             | Genesis Monks     |
| Community                 | The Temple        |
| Treasury                  | Temple Treasury   |
| Bounty pool               | Blessing Pool     |
| Burn/reserve action       | Burn the Greed    |
| Final AI verdict          | The Monk’s View   |

### Tone

The Monk speaks in short, calm, brutal, slightly poetic lines.

He is not a hype account.
He is not bullish or bearish.
He is detached.

He uses Buddhist-inspired ideas as metaphor:

* impermanence
* attachment
* craving
* illusion
* karma
* clear seeing
* the Middle Path
* hungry ghosts

Do not make it feel like a real religion or spiritual authority. The Monk is fictional and crypto-native.

### Example Monk Quotes

* “All candles are impermanent. Especially the green ones.”
* “The candle is green. Your mind is not.”
* “Attachment begins when you screenshot unrealized profit.”
* “The dev did not disappear. He simply achieved exit.”
* “Top holders are meditating near the sell button.”
* “The chart gave you 60%. Craving asked for 600%.”
* “The liquidity is thin. Your hope is thick.”
* “You did not find conviction. You found a green candle and named it destiny.”
* “The wallet has spoken. The story is decoration.”
* “The dev has many past lives. Few reached enlightenment.”
* “The wise ape takes profit. The foolish ape becomes a testimonial.”

---

## 2. Product Positioning

### One-liner

Trench Monk is the AI reputation layer for Solana trenches — it tells you what the data is trying to do to your bag, then lets you prove you saw the move before the chart did.

### Short Website Hero

**Before you ape, receive a sermon.**

Paste any Solana token.
Watch the Monk Council read dev karma, wallet ghosts, narrative illusion, and past-life patterns.
Make your Vow.
Beat the Monk before the chart reveals the truth.

### X Bio

AI monk for Solana trenches.
Sermons. Vows. Karma Maps.
Call it before the chart calls it.
Powered by $SERMON.

---

## 3. Day-One Product Loop

The launch version must be narrow but complete.

### The Temple Loop

1. **Receive Sermon**

   * User pastes token CA.
   * App fetches token data.
   * AI Council analyzes token.
   * Final Monk gives verdict.

2. **Study Karma**

   * App shows token summary and Karma Map Lite.
   * User sees dev, liquidity, holder, and narrative risks.

3. **Make Your Vow**

   * User publicly calls what happens next:

     * Clear Mind
     * Scalp Only
     * Hungry Ghosts
     * Dev Karma
     * False Temple
     * Dead Candle
     * CTO Rebirth
     * Exit Ceremony
     * Do Not Ape
     * Meditate First

4. **Face the Candle**

   * Call resolves after 1H / 3H / 24H.
   * System compares market cap, liquidity, volume, and risk events.

5. **Gain Wisdom**

   * Correct calls earn Wisdom.
   * Hard calls earn more.
   * Beating the Monk earns bonus Wisdom.
   * User receives proof card.

---

## 4. V1 Features

### Must-have for V1

1. **Home page**

   * Strong brand
   * Token CA input
   * Monk Live feed
   * Recent Sermons
   * Recent resolved Vows
   * CTA: Receive Sermon

2. **Token Scan / Sermon page**

   * Token summary
   * Monk Council debate
   * Final Monk verdict
   * Clarity Score
   * Main danger
   * What to watch next
   * Karma Map Lite
   * Make Your Vow button
   * Share Sermon Card button

3. **Monk Council**

   * Dev Detective
   * Wallet Monk
   * Narrative Oracle
   * Final Monk

4. **Karma Map Lite**

   * Visual risk panel, not full wallet clustering yet
   * Shows dev risk, liquidity risk, holder risk, bundler/sniper placeholders if unavailable, narrative risk

5. **Call Before Candle**

   * User submits a Vow
   * Vow is timestamped
   * Initial snapshot is saved
   * 1H/3H/24H timers shown

6. **Resolution engine**

   * Basic automatic or semi-automatic resolution
   * Compare initial vs later market cap/liquidity
   * Mark as correct/wrong/pending
   * Award Wisdom

7. **Proof cards**

   * Shareable card for:

     * Sermon
     * Beat the Monk
     * Monk Was Right
     * Book of Suffering
     * Roast My Entry

8. **Monk Live**

   * App auto-scans selected trending/new tokens every 15–30 minutes
   * If full automation is too hard, admin can trigger scans manually at first
   * Homepage should look alive

9. **Roast My Entry**

   * User inputs:

     * token CA
     * entry market cap
     * current market cap
     * already sold? yes/no
   * Monk returns funny risk/profit-taking style roast
   * No direct financial advice language

10. **Genesis Monk status**

* Early holder/user placeholder
* Badge system can be simple at first

---

## 5. What Not To Build First

Do not build these in V1:

* staking
* passive rewards
* governance
* automated token buybacks
* auto-trading
* wallet copy trading
* complex wallet clustering
* AI voice
* Telegram bot as the main product
* full paid subscription system
* complex smart contracts
* on-chain prediction markets

V1 should be:

**Website first. Ritual first. Alive first.**

---

## 6. Tech Stack

### Recommended Stack

* Next.js App Router
* TypeScript
* Tailwind CSS
* Supabase
* OpenAI API
* DexScreener API for token/pair data
* Optional later:

  * Solana Tracker
  * Birdeye
  * Helius
  * GMGN AI / skills if accessible
* `@vercel/og` for image cards
* Vercel for deployment

### Why no CrewAI initially?

Keep agents as TypeScript server functions first:

* easier to deploy
* easier to debug
* works inside Next.js API routes
* no Python infra needed

Agent structure:

```ts
runDevDetective(tokenData)
runWalletMonk(tokenData)
runNarrativeOracle(tokenData)
runFinalMonk(tokenData, agentOutputs)
```

---

## 7. Data Sources

### V1 minimum

Use DexScreener first:

* token name
* symbol
* price
* market cap / FDV
* liquidity
* volume
* pair age
* pair address
* chain
* DEX
* boosts / paid info if available
* token socials if available

### V1.5 optional

Add Solana Tracker / Birdeye / Helius for:

* top holders
* holder count
* token security
* mint/freeze authority
* largest token accounts
* wallet-level data

### V2 optional

Add GMGN-style intelligence for:

* dev launch history
* bundlers
* snipers
* smart money
* KOL wallets
* insiders
* top traders

Important: The product should not depend on a single provider.

---

## 8. Supabase Schema

### `scans`

Stores every Sermon.

Fields:

```sql
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
dev_detective_output jsonb,
wallet_monk_output jsonb,
narrative_oracle_output jsonb,
final_monk_output jsonb,
verdict text,
clarity_score integer,
main_danger text,
monk_quote text,
call_difficulty text,
created_at timestamptz default now()
```

### `vows`

Stores public calls.

```sql
id uuid primary key default gen_random_uuid(),
scan_id uuid references scans(id),
token_address text not null,
wallet_address text,
username text,
call_type text not null,
call_reason text,
monk_verdict_at_call text,
initial_market_cap numeric,
initial_liquidity_usd numeric,
initial_price_usd numeric,
resolve_1h_at timestamptz,
resolve_3h_at timestamptz,
resolve_24h_at timestamptz,
result_1h text default 'pending',
result_3h text default 'pending',
result_24h text default 'pending',
wisdom_awarded integer default 0,
beat_monk boolean default false,
created_at timestamptz default now()
```

### `users`

```sql
id uuid primary key default gen_random_uuid(),
wallet_address text unique,
username text,
wisdom integer default 0,
calls_made integer default 0,
calls_won integer default 0,
beat_monk_count integer default 0,
genesis_monk boolean default false,
created_at timestamptz default now()
```

### `monk_live`

```sql
id uuid primary key default gen_random_uuid(),
scan_id uuid references scans(id),
token_address text not null,
status text default 'pending',
scheduled_resolve_at timestamptz,
created_at timestamptz default now()
```

### `proof_cards`

```sql
id uuid primary key default gen_random_uuid(),
vow_id uuid references vows(id),
scan_id uuid references scans(id),
card_type text,
image_url text,
metadata jsonb,
created_at timestamptz default now()
```

---

## 9. AI Council Design

### Output Format

Every agent must return structured JSON.

No vague paragraphs only.

### Dev Detective

Role:

Reader of past lives.

Analyzes:

* dev/creator signs if available
* token age
* suspicious launch patterns
* liquidity quality
* dev risk signals
* previous launch history if available
* mint/freeze risk if available

Output:

```json
{
  "agent": "Dev Detective",
  "subtitle": "Reader of past lives",
  "risk_level": "low | medium | high | unknown",
  "observations": ["..."],
  "warnings": ["..."],
  "monk_line": "This dev has many past lives. Few reached enlightenment."
}
```

### Wallet Monk

Role:

Keeper of on-chain karma.

Analyzes:

* liquidity/market cap ratio
* holder concentration if available
* top holders if available
* whale risk
* bundler/sniper placeholders if not available
* early seller risk
* volume quality

Output:

```json
{
  "agent": "Wallet Monk",
  "subtitle": "Keeper of on-chain karma",
  "risk_level": "low | medium | high | unknown",
  "observations": ["..."],
  "warnings": ["..."],
  "monk_line": "The supply is not distributed. It is hiding in robes."
}
```

### Narrative Oracle

Role:

Watcher of illusion.

Analyzes:

* meme/story strength
* token name/symbol
* DEX paid/boosts if available
* social links if available
* timing of attention
* whether narrative feels early or exhausted

Output:

```json
{
  "agent": "Narrative Oracle",
  "subtitle": "Watcher of illusion",
  "risk_level": "low | medium | high | unknown",
  "observations": ["..."],
  "warnings": ["..."],
  "monk_line": "The meme is loud, but the timing smells late."
}
```

### Final Monk

Role:

The one who does not ape.

Inputs:

* token data
* all agent outputs

Output:

```json
{
  "verdict": "Clear Mind | Scalp Only | Hungry Ghosts | Dev Karma | False Temple | Dead Candle | CTO Rebirth | Exit Ceremony | Do Not Ape | Meditate First",
  "clarity_score": 0,
  "main_danger": "...",
  "summary": "...",
  "what_to_watch_next": ["..."],
  "call_difficulty": "easy | medium | hard | unknown",
  "monk_quote": "...",
  "disclaimer": "This is educational and entertainment content, not financial advice."
}
```

---

## 10. Verdict Definitions

### Clear Mind

Clean enough to watch. Not a buy signal.

### Scalp Only

May move, but not trustworthy enough to hold casually.

### Hungry Ghosts

Bundlers, snipers, top holders, or early wallets may be waiting to eat liquidity.

### Dev Karma

Dev history, dev wallet behavior, or creator-linked risk is the main problem.

### False Temple

Looks legit from the outside, but the structure is weak.

### Dead Candle

Likely bounce failure or weak recovery.

### CTO Rebirth

Community takeover or revival may be possible.

### Exit Ceremony

KOL, insiders, or early buyers may be using attention as exit liquidity.

### Do Not Ape

Too many risk signals.

### Meditate First

Data is too unclear. Wait.

---

## 11. Scoring / Wisdom Logic

### Difficulty-adjusted rewards

Obvious calls should not get big rewards.

| Difficulty    | Example                      | Wisdom     |
| ------------- | ---------------------------- | ---------- |
| Easy          | obvious rug already visible  | 0–5        |
| Medium        | mixed setup                  | 20–50      |
| Hard          | non-obvious danger or runner | 80–150     |
| Beat the Monk | user correct, Monk wrong     | multiplier |

### Anti-spam rules

* no rewards if liquidity is below minimum
* no rewards if token already dumped before call
* one active call per token per wallet
* repeated “rug” spam lowers multiplier
* wrong calls reduce accuracy score
* self-created tokens excluded from rewards
* big rewards require a reason
* admin can manually review Genesis bounties

### Resolution basics

For V1, simple heuristics are okay.

Examples:

#### Clean Runner correct if:

* market cap up meaningfully after 1H/3H
* liquidity not collapsed
* volume still healthy
* no massive dump event detected

#### Dead Candle correct if:

* token pumps briefly then falls below call-time MC
* lower low after bounce

#### Do Not Ape correct if:

* token drops significantly
* liquidity collapses
* or major risk event happens

#### Hungry Ghosts correct if:

* top/bundler/early wallet data confirms sell pressure if available
* or token dumps hard after clear early concentration signal

#### Dev Karma correct if:

* dev sell/removal/risky dev action detected if available
* or token behaves like dev-risk setup

If data is insufficient, mark result as:

* unresolved
* partial
* manual review

---

## 12. Pages and UI

### Home Page

Sections:

1. Hero

   * “Before you ape, receive a sermon.”
   * Token input
   * CTA: Receive Sermon

2. Monk Live

   * Auto-scanned tokens
   * pending and resolved cards

3. Recent Proof

   * Beat the Monk cards
   * Monk Was Right cards

4. How It Works

   * Receive Sermon
   * Make Your Vow
   * Face the Candle
   * Gain Wisdom

5. Temple language

   * Sermons
   * Vows
   * Karma Maps
   * Wisdom

### Sermon Page

Sections:

1. Token summary
2. Council Debate
3. Final Monk Verdict
4. Karma Map Lite
5. Make Your Vow
6. Share Sermon Card
7. Recent Vows for this token

### Monk Live Page

* list of live scans
* pending timers
* resolved outcomes
* filters:

  * 1H
  * 3H
  * 24H
  * Monk was right
  * user beat Monk

### My Temple Page

Requires wallet connect later.

* Wisdom score
* Vows made
* Vows won/lost
* Beat the Monk count
* badges
* Genesis Monk status

### Treasury Page

Can be simple placeholder first.

* Temple Treasury concept
* public wallet placeholders
* fee split
* “Build the Temple”
* “Bless the Monks”
* “Spread the Sermon”
* “Guard the Pool”
* “Keep the Monk Alive”

---

## 13. Token Utility

Do not make the token utility scattered.

Use one clear sentence:

**$SERMON powers the Temple: Council scans, public Vows, Monk Trials, Karma Maps, proof cards, and Genesis status.**

### Free users

* limited scans
* view Monk Live
* view public proof cards

### $SERMON holders

* more scans
* full Council Debate
* Karma Map access
* submit public Vows
* enter Monk Trials
* generate proof cards
* Genesis Monk status if early

### Later

* priority scan queue
* advanced Rug Memory / Past Lives
* custom watchlists
* alerts
* Telegram bot
* API access

Avoid leading with:

* passive income
* APY
* guaranteed buybacks
* revenue share
* investment language

---

## 14. Treasury / Burn

Burn is optional and symbolic.

Use:

**Burn the Greed**

Do not promise fixed buybacks or guaranteed burn.

Suggested Temple Treasury split:

| Bucket                         |   % | Name                            |
| ------------------------------ | --: | ------------------------------- |
| Product/API/data               | 35% | Build the Temple                |
| Bounties/rewards               | 25% | Bless the Monks                 |
| Marketing/content              | 20% | Spread the Sermon               |
| Reserve/liquidity/burn actions | 10% | Guard the Pool / Burn the Greed |
| Founder/operator               | 10% | Keep the Monk Alive             |

Marketing line:

**Fees fund the Temple. Sometimes the Monk builds. Sometimes he blesses. Sometimes he burns greed.**

---

## 15. Legal / Safety Language

Keep wording as:

* entertainment
* education
* risk interpretation
* access token
* reputation game
* no financial advice
* no profit promise
* no passive yield

Always include somewhere:

> Trench Monk does not provide financial advice. Sermons are educational and entertainment content. Crypto tokens are highly risky. Always do your own research.

Avoid:

* “guaranteed”
* “investment”
* “profit”
* “holders earn revenue”
* “passive income”
* “APY”
* “we will pump”
* “price support”

---

## 16. Visual Direction

### Theme

Dark cyber-temple inside Solana trenches.

Colors:

* near-black background
* Solana purple
* Solana green
* warm orange candlelight
* red danger accents

### Main Mascot

Cyber-monk sitting on a candlestick meditation mat.

Surroundings:

* red/green candles
* wallet ghosts
* rug rats
* broken charts
* glowing Solana symbols
* red thread wallet connections

### Reaction States

Create 7 states:

1. Calm
2. Suspicious
3. Warning bell
4. Facepalm
5. Seeing ghosts
6. Burning greed
7. Enlightened

### Icons

| Concept        | Icon idea                 |
| -------------- | ------------------------- |
| Dev Karma      | skull wallet / old scroll |
| Hungry Ghosts  | ghost wallets             |
| False Temple   | cracked temple            |
| Dead Candle    | extinguished candle       |
| CTO Rebirth    | lotus relit               |
| Exit Ceremony  | open red exit door        |
| Clear Mind     | clean flame / lotus       |
| Meditate First | closed eye                |

---

## 17. Share Cards

### Sermon Card

Includes:

* token symbol
* verdict
* clarity score
* main danger
* monk quote
* Trench Monk branding

### Beat the Monk Card

Includes:

* user
* user call
* Monk call
* result
* Wisdom gained
* quote:
  “The student saw the shadow before the teacher.”

### Monk Was Right Card

Includes:

* token
* Monk verdict
* result
* quote:
  “The chart eventually tells the truth.”

### Book of Suffering Card

Includes:

* failed token
* lesson
* quote:
  “The pain was avoidable. The attachment was not.”

### Roast My Entry Card

Includes:

* entry MC
* current MC
* status
* quote

---

## 18. Launch Plan

### Pre-launch 3–7 days

Do not post CA first.

Post:

* Monk art
* wisdom/degen quotes
* UI teasers
* fake/static Sermon examples
* Karma Map teaser
* Council Debate teaser
* “Would you beat the Monk?” poll
* “No Ape Mode” memes
* “All candles are impermanent” meme

### Launch day

Must have working:

* website
* Ask the Monk
* Council Debate
* Sermon Card
* Monk Live
* Make Your Vow
* 1H/3H pending timers
* at least basic resolution or manual admin resolution

Launch event:

**Genesis Monk Trial**

For first 24 hours:

* Monk Live scans every 15–30 minutes
* users submit Vows
* 1H/3H resolutions posted
* proof cards shared
* best calls featured
* small Blessing Pool / status rewards

### First 72 hours

Post constantly:

* Morning Sermon
* Hungry Ghost Hour
* Book of Suffering recap
* Beat the Monk proof cards
* Genesis Monk shoutouts
* Burn the Greed / treasury transparency if applicable

---

## 19. Cursor Build Plan

### Phase 1 — Foundation

Build:

* Next.js app
* Tailwind theme
* homepage
* token input
* `/api/scan`
* DexScreener fetch
* scan result page

Goal:

Token address → token data → visible page.

### Phase 2 — AI Council

Build:

* `lib/monk/dev-detective.ts`
* `lib/monk/wallet-monk.ts`
* `lib/monk/narrative-oracle.ts`
* `lib/monk/final-monk.ts`
* OpenAI structured JSON calls
* display Council Debate

Goal:

Token address → Council Debate → Final Monk Verdict.

### Phase 3 — Supabase

Build tables:

* scans
* vows
* users
* monk_live
* proof_cards

Save scans and Vows.

### Phase 4 — Make Your Vow

Build:

* Vow submission form
* call type selector
* call reason
* pending timers
* token snapshot save

### Phase 5 — Resolution

Build:

* resolution route
* cron or manual admin button
* compare current vs initial data
* mark outcome
* assign Wisdom

### Phase 6 — Cards

Build:

* `@vercel/og` card route
* Sermon Card
* Beat the Monk Card
* Monk Was Right Card
* Roast My Entry Card

### Phase 7 — Monk Live

Build:

* admin-triggered auto scan first
* later cron scanning trending tokens
* homepage feed

---

## 20. First Cursor Prompt

Use this first.

```text
Build a Next.js App Router project called Trench Monk.

Stack:
- Next.js
- TypeScript
- Tailwind CSS
- Supabase setup
- API routes
- DexScreener API as first token data source
- OpenAI integration will be added after token data works

Concept:
Trench Monk is an AI monk for Solana memecoin analysis. Users paste a Solana token address and receive a “Sermon” — a risk interpretation from the Monk Council.

Brand:
Project: Trench Monk
Ticker: $SERMON
Tagline: Before you ape, receive a sermon.
Secondary: Call it before the chart calls it.

Build these pages:
1. Home page
- dark cyber-temple UI
- token address input
- CTA: Receive Sermon
- sections: Monk Live, Recent Sermons, Beat the Monk, How It Works

2. Sermon page
- route: /sermon/[tokenAddress]
- token summary card
- placeholder Council Debate
- placeholder Final Monk Verdict
- placeholder Karma Map Lite
- button: Make Your Vow

API:
Create /api/scan
- accepts tokenAddress
- fetches DexScreener data
- normalizes token data
- returns JSON

Design:
Dark UI, Solana purple/green glow, warm orange candlelight accents.
Premium crypto dashboard mixed with fictional monk branding.

Do not build wallet connect yet.
Do not build token gating yet.
Do not build staking/governance.
Focus only on token input → API fetch → sermon page flow.
```

---

## 21. Second Cursor Prompt

Use after Phase 1 works.

```text
Add the Monk Council AI layer.

Create server-side functions:
- runDevDetective(tokenData)
- runWalletMonk(tokenData)
- runNarrativeOracle(tokenData)
- runFinalMonk(tokenData, agentOutputs)

Use OpenAI API. Return strict structured JSON.

Agents:

1. Dev Detective
Subtitle: Reader of past lives
Analyze dev/creator risk if available, token age, suspicious launch signs, liquidity quality, mint/freeze risk if available.

2. Wallet Monk
Subtitle: Keeper of on-chain karma
Analyze liquidity/MC ratio, holder concentration if available, whale risk, top holder risk if available, volume quality.

3. Narrative Oracle
Subtitle: Watcher of illusion
Analyze token name/symbol/story, DEX paid/boosts if available, socials if available, attention timing, meme strength.

4. Final Monk
Subtitle: The one who does not ape
Summarize all agents and return:
- verdict
- clarity_score 0-100
- main_danger
- summary
- what_to_watch_next array
- call_difficulty
- monk_quote
- disclaimer

Allowed verdicts:
Clear Mind, Scalp Only, Hungry Ghosts, Dev Karma, False Temple, Dead Candle, CTO Rebirth, Exit Ceremony, Do Not Ape, Meditate First.

Display the full Council Debate on /sermon/[tokenAddress].

Tone:
Calm, funny, brutal, Buddhist-inspired metaphor, no direct buy/sell financial advice.
```

---

## 22. Third Cursor Prompt

Use after AI Council works.

```text
Add Supabase persistence and Vows.

Create Supabase SQL migrations for:
- scans
- vows
- users
- monk_live
- proof_cards

When a scan is generated:
- save normalized token data
- save raw API data
- save AI Council outputs
- save final verdict fields

Add Make Your Vow component:
- call type selector
- reason textarea
- optional username
- wallet address optional for now
- submit creates a vow linked to the scan

Call types:
Clear Mind, Scalp Only, Hungry Ghosts, Dev Karma, False Temple, Dead Candle, CTO Rebirth, Exit Ceremony, Do Not Ape, Meditate First.

When vow is submitted:
- save initial market cap, liquidity, price
- set resolve_1h_at, resolve_3h_at, resolve_24h_at
- show pending timers on the Sermon page
```

---

## 23. Fourth Cursor Prompt

Use after Vows work.

```text
Add basic Vow resolution.

Create /api/resolve-vows route:
- finds pending vows whose resolve time has passed
- fetches current token data from DexScreener
- compares current market cap/liquidity/price to initial snapshot
- applies simple heuristic rules
- marks result_1h/result_3h/result_24h as correct, wrong, partial, or unresolved
- awards Wisdom
- sets beat_monk true if user disagreed with Monk and was correct

Add admin page /admin/resolve with a button to run resolution manually.
Do not require auth yet, but add a TODO for protecting admin routes before public launch.

Show resolved proof cards on home page and Sermon page.
```

---

## 24. Fifth Cursor Prompt

Use after resolution works.

```text
Add shareable image cards using @vercel/og.

Routes:
- /api/og/sermon/[scanId]
- /api/og/vow/[vowId]
- /api/og/roast

Card types:
1. Sermon Card
2. Beat the Monk Card
3. Monk Was Right Card
4. Book of Suffering Card
5. Roast My Entry Card

Style:
Dark cyber-temple background.
Solana purple/green glow.
Orange candlelight accent.
Large verdict text.
Monk quote.
Trench Monk / $SERMON branding.

Add share buttons that copy the card URL and suggested X text.
```

---

## 25. Definition of Done for Launch

Do not launch the coin unless these work:

* homepage looks polished
* paste CA works
* DexScreener fetch works
* AI Council outputs real structured analysis
* Sermon page looks shareable
* Make Your Vow works
* Vows are saved
* at least manual 1H/3H resolution works
* proof cards work
* Monk Live has at least manually triggered scans
* X account has branding and some posts
* no empty roadmap-only feeling

Golden rule:

**Do not launch $SERMON with only a roadmap. Launch it with a ritual people can immediately use.**

