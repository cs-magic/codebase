import { SEPARATOR_BOX } from "@cs-magic/common/const"
import { formatError } from "@cs-magic/common/utils/format-error"
import { formatString } from "@cs-magic/common/utils/format-string"
import { HttpsProxyAgent } from "https-proxy-agent"
import OpenAI from "openai/index"
import { v4 } from "uuid"
import ZhipuAi from "zhipuai-sdk-nodejs-v4"
import { api, backendApi } from "../common-api-client"
import { env } from "../common-env"
import { model2provider } from "./model2provider"
import { ICallLLMOptions, ICallLLMResponse } from "./schema/llm"

export const callLLM = async (
  options: ICallLLMOptions,
): Promise<ICallLLMResponse> => {
  const model = options.model
  const providerType = model2provider(model)

  const baseURL =
    providerType === "moonshot" ? "https://api.moonshot.cn/v1" : undefined

  const apiKey =
    env[`${providerType}_api_key`.toUpperCase() as keyof typeof env]

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
    providerType === "baichuan"
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
    model,
    messages,
  }

  console.debug(
    [
      "",
      SEPARATOR_BOX,
      `-- calling LLM(provider=${providerType}, model=${queryConfig.model}, api_key=${apiKey}): `,
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
    if (providerType === "zhipu") {
      // console.debug("-- calling ZhiPu")
      const client = new ZhipuAi(clientConfig)
      response = (await client.createCompletions(
        queryConfig,
      )) as unknown as OpenAI.Chat.Completions.ChatCompletion
    } else if (providerType === "baichuan") {
      // console.debug("-- calling BaiChuan")
      const res = await api.post<OpenAI.Chat.Completions.ChatCompletion>(
        "https://api.baichuan-ai.com/v1/chat/completions",
        queryConfig,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        },
      )
      response = res.data
    } else if (providerType === "ali") {
      // console.debug("-- calling Ali")
      const res = await backendApi.post<OpenAI.Chat.Completions.ChatCompletion>(
        "/llm/base",
        queryConfig,
        {
          headers: {
            ContentType: "application/json",
          },
        },
      )
      response = res.data
    } else {
      // console.debug("-- calling OpenAI")
      const client = new OpenAI({
        ...clientConfig,
      })
      response = await client.chat.completions.create(queryConfig)
    }

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
