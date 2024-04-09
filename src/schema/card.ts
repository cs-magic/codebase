import { $Enums } from "@prisma/client"
import {IArticleSummaryParsed} from "../../packages/common-llm/parse-summary";
import { BackendEngineType } from "../../packages/common-common/schema"
import { LLMModelType } from "../../packages/common-llm/schema/providers"
import {
  IWechatArticleComment,
  IWechatArticleStat,
} from "../../packages/3rd-wechat/wxmp-article/detail/schema"

export type ICardPlatform<T extends $Enums.PlatformType> =
  T extends "wechatArticle"
    ? {
        shortId?: string
        longId: string
        stat?: IWechatArticleStat
        comments?: IWechatArticleComment[]
      }
    : object

export type ICardStat = {
  reads?: number
  likes?: number
  comments?: number
}

export type IMedia = {
  url: string
  ratio?: number
}

export type ISummaryParsed = {
  model?: {
    name?: string
    temperature?: number
    topP?: number
  }
  result?: IArticleSummaryParsed
  title?: string
  description?: string
  mindmap?: string
  tags?: string[]
  comment?: string
}

export type Action1Type = "generate" | "reset"
export type Action2Type = "copy" | "download" | "upload"
export type ActionType = Action1Type | Action2Type

export type ICardGenOptions = {
  backendEngineType?: BackendEngineType
  mdWithImg?: boolean
  summaryModel?: LLMModelType
  refetchPage?: boolean
  refetchStat?: boolean
  refetchComments?: boolean
}

export type GenCardRenderType = "frontend" | "backend"
