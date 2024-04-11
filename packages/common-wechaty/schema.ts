import { config } from "@/config/system"

import { BackendEngineType } from "../common-llm/schema/llm"
import { LLMModelType } from "../common-llm/schema/providers"

export type IBotContext = {
  backendEngineType: BackendEngineType
  summaryModel: LLMModelType
  version: string
  featuresEnabled?: boolean
  startTime: number
}

export const botContext: IBotContext = {
  backendEngineType: "nodejs",
  summaryModel: "gpt-3.5-turbo",
  version: config.version,
  featuresEnabled: true,
  startTime: Date.now(),
}

export type IBotConfig = {
  help: string
  shelp: string
  status: string
}
