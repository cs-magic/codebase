import { Media } from "@prisma/client"
import { IUserSummary } from "./user.summary"

export type PlatformType = "bilibili" | "xiaohongshu" | "wechat-article"

export type ICardBody = {
  platform?: PlatformType
  sourceUrl?: string | null

  videos?: Media[]
  images?: Media[]
  iFrames?: Media[]

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
