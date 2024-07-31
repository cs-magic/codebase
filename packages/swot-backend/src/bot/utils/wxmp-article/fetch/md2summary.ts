import { safeCallAgent } from "@cs-magic/llm/dist/utils/safe-call-agent"
import { SummaryOptions } from "../../../../schema"

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
