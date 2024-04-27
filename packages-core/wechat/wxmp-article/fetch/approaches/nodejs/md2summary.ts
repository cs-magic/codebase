import { safeCallAgent } from "../../../../../../packages-to-classify/llm/utils/safe-call-agent"
import { ILlmReq } from "../../../../../../packages-to-classify/llm/schema/llm.api"
import { LlmModelType } from "../../../../../../packages-to-classify/llm/schema/llm.models"

export type SummaryOptions = {
  enabled?: boolean
  model?: LlmModelType
  withImage?: boolean

  llmOptions?: ILlmReq
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
