import { Prisma } from "@prisma/client"

export type IFetchWechatArticleSummaryConfig = {
  // db hook
  get?: (id: string) => Promise<string | null>
  set?: (id: string, data: string) => Promise<void>
}

export type IWechatArticleSummary = {
  title: string | null
  cover: Prisma.MediaUncheckedCreateInput | null
  contentHtml: string | null
  contentMd?: string | null
  contentSummary?: string | null
}
