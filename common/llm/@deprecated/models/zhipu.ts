import OpenAI from "openai"
import { ZhipuAI } from "zhipuai-sdk-nodejs-v4"

import { ICallLlmOptions } from "../../schema/llm"

export const callZhipu = async (options: ICallLlmOptions) => {
  // console.log(process.env)

  const client = new ZhipuAI({
    apiKey: process.env.ZHIPU_API_KEY,
    timeout: 30000,
  })

  const result = (await client.createCompletions(
    options,
  )) as unknown as OpenAI.Chat.Completions.ChatCompletion
  return result.choices[0]?.message.content
}
