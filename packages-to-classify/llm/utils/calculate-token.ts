import { logger } from "@cs-magic/log/logger"
import { ILlmMessage } from "@cs-magic/p01-common/schema/message"
import { encoding_for_model } from "tiktoken"
import { LlmModelType } from "../schema/llm.models"
import sum from "lodash/sum"

/**
 * @see:
 *  - https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb
 *  - https://www.npmjs.com/package/tiktoken
 *
 *  todo: why the expected is 129, but we got 126 ?
 *
 * @param messages
 * @param model
 */
export const calculateToken = (
  messages: ILlmMessage[],
  model: LlmModelType,
) => {
  // the model is fixed to have an estimated value since we would support many other models (e.g. domestic)
  const encoding = encoding_for_model("gpt-3.5-turbo-0613")
  const tokens_per_message = 3
  const tokens_per_name = 1

  return sum(
    messages.map((m) => {
      return (
        sum(
          Object.entries(m).map(([k, v]) => {
            let l = encoding.encode(v).length
            if (k === "name") l += tokens_per_name
            return l
          }),
        ) + tokens_per_message
      )
    }),
  )
}

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
    (!!messages.length && !["system", "user"].includes(messages[0]!.role))
  ) {
    logger.debug(`trimming messages(curLen=${curLen}, targetLen=${targetLen})`)
    messages.splice(0, 1)
    trimMessages(messages, model)
  }
}
