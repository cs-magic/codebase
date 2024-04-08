import dotenv from "dotenv"
import { promises } from "fs"
import yaml from "js-yaml"
import path from "path"
import { callLLM } from "../call-llm"
import { LLMModelType } from "../schema/models"

dotenv.config()

export type ILLMMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

export type AgentConfig = {
  name?: string
  author?: string
  version?: string
  model?: LLMModelType
  total_tokens?: number // 8912
  system_prompt?: string
}

export type ICallLLMOptions = {
  model: LLMModelType
  messages: ILLMMessage[]
  temperature?: number
  topP?: number
  stream?: boolean
}

export const callAgent = async ({
  input,
  agentType = "default",
  options,
  model,
}: {
  input: string
  model?: LLMModelType
  agentType?: "default" | "summarize-content"
} & { options?: Omit<ICallLLMOptions, "messages" | "model"> }) => {
  console.debug("-- agent calling: ", { input, agentType, model, options })

  const yamlConfig = await promises.readFile(
    path.join(__dirname, `config/${agentType}.agent.yml`),
    { encoding: "utf-8" },
  )
  // how can I use some library to ensure the AgentConfig is consistent with the interface
  const agent = yaml.load(yamlConfig) as AgentConfig

  model = model ?? agent.model
  if (!model) throw new Error("no model found")

  const messages: ILLMMessage[] = []
  if (agent.system_prompt)
    messages.push({
      role: "system",
      content: agent.system_prompt,
    })
  messages.push({
    role: "user",
    content: input,
  })

  return callLLM({
    model,
    messages,
    ...options,
  })
}
