import { z } from "zod";

export const riskLevelSchema = z.enum(["low", "medium", "high", "unknown"]);

export const confidenceSchema = z.enum(["low", "medium", "high"]);

export const agentOutputSchema = z.object({
  agent: z.string(),
  subtitle: z.string(),
  risk_level: riskLevelSchema,
  observations: z.array(z.string()).min(1).max(6),
  warnings: z.array(z.string()).max(5),
  monk_line: z.string(),
  data_available: z.array(z.string()).min(1).max(20),
  data_missing: z.array(z.string()).min(1).max(20),
  confidence: confidenceSchema,
  evidence: z.array(z.string()).min(1).max(6),
});

export const devDetectiveSchema = agentOutputSchema.extend({
  agent: z.literal("Dev Detective"),
  subtitle: z.literal("Reader of past lives"),
});

export const walletMonkSchema = agentOutputSchema.extend({
  agent: z.literal("Wallet Monk"),
  subtitle: z.literal("Keeper of on-chain karma"),
});

export const narrativeOracleSchema = agentOutputSchema.extend({
  agent: z.literal("Narrative Oracle"),
  subtitle: z.literal("Watcher of illusion"),
});

export const verdictSchema = z.enum([
  "Clear Mind",
  "Scalp Only",
  "Hungry Ghosts",
  "Dev Karma",
  "False Temple",
  "Dead Candle",
  "CTO Rebirth",
  "Exit Ceremony",
  "Do Not Ape",
  "Meditate First",
]);

export const callDifficultySchema = z.enum([
  "easy",
  "medium",
  "hard",
  "unknown",
]);

export const bestUseCaseSchema = z.enum([
  "Watchlist only",
  "Scalp-only risk check",
  "Narrative check",
  "Too little data",
  "Higher confidence risk read",
]);

export const finalMonkSchema = z.object({
  verdict: verdictSchema,
  clarity_score: z.number().min(0).max(100),
  main_danger: z.string(),
  summary: z.string(),
  what_to_watch_next: z.array(z.string()).min(1).max(6),
  call_difficulty: callDifficultySchema,
  monk_quote: z.string(),
  disclaimer: z.string(),
  data_limitations: z.array(z.string()).min(1).max(8),
  confidence: confidenceSchema,
  best_use_case: bestUseCaseSchema,
});

export const councilOutputSchema = z.object({
  devDetective: devDetectiveSchema,
  walletMonk: walletMonkSchema,
  narrativeOracle: narrativeOracleSchema,
  finalMonk: finalMonkSchema,
});

export type RiskLevel = z.infer<typeof riskLevelSchema>;
export type Confidence = z.infer<typeof confidenceSchema>;
export type AgentOutput = z.infer<typeof agentOutputSchema>;
export type DevDetectiveOutput = z.infer<typeof devDetectiveSchema>;
export type WalletMonkOutput = z.infer<typeof walletMonkSchema>;
export type NarrativeOracleOutput = z.infer<typeof narrativeOracleSchema>;
export type Verdict = z.infer<typeof verdictSchema>;
export type CallDifficulty = z.infer<typeof callDifficultySchema>;
export type BestUseCase = z.infer<typeof bestUseCaseSchema>;
export type FinalMonkOutput = z.infer<typeof finalMonkSchema>;
export type CouncilOutput = z.infer<typeof councilOutputSchema>;

export interface CouncilResult extends CouncilOutput {
  dataCoverage: {
    available: string[];
    missing: string[];
  };
}
