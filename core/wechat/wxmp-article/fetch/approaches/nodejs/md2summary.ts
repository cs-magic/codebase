import { safeCallAgent } from "../../../../../../packages/llm/safe-call-agent"
import { LlmModelType } from "../../../../../../packages/llm/schema/llm.models"

export type SummaryOptions = {
  enabled?: boolean
  model?: LlmModelType
  withImage?: boolean
}

export const md2summary = async (
  contentMd: string,
  options?: SummaryOptions,
) => {
  return await safeCallAgent({
    input: contentMd,
    agentType: "summarize-content",
    model: options?.model,
  })
}
