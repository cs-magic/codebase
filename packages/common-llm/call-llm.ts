import { env } from "@/env"
import dotenv from "dotenv"
import { HttpsProxyAgent } from "https-proxy-agent"
import OpenAI from "openai/index"
import ZhipuAi from "zhipuai-sdk-nodejs-v4"
import { api, backendApi } from "../common-api"
import { prettyError } from "../common-common/pretty-error"
import { model2provider } from "./model2provider"
import { ICallLLMOptions, ICallLLMResponse } from "./schema/llm"

dotenv.config()

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

  console.debug(`-- calling LLM: `, {
    clientConfig: JSON.stringify(clientConfig),
    queryConfig: JSON.stringify(queryConfig),
  })

  let response: OpenAI.Chat.Completions.ChatCompletion | null = null
  const start = Date.now()
  let success = false

  try {
    if (providerType === "zhipu") {
      console.debug("-- calling ZhiPu")
      const client = new ZhipuAi(clientConfig)
      response = (await client.createCompletions(
        queryConfig,
      )) as unknown as OpenAI.Chat.Completions.ChatCompletion
    } else if (providerType === "baichuan") {
      console.debug("-- calling BaiChuan")
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
      console.debug("-- calling Ali")
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
      console.debug("-- calling OpenAI")
      const client = new OpenAI({
        ...clientConfig,
      })
      response = await client.chat.completions.create(queryConfig)
    }

    success = true
  } catch (e) {
    prettyError(e)
  }

  const end = Date.now()
  const res = {
    options,
    response,
    query: {
      start,
      end,
      duration: (end - start) / 1e3,
      success,
    },
  }
  console.log("-- called: ", res)
  return res
}
