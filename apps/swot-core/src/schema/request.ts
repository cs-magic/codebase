import { BackendType } from "@cs-magic/llm/schema/llm.base"
import { RequestApproachType } from "./card"

export type RequestOptions = {
  backendType?: BackendType
  approach?: {
    type?: RequestApproachType
    headless?: boolean
  }
}
