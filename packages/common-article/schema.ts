export type IArticleSummaryParsed = {
  title?: string
  description?: string
  mindmap?: string
  comment?: string
}

export type IArticleSummary = {
  response?: string
} & IArticleSummaryParsed
