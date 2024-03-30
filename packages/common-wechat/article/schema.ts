export type IFetchWechatArticleSummaryConfig = {
  // db hook
  get?: (id: string) => Promise<string | null>
  set?: (id: string, data: string) => Promise<void>
}
