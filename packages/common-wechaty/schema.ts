import { BackendType } from "../common-llm/schema/llm"
import { LlmModelType } from "../common-llm/schema/providers"

export type IBotPreference = {
  model: LlmModelType
  backend: BackendType
  handlers: string[]
}

export type IBotContext = {
  name: string
  version: string
  startTime: number
  preference: IBotPreference
}

export type IBotTemplate = {
  basic: string
  help: string
  status: string
}
