import { BackendType } from "@cs-magic/llm"
import { RequestApproachType } from "./card.js"

export type RequestOptions = {
  backendType?: BackendType
  approach?: {
    type?: RequestApproachType
    headless?: boolean
  }
}
