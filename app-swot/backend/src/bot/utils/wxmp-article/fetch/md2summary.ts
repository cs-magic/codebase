import { safeCallAgent } from "@cs-magic/llm/dist/utils/safe-call-agent.js"
import { SummaryOptions } from "../../../../schema/index.js"

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
