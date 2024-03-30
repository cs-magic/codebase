import { IUserSummary } from "./user.summary"

export type PlatformType = "bilibili" | "xiaohongshu"

export type IMedia = { url: string; width: number; height: number }

export type ICardBody = {
  platform?: "bilibili" | "xiaohongshu" | "wechat-article"
  sourceUrl?: string | null

  videos?: IMedia[]
  images?: IMedia[]
  iFrames?: IMedia[]

  title?: string
  content?: string
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
