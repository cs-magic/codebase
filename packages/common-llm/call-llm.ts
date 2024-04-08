import { env } from "@/env"
import OpenAI from "openai/index"
import ZhipuAi from "zhipuai-sdk-nodejs-v4"
import { ICallLLMOptions } from "./agents/call-agent"
import { ensureLLMProviderType } from "./utils"

export const callLLM = async (options: ICallLLMOptions) => {
  console.debug("-- llm calling: ", options)

  const providerType = ensureLLMProviderType(options.model)

  const baseURL =
    providerType === "moonshot" ? "https://api.moonshot.cn/v1" : undefined

  const apiKey =
    env[`${providerType}_api_key`.toUpperCase() as keyof typeof env]

  const opts = {
    apiKey,
    baseURL,
  }

  const args = {
    messages: options.messages ?? [],
    model: options.model,
  }

  let result: OpenAI.Chat.Completions.ChatCompletion

  if (providerType === "zhipu") {
    const client = new ZhipuAi(opts)
    result = (await client.createCompletions(
      args,
    )) as unknown as OpenAI.Chat.Completions.ChatCompletion
  } else {
    const client = new OpenAI(opts)
    result = await client.chat.completions.create(args)
  }
  console.debug(`-- llm result: ${JSON.stringify(result)}`)

  return result.choices[0]?.message.content
}
