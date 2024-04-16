import { promises } from "fs"
import yaml from "js-yaml"
import path from "path"
import { fileURLToPath } from "url"

import { compressContent } from "../common-common/utils/compress-content"
import { callLLM } from "./call-llm"
import { AgentConfig } from "./schema/agent"
import { ICallLLMOptions, ILLMMessage } from "./schema/llm"
import { LlmModelType } from "./schema/providers"

export const callAgent = async ({
  input,
  agentType = "default",
  options,
  model,
}: {
  input: string
  model?: LlmModelType
  agentType?: "default" | "summarize-content" | "summarize-ancient-title"
} & { options?: Omit<ICallLLMOptions, "messages" | "model"> }) => {
  console.debug("-- agent calling: ", {
    agentType,
    model,
    options,
    inputLength: input.length,
  })

  const __filename = fileURLToPath(import.meta.url)
  const yamlConfig = await promises.readFile(
    path.join(__filename, `../config/${agentType}.agent.yml`),
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

  const maxContentLen =
    8192 -
    (agent.system_prompt?.length ?? 0) -
    1e3 - // 输出的预留长度
    1e2 // 误差

  const content = compressContent(input, maxContentLen)
  messages.push({
    role: "user",
    content,
  })

  return await callLLM({
    model,
    messages,
    topP: agent.top_p,
    temperature: agent.temperature,
    ...options,
  })
}
