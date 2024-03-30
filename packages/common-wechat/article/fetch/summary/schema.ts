import { IMedia } from "@/schema/card"

export type IFetchWechatArticleSummaryConfig = {
  // db hook
  get?: (id: string) => Promise<string | null>
  set?: (id: string, data: string) => Promise<void>
}

export type IWechatArticleSummary = {
  title: string | null
  cover: IMedia | null
  contentHtml?: string | null
  contentMd?: string | null
  contentSummary?: string | null
}
