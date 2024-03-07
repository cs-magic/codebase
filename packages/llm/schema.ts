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
  stop: z.string().array().optional(),
  timeout: z.number().default(3000).optional(),
  openAIApiKey: z.string().optional(),
})
export type ICreateCallLLM = z.infer<typeof createCallLLMSchema>

export const callLLMSchema = createCallLLMSchema.extend({
  systemPrompt: z.string().optional(),
})
export type ICallLLMConfig = z.infer<typeof callLLMSchema>
