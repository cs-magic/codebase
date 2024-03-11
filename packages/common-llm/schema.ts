import { ICreateApp } from "@/schema/app.create"
import { App } from "@prisma/client"
import { z } from "zod"

export const createCallLLMSchema = z.object({
  modelName: z.string(),
  user: z.string().optional(),

  temperature: z.number().default(0.7).optional(),
  maxTokens: z.number().default(4096).optional(),
  topP: z.number().default(0.5).optional(),
  frequencyPenalty: z.number().default(0).optional(),
  presencePenalty: z.number().default(0).optional(),
  n: z.number().default(1).optional(),
  streaming: z.boolean().default(true).optional(),
  // stop: z.string().array().optional(), // todo: readonly warning
  timeout: z.number().default(3000).optional(),
  openAIApiKey: z.string().optional(),
})
export type ICreateCallLLM = z.infer<typeof createCallLLMSchema>

export const callLLMSchema = createCallLLMSchema.extend({
  systemPrompt: z.string().optional(),
})
export type ICallLLMConfig = z.infer<typeof callLLMSchema>

export const parseApp = (
  app: Omit<App, "stop"> & { stop: Readonly<string[]> },
): ICreateApp => ({
  id: app.id,
  modelName: app.modelName,

  // stop: [...app.stop], // string[]
  n: app.n ?? undefined,
  openAIApiKey: app.openAIApiKey ?? undefined,
  user: app.user ?? undefined,
  frequencyPenalty: app.frequencyPenalty ?? undefined,
  maxTokens: app.maxTokens ?? undefined,
  topP: app.topP ?? undefined,
  presencePenalty: app.presencePenalty ?? undefined,
  streaming: app.streaming ?? undefined,
  temperature: app.temperature ?? undefined,
  timeout: app.timeout ?? undefined,
})
