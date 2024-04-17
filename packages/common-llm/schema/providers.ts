import { z } from "zod"

export type LlmProviderType =
  | "openai"
  | "zhipu"
  | "moonshot"
  | "baichuan"
  | "dashscope"

export const llmModelTypeSchema = z.enum([
  "gpt-3.5-turbo",
  "gpt-4",
  "glm-3-turbo",
  "glm-4",
  "moonshot-v1-8k",
  "moonshot-v1-32k",
  "moonshot-v1-128k",
  "Baichuan2-Turbo",
  "Baichuan2-Turbo-192k",
  "qwen-turbo",
  "qwen-max",
  "qwen-plus",
])

export type LlmModelType =
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
