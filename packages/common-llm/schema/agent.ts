import { LlmModelType } from "./providers"

export type AgentConfig = {
  name?: string
  author?: string
  version?: string
  model?: LlmModelType
  total_tokens?: number // 8912
  system_prompt?: string
  temperature?: number
  top_p?: number
}
