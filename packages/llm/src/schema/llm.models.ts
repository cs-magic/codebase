import { z } from "zod"

export const llmModelTypeSchema = z.enum([
  "gpt-4o",
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
  "qwen-plus",
  "qwen-max",
  // wenxin
  // claude

  // ref: https://platform.deepseek.com/docs
  "deepseek-chat", // 32k
  "deepseek-coder", // 16k
])
export type LlmModelType = z.infer<typeof llmModelTypeSchema>
