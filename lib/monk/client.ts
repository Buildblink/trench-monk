import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import type { z } from "zod";
import type { TokenData } from "@/lib/types";
import { buildPreAnalysis, type PreAnalysis } from "@/lib/monk/pre-analysis";
import type { AgentOutput } from "@/lib/monk/schemas";

export class CouncilUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CouncilUnavailableError";
  }
}

export function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

export function getOpenAIModel(): string {
  return process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
}

export function isCouncilConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

/** Build agent payload with deterministic pre-analysis. */
export function buildAgentPayload(tokenData: TokenData) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { raw, ...safe } = tokenData;
  const preAnalysis = buildPreAnalysis(tokenData);

  return {
    tokenData: safe,
    preAnalysis,
    councilRules: {
      doNotInvent: preAnalysis.data_missing,
      useEvidenceFrom: preAnalysis.data_available,
      riskFlags: preAnalysis.risk_flags,
    },
  };
}

/** Merge deterministic missing data into agent output to prevent hallucination gaps. */
export function enforceAgentDataCoverage<T extends AgentOutput>(
  output: T,
  preAnalysis: PreAnalysis
): T {
  const missingSet = new Set([
    ...preAnalysis.data_missing.map((s) => s.toLowerCase()),
    ...output.data_missing.map((s) => s.toLowerCase()),
  ]);

  const availableSet = new Set(
    output.data_available.map((s) => s.toLowerCase())
  );

  for (const item of preAnalysis.data_missing) {
    const lower = item.toLowerCase();
    if (!availableSet.has(lower)) {
      missingSet.add(lower);
    }
  }

  return {
    ...output,
    data_available: output.data_available,
    data_missing: Array.from(missingSet).map(
      (s) =>
        preAnalysis.data_missing.find((m) => m.toLowerCase() === s) ??
        output.data_missing.find((m) => m.toLowerCase() === s) ??
        s
    ),
  };
}

export async function runStructuredAgent<T extends z.ZodType>(
  schema: T,
  schemaName: string,
  systemPrompt: string,
  userContent: string
): Promise<z.infer<T>> {
  const client = getOpenAIClient();
  if (!client) {
    throw new CouncilUnavailableError(
      "OpenAI API key not configured. Monk Council unavailable."
    );
  }

  const completion = await client.chat.completions.parse({
    model: getOpenAIModel(),
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
    response_format: zodResponseFormat(schema, schemaName),
    temperature: 0.5,
  });

  const parsed = completion.choices[0]?.message?.parsed;
  if (!parsed) {
    const refusal = completion.choices[0]?.message?.refusal;
    throw new Error(
      refusal ?? "The Council returned an unreadable response."
    );
  }

  return parsed;
}
