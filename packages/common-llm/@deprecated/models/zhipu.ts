import OpenAI from "openai"
import { ZhipuAI } from "zhipuai-sdk-nodejs-v4"
import { ICallLLMOptions } from "../../agents/call-agent"

export const callZhipu = async (options: ICallLLMOptions) => {
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
