import { SEPARATOR_BOX } from "@cs-magic/common/const"
import { formatError } from "@cs-magic/common/utils/format-error"
import { formatString } from "@cs-magic/common/utils/format-string"
import { HttpsProxyAgent } from "https-proxy-agent"
import OpenAI from "openai/index"
import { v4 } from "uuid"
import { getEnv } from "../common-env"
import { logEnv } from "../common-env/utils/log-env"
import { callLlm } from "./call-llm"
import { model2provider } from "./model2provider"
import { ICallLlmOptions, ICallLlmResponse } from "./schema/llm"

export const safeCallLLM = async (
  options: ICallLlmOptions,
): Promise<ICallLlmResponse> => {
  const env = getEnv()
  logEnv("api_key")
  // console.log({ env })

  const llmModelType = options.model
  const llmProviderType = model2provider(llmModelType)

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
            content: options.messages
              .map((r) => r.content)
              .join("\n\n## 输入\n\n"),
          },
        ]
      : options.messages

  const queryConfig = {
    model: llmModelType,
    messages,
  }

  console.debug(
    [
      "",
      SEPARATOR_BOX,
      `-- calling LLM(provider=${llmProviderType}, model=${queryConfig.model}, api_key=${apiKey}): `,
      ...queryConfig.messages.map(
        (m) =>
          `  [${m.role[0]!.toUpperCase()}]: ${formatString(JSON.stringify(m.content), 60)}`,
      ),
    ].join("\n"),
  )

  let response: OpenAI.Chat.Completions.ChatCompletion | undefined = undefined
  const start = Date.now()
  let success = false
  let error: string | undefined = undefined
  const queryId = v4()

  try {
    response = await callLlm({
      queryConfig,
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
    options,
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

  console.log(
    [
      `-- result: ${formatString(JSON.stringify(res), 60)}`,
      SEPARATOR_BOX,
      "",
    ].join("\n"),
  )
  return res
}
