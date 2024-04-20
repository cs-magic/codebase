import { z } from "zod"
import { LangType } from "../../../common/i18n/schema"
import { Priority } from "../handle-messages/managers/todo.manager"

export const featureTypeSchema = z.enum(["system", "todo", "chatter", "parser"])
export type FeatureType = z.infer<typeof featureTypeSchema>

export const quoteTypeSchema = z.enum(["parse"])
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

export type FeatureMap<T extends string> = Record<
  LangType,
  {
    title: string
    description: string
    commands: Record<
      string,
      { type: T; description?: string; priority?: Priority }
    >
  }
>
