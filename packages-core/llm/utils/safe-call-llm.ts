import { SEPARATOR_BOX } from "@cs-magic/common/const"
import { formatError } from "@cs-magic/common/utils/format-error"
import { formatString } from "@cs-magic/common/utils/format-string"
import { logger } from "@cs-magic/log/logger"
import { HttpsProxyAgent } from "https-proxy-agent"
import OpenAI from "openai"
import { v4 } from "uuid"
import { env } from "../../../packages-to-classify/env"

import {
  defaultLlmQueryConfigExtra,
  ILlmQueryConfig,
  ILlmQueryConfigExtra,
  ILlmRes,
} from "../schema/llm.api"
import { trimMessages } from "./calculate-token"
import { callLlm } from "./call-llm"
import { formatLlmMessage } from "./format-llm-message"
import { model2provider } from "./model2provider"

/**
 * todo: 集中队列
 *
 * @param queryConfig
 * @param queryConfigExtra
 */
export const safeCallLLM = async (
  queryConfig: ILlmQueryConfig,
  queryConfigExtra: ILlmQueryConfigExtra = defaultLlmQueryConfigExtra,
): Promise<ILlmRes> => {
  // 队列上锁

  const llmProviderType = model2provider(queryConfig.model)

  const baseURL =
    llmProviderType === "moonshot" ? "https://api.moonshot.cn/v1" : undefined

  const apiKey =
    env[`${llmProviderType}_api_key`.toUpperCase() as keyof typeof env]

  if (!apiKey) throw new Error("API_KEY Missing!")

  const httpAgent = env.PROXY ? new HttpsProxyAgent(env.PROXY) : undefined

  const clientConfig = {
    apiKey,
    baseURL,
    httpAgent,
    // 最简单的响应是在 1-2 s 间
    // 当 timeout后，会延迟3秒返回
    // 如果不用stream的话，延迟可能会很长
    timeout: 60e3, // ms
  }

  const messages =
    llmProviderType === "baichuan"
      ? [
          {
            role: "user" as const,
            content: queryConfig.messages
              .map((r) => r.content)
              .join("\n\n## 输入\n\n"),
          },
        ]
      : queryConfig.messages

  // if (queryConfigExtra.context?.trimStart?.whenTooLong) {
  //   // avoid context overflow
  //   trimMessages(messages, queryConfig.model)
  // }

  queryConfig.messages = messages

  logger.debug(
    [
      `>> calling LLM(provider=${llmProviderType}, model=${queryConfig.model}, api_key=${apiKey}): `,
      SEPARATOR_BOX,
      ...queryConfig.messages.map((m) => formatLlmMessage(m, 60)),
      SEPARATOR_BOX,
    ].join("\n"),
  )

  let response: OpenAI.Chat.Completions.ChatCompletion | undefined = undefined
  const start = Date.now()
  let success = false
  let error: string | undefined = undefined
  const queryId = v4()

  try {
    response = await callLlm({
      queryConfig: queryConfig,
      llmProviderType,
      apiKey,
      clientConfig,
    })
    success = true
  } catch (e) {
    //   todo: return error
    error = formatError(e)
  }
  const end = Date.now()
  const res = {
    options: queryConfig,
    response,
    query: {
      id: queryId,
      start,
      end,
      duration: (end - start) / 1e3,
      success,
    },
    error,
  }

  logger.info(`llm response: ${formatString(JSON.stringify(res), 60)}`)
  return res
}
