import { ZhipuAI } from "zhipuai-sdk-nodejs-v4"
import { ICallLLMOptions } from "../agents/call-agent"

export const callZhipu = (options: ICallLLMOptions) => {
  // console.log(process.env)

  const client = new ZhipuAI({
    apiKey: process.env.ZHIPU_API_KEY,
    timeout: 30000,
  })

  return client.createCompletions(options)
}
