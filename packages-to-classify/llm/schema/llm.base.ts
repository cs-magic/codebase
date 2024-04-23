import { z } from "zod"

export type ILlmMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

export const backendTypeSchema = z.enum(["fastapi", "nodejs"])
export type BackendType = z.infer<typeof backendTypeSchema>
