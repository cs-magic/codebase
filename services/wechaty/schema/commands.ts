import { z } from "zod"
import { LangType } from "../../../packages/common-i18n/schema"

export const featureTypeSchema = z.enum(["system", "todo", "chatter", "parser"])
export type FeatureType = z.infer<typeof featureTypeSchema>

export const commandsSchema = z.enum([
  "love",
  "ding",
  "status",
  "help",
  ...featureTypeSchema.options,
])
export type CommandType = z.infer<typeof commandsSchema>

export type FeatureMap<T extends string> = Record<
  LangType,
  {
    title: string
    description: string
    commands: Record<string, { type: T; description: string }>
  }
>
