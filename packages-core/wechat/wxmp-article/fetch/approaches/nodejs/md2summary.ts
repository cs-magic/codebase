import { safeCallAgent } from "../../../../../../packages-core/llm/utils/safe-call-agent"
import { ILlmQueryConfig } from "../../../../../../packages-core/llm/schema/llm.api"
import { LlmModelType } from "../../../../../../packages-core/llm/schema/llm.models"

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
