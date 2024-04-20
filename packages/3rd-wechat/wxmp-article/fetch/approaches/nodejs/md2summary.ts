import { logger } from "@cs-magic/log/logger"
import { safeCallAgent } from "../../../../../common-llm/safe-call-agent"
import { ICallLlmResponse } from "../../../../../common-llm/schema/llm"
import { LlmModelType } from "../../../../../common-llm/schema/providers"
import { Prisma } from ".prisma/client"

export type SummaryOptions = {
  enabled?: boolean
  model?: LlmModelType
  withImage?: boolean
}

export const md2summary = async (
  input: Prisma.CardUncheckedCreateInput,
  options?: SummaryOptions,
): Promise<Prisma.CardUncheckedCreateInput> => {
  const contentMd = input.contentMd
  if (!contentMd) return input

  let contentSummary: ICallLlmResponse | null = null
  // !important: 要在 fetch 大模型之前确保所有的信息就已经正确解析，否则容易有模型泄露
  if (options?.enabled) {
    contentSummary = await safeCallAgent({
      input: contentMd,
      agentType: "summarize-content",
      model: options.model,
    })
    // 只在该微信场景报错
    if (!contentSummary.response) throw new Error(contentSummary.error)
  }
  logger.info({ contentSummary })

  return {
    ...input,
    contentSummary,
  }
}
