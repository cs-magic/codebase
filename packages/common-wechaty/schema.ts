import { BackendEngineType } from "../common-llm/schema/llm"
import { LlmModelType } from "../common-llm/schema/providers"

export type IBotPreference = {
  model: LlmModelType
  backendEngineType: BackendEngineType
  handlers: string[]
}

export type IBotContext = {
  name: string
  version: string
  startTime: number
} & IBotPreference

export type IBotTemplate = {
  help: string
  shelp: string
  status: string
}
