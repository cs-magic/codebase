import { PlatformType } from "@prisma/client"
import { z } from "zod"

import { IUserSummary } from "@cs-magic/common/schema/user.summary"
import { LlmModelType } from "@cs-magic/llm/schema/llm.models"

import { ISummaryParsed } from "./summary"

export type ICardStat = {
  reads?: number
  likes?: number
  comments?: number
}

export type IMedia = {
  url: string
  ratio?: number
}

export type Action1Type = "generate" | "reset"
export type Action2Type = "copy" | "download" | "upload"
export type ActionType = Action1Type | Action2Type

export type GenCardApproach = "frontend" | "backend"

export const cardPreviewEngineTypeSchema = z.enum([
  "html2image",
  "html2canvas",
  "modern-screenshot",
])
export type CardPreviewEngineType = z.infer<typeof cardPreviewEngineTypeSchema>

export type ICardInnerPreview = {
  id: string | null
  title: string | null
  cover: IMedia | null
  sourceUrl: string | null
  platformType: PlatformType | null
  author: IUserSummary | null
  time: Date | null
  summary: {
    parsed: ISummaryParsed
    model: LlmModelType
  } | null
}

export type CardOuterPreview = {
  id: string | null
  user: IUserSummary | null
}

export type ICardPreview = {
  inner: ICardInnerPreview | null
  outer: CardOuterPreview | null
}

export type RequestApproachType = "api" | "simulate"
