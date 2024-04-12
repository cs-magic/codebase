import { BackendType } from "../common-llm/schema/llm"
import { LlmModelType } from "../common-llm/schema/providers"

export type IBotPreference = {
  model: LlmModelType
  backend: BackendType
  handlers: string[]
}

export type IBotStaticContext = {
  version: string
  startTime: number
}

export type IBotDynamicContext = {
  name: string
}

export type IBotTemplate = {
  basic: string
  help: string
  status: string
}
