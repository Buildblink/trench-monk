import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import type { z } from "zod";
import type { TokenData } from "@/lib/types";

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

/** Strip raw DexScreener payload before sending to agents. */
export function serializeTokenDataForAgents(tokenData: TokenData) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { raw, ...safe } = tokenData;
  return {
    ...safe,
    dataAvailability: {
      hasDevData: false,
      hasHolderData: false,
      hasBundlerSniperData: false,
      hasMintFreezeData: false,
      note: "Only DexScreener-normalized fields are available. Do not invent missing intelligence.",
    },
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
    temperature: 0.6,
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
