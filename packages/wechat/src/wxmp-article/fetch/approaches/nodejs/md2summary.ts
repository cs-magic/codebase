import {
  type ILlmQueryConfig,
  type LlmModelType,
  safeCallAgent,
} from "@cs-magic/llm"

export type SummaryOptions = {
  enabled?: boolean
  model?: LlmModelType
  withImage?: boolean

  llmOptions?: ILlmQueryConfig
}

export const md2summary = async (
  contentMd: string,
  summaryOptions?: SummaryOptions,
) => {
  return await safeCallAgent({
    input: contentMd,
    agentType: "summarize-content",
    model: summaryOptions?.model,
    llmOptions: summaryOptions?.llmOptions,
  })
}
