import { z } from "zod"

export const langTypeSchema = z.enum(["zh", "en"])
export type LangType = z.infer<typeof langTypeSchema>

export const inputLangTypeSchema = z.enum(["中文", "zh", "英文", "en"])
export type InputLangType = z.infer<typeof inputLangTypeSchema>

export const langMap: Record<InputLangType, LangType> = {
  en: "en",
  英文: "en",
  zh: "zh",
  中文: "zh",
}
