import { z } from "zod"

export const llmProviderTypeSchema = z.enum([
  "openai",
  "zhipu",
  "moonshot",
  "baichuan",
  "dashscope",
  "deepseek",
])

export type LlmProviderType = z.infer<typeof llmProviderTypeSchema>
