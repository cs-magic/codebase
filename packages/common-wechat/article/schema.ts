import { IArticleSummary } from "../../common-article/schema"

export type IFetchWechatArticleSummaryConfig = {
  // db hook
  get?: (id: string) => Promise<IArticleSummary | null>
}
