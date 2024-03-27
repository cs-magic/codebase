import { CardType } from "../app/(sub)/card/gen/store"
import { IUserSummary } from "./user.summary"

export type IMedia = { url: string; width: number; height: number }

export type ICardBody = {
  platform?: "bilibili" | "xiaohongshu"
  sourceUrl?: string | null

  videos?: IMedia[]
  images?: IMedia[]
  iFrames?: IMedia[]

  content?: string
}
export type ICard = {
  type: CardType
  user?: IUserSummary
  updatedAt: Date

  body: ICardBody
}
