import { ILlmQueryConfig, LlmModelType } from "@cs-magic/llm"
import { safeCallAgent } from "@cs-magic/llm/dist/utils/safe-call-agent.js"

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
