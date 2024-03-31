import { IArticleSummaryParsed } from "../../common-article/schema"

export type IFetchWechatArticleSummaryConfig = {
  // db hook
  get?: (id: string) => Promise<IArticleSummaryParsed | null>
}
