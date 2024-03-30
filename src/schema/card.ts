import { IDimension } from "../../packages/common-ui/schema"
import { IUserSummary } from "./user.summary"

export type PlatformType = "bilibili" | "xiaohongshu" | "wechat-article"
export type ICardStat = {
  reads?: number
  likes?: number
  comments?: number
}

export type IMedia = {
  url: string
  type: "image" | "video" | "iFrame"
  dimension?: IDimension
}

export type ICardBody = {
  platform?: PlatformType
  sourceUrl?: string | null

  videos?: IMedia[]
  images?: IMedia[]
  iFrames?: IMedia[]

  title?: string | null
  content?: string | null
  mindmap?: string | null // markdown mindmap
  stat?: ICardStat | null

  author?: IUserSummary | null
  time?: Date | null
  source?: string | null
}

export type CardType =
  | "text"
  | "text-image"
  | "text-video"
  | "text-iframe"
  | "text-gif"

export type ICard = {
  type: CardType
  user: IUserSummary | null
  updatedAt: Date

  body: ICardBody | null
}
