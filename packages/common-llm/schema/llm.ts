import { LangType } from "@/schema/wechat-user"
import OpenAI from "openai"
import { z } from "zod"
import { LiteralUnionSchema } from "../../common-common/schema"
import { LlmModelType } from "./providers"

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

export type ILLMMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

export type ICallLLMOptions = {
  model: LlmModelType
  messages: ILLMMessage[]
  temperature?: number
  topP?: number
  stream?: boolean
}

export type ICallLLMResponse = {
  options: ICallLLMOptions
  query: {
    id: string
    start: number
    end?: number
    success: boolean
  }
  response?: OpenAI.Chat.Completions.ChatCompletion
  error?: string
}

export const backendEngineTypeSchema = z.union([
  z.literal("fastapi"),
  z.literal("nodejs"),
])
export type BackendType = z.infer<typeof backendEngineTypeSchema>

export const langSchema = z.union([
  z.literal("中文"),
  z.literal("zh"),
  z.literal("英文"),
  z.literal("en"),
])
export type InputLangType = z.infer<typeof langSchema>
export const langMap: Record<InputLangType, LangType> = {
  en: "en",
  英文: "en",
  zh: "zh",
  中文: "zh",
}

export const getChoices = (schema: LiteralUnionSchema): string[] =>
  schema.options.map((o) => o.value)
