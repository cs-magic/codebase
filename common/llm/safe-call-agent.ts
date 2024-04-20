import { logger } from "@cs-magic/log/logger"
import { promises } from "fs"
import yaml from "js-yaml"
import path from "path"

import { compressContent } from "../common/utils/compress-content"
import { Path } from "../path"
import { safeCallLLM } from "./safe-call-llm"
import { AgentConfig } from "./schema/agent"
import { ICallLlmOptions, ILlmMessage } from "./schema/llm"
import { LlmModelType } from "./schema/providers"

// const __filename = fileURLToPath(import.meta.url)

export const safeCallAgent = async ({
  input,
  agentType = "default",
  options,
  model,
}: {
  input: string
  model?: LlmModelType
  agentType?: "default" | "summarize-content" | "summarize-ancient-title"
} & { options?: Omit<ICallLlmOptions, "messages" | "model"> }) => {
  logger.info("-- agent calling: %o", {
    agentType,
    model,
    options,
    inputLength: input.length,
  })

  const yamlConfig = await promises.readFile(
    path.join(Path.packagesDir, `common-llm/config/${agentType}.agent.yml`),
    { encoding: "utf-8" },
  )
  // how can I use some library to ensure the AgentConfig is consistent with the interface
  const agent = yaml.load(yamlConfig) as AgentConfig

  model = model ?? agent.model
  if (!model) throw new Error("no model found")

  const messages: ILlmMessage[] = []
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

  return await safeCallLLM({
    model,
    messages,
    topP: agent.top_p,
    temperature: agent.temperature,
    ...options,
  })
}
