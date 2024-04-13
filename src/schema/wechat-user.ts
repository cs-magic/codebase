import { BackendType } from "../../packages/common-llm/schema/llm"
import { LlmModelType } from "../../packages/common-llm/schema/providers"

export type LangType = "zh" | "en"

/**
 * 用户偏好（可用户手动修改）
 */
export type IWechatUserPreference = {
  lang: LangType
  chatEnabled: boolean
  chatTopic?: string
  model: LlmModelType
  backend: BackendType
  parserEnabled: boolean
}

/**
 * 用户数据（不可用户手动修改）
 */
export type IWechatUserData = {
  //
}
