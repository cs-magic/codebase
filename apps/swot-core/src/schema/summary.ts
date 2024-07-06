import { IArticleSummaryParsed } from "@cs-magic/common/schema/query"

export type ISummaryParsed = {
  result?: IArticleSummaryParsed
  title?: string
  description?: string
  mindmap?: string
  tags?: string[]
  comment?: string
}
