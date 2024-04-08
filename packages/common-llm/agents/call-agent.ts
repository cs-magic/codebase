import dotenv from "dotenv"
import { promises } from "fs"
import yaml from "js-yaml"
import path from "path"
import { callChatGPTV2 } from "../models/openai"
import { callZhipu } from "../models/zhipu"
import { LLMMType } from "../schema/models"

dotenv.config()

export type AgentConfig = {
  name?: string
  author?: string
  version?: string
  model?: LLMMType
  total_tokens?: number // 8912
  system_prompt?: string
}

export type ICallLLMOptions = {
  model: LLMMType
  messages: { role: "system" | "user" | "assistant"; content: string }[]
  temperature?: number
  topP?: number
  stream?: boolean
}

export const callLLMBase = async (options: ICallLLMOptions) => {
  console.log("-- callLLMBase options: ", options)
  let result
  if (options.model.startsWith("glm")) {
    result = await callZhipu(options)
  } else {
    result = await callChatGPTV2(options)
  }
  console.log("-- callLLMBase result: ", result)
  return result
}

export const callAgent = async ({
  input,
  agentType = "default",
  llmType = "gpt-3.5-turbo",
}: {
  input: string
  agentType?: "default" | "summarize-content"
  llmType?: LLMMType
}) => {
  console.log({ input, agentType })

  const yamlConfig = await promises.readFile(
    path.join(__dirname, `${agentType}.agent.yml`),
    { encoding: "utf-8" },
  )
  // how can I use some library to ensure the AgentConfig is consistent with the interface
  const agent = yaml.load(yamlConfig) as AgentConfig
  if (llmType) agent.model = llmType

  return {}
}
