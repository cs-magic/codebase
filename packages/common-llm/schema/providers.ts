import { z } from "zod"

export type LLMProviderType =
  | "openai"
  | "zhipu"
  | "moonshot"
  | "baichuan"
  | "ali"

export const llmModelTypeSchema = z.union([
  z.literal("gpt-3.5-turbo"),
  z.literal("gpt-4"),
  z.literal("glm-3-turbo"),
  z.literal("glm-4"),
  z.literal("moonshot-v1-8k"),
  z.literal("moonshot-v1-32k"),
  z.literal("moonshot-v1-128k"),
  z.literal("Baichuan2-Turbo"),
  z.literal("Baichuan2-Turbo-192k"),
  z.literal("qwen-turbo"),
  z.literal("qwen-max"),
  z.literal("qwen-plus"),
])

export type LLMModelType =
  | "gpt-3.5-turbo"
  | "gpt-4"
  | "glm-3-turbo"
  | "glm-4"
  | "moonshot-v1-8k"
  | "moonshot-v1-32k"
  | "moonshot-v1-128k"
  | "Baichuan2-Turbo"
  | "Baichuan2-Turbo-192k"
  | "qwen-turbo"
  | "qwen-max"
  | "qwen-plus"
