import { IArticleSummaryParsed } from "@cs-magic/common"
import { ILlmQueryConfig, LlmModelType } from "@cs-magic/llm"

export type ISummaryParsed = {
  result?: IArticleSummaryParsed
  title?: string
  description?: string
  mindmap?: string
  tags?: string[]
  comment?: string
}

export type SummaryOptions = {
  enabled?: boolean
  model?: LlmModelType
  withImage?: boolean

  llmOptions?: ILlmQueryConfig
}
