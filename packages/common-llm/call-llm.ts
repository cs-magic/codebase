import { env } from "@/env"
import dotenv from "dotenv"
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

  const opts = {
    apiKey,
    baseURL,
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

  const args = {
    model,
    messages,
  }

  console.debug("-- calling LLM: ", args)

  let response: OpenAI.Chat.Completions.ChatCompletion | null = null
  const start = Date.now()
  let success = false

  try {
    if (providerType === "zhipu") {
      const client = new ZhipuAi(opts)
      response = (await client.createCompletions(
        args,
      )) as unknown as OpenAI.Chat.Completions.ChatCompletion
    } else if (providerType === "baichuan") {
      const res = await api.post<OpenAI.Chat.Completions.ChatCompletion>(
        "https://api.baichuan-ai.com/v1/chat/completions",
        args,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        },
      )
      response = res.data
    } else if (providerType === "ali") {
      const res = await backendApi.post<OpenAI.Chat.Completions.ChatCompletion>(
        "/llm/base",
        args,
        {
          headers: {
            ContentType: "application/json",
          },
        },
      )
      response = res.data
    } else {
      const client = new OpenAI(opts)
      response = await client.chat.completions.create(args, {
        timeout: 10000,
      })
    }

    success = true
  } catch (e) {
    prettyError(e)
  }

  const res = {
    options,
    response,
    query: {
      start,
      end: Date.now(),
      success,
    },
  }
  console.log("-- called: ", res)
  return res
}
