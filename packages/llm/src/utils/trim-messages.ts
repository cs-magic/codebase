import { ILlmMessage } from "@cs-magic/common/dist/schema/message.js"
import type { LlmModelType } from "../schema/llm.models.js"
import { calculateToken } from "./calculate-token.js"
import logger from "@cs-magic/common/dist/log/index.js"

/**
 * avoid context overflow
 *
 * @param messages
 * @param model
 */
export const trimMessages = (messages: ILlmMessage[], model: LlmModelType) => {
  // todo: auto max len based on model
  const targetLen = 6e3 - 100
  const curLen = calculateToken(messages, model)
  if (
    curLen > targetLen ||
    // 第一条必须是system 或者 user
    // todo: 放到 call 里
    (!!messages.length &&
      !["system", "user"].includes(messages[0]!.role as string))
  ) {
    logger.debug(`trimming messages(curLen=${curLen}, targetLen=${targetLen})`)
    messages.splice(0, 1)
    trimMessages(messages, model)
  }
}
