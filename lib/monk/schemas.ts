import { z } from "zod";

export const riskLevelSchema = z.enum(["low", "medium", "high", "unknown"]);

export const agentOutputSchema = z.object({
  agent: z.string(),
  subtitle: z.string(),
  risk_level: riskLevelSchema,
  observations: z.array(z.string()).min(1).max(6),
  warnings: z.array(z.string()).max(5),
  monk_line: z.string(),
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

export const finalMonkSchema = z.object({
  verdict: verdictSchema,
  clarity_score: z.number().min(0).max(100),
  main_danger: z.string(),
  summary: z.string(),
  what_to_watch_next: z.array(z.string()).min(1).max(6),
  call_difficulty: callDifficultySchema,
  monk_quote: z.string(),
  disclaimer: z.string(),
});

export const councilOutputSchema = z.object({
  devDetective: devDetectiveSchema,
  walletMonk: walletMonkSchema,
  narrativeOracle: narrativeOracleSchema,
  finalMonk: finalMonkSchema,
});

export type RiskLevel = z.infer<typeof riskLevelSchema>;
export type AgentOutput = z.infer<typeof agentOutputSchema>;
export type DevDetectiveOutput = z.infer<typeof devDetectiveSchema>;
export type WalletMonkOutput = z.infer<typeof walletMonkSchema>;
export type NarrativeOracleOutput = z.infer<typeof narrativeOracleSchema>;
export type Verdict = z.infer<typeof verdictSchema>;
export type CallDifficulty = z.infer<typeof callDifficultySchema>;
export type FinalMonkOutput = z.infer<typeof finalMonkSchema>;
export type CouncilOutput = z.infer<typeof councilOutputSchema>;
