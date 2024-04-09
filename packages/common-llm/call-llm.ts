import { env } from "@/env"
import OpenAI from "openai/index"
import ZhipuAi from "zhipuai-sdk-nodejs-v4"
import { api } from "../common-api"
import { ICallLLMOptions } from "./agents/call-agent"
import { model2provider } from "./model2provider"

export const callLLM = async (options: ICallLLMOptions) => {
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

  let result: OpenAI.Chat.Completions.ChatCompletion

  if (providerType === "zhipu") {
    const client = new ZhipuAi(opts)
    result = (await client.createCompletions(
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
    result = res.data
  } else {
    const client = new OpenAI(opts)
    result = await client.chat.completions.create(args)
  }
  console.debug(`-- llm called`, JSON.stringify(result))

  return result.choices[0]?.message.content
}
