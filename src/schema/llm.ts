import { z } from "zod"
import { MessageRole } from "@prisma/client"

export type ScenarioType =
  | "text2text"
  | "text2image"
  | "text2video"
  | "text2music"
  | "image2image"

export type CompanyId = "openai" | "moonshot"

export const llmMessageSchema = z.object({
  content: z.string(),
  role: z.nativeEnum(MessageRole),
})
export type ILLMMessage = z.infer<typeof llmMessageSchema>
