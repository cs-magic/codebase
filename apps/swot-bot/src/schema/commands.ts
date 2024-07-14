import { LangType } from "@cs-magic/common"
import { z } from "zod"

import { Priority } from "../handlers/handle-message/plugins/task.plugin.js"

export const featureTypeSchema = z.enum([
  "system",
  "todo",
  "chatter",
  "parser",
  "room",
  "test",
])
export type FeatureType = z.infer<typeof featureTypeSchema>

export const managerTypeSchema = z.enum(["base", ...featureTypeSchema.options])
export type ManagerType = z.infer<typeof managerTypeSchema>

export const quoteTypeSchema = z.enum(["parse", "recall"])
export type QuoteType = z.infer<typeof quoteTypeSchema>

export const commandsSchema = z.enum([
  "love",
  "ding",
  "status",
  "help",
  ...featureTypeSchema.options,
  ...quoteTypeSchema.options,
])
export type CommandType = z.infer<typeof commandsSchema>

export type Feature<T> = {
  title: string
  description: string
  commands: Record<
    string,
    { type: T; description?: string; priority?: Priority }
  >
}

export type FeatureMap<T extends string> = {
  [K in Exclude<LangType, "en">]?: Feature<T>
} & {
  en: Feature<T>
}
