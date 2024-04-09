import { LLMModelType } from "./providers"

export type AgentConfig = {
  name?: string
  author?: string
  version?: string
  model?: LLMModelType
  total_tokens?: number // 8912
  system_prompt?: string
  temperature?: number
  top_p?: number
}
