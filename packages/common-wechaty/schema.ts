import { BackendType } from "../../packages/common-llm/schema/llm"
import { LlmModelType } from "../../packages/common-llm/schema/providers"

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

export type IBotContext = IBotStaticContext & IBotDynamicContext

export type IBotTemplate = {
  basic: string
  help: string
  status: string
}
