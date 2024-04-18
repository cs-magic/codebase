import { type LangType } from "../../../packages/common-i18n/schema"
import { type BackendType } from "../../../packages/common-llm/schema/llm"
import { type LlmModelType } from "../../../packages/common-llm/schema/providers"

export enum CommandStyle {
  standard,
  // omit title/footer
  simple,
  // convert to image
  image,
}

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
  todoFilter?: string
  maxOutputLines?: number
  commandStyle?: CommandStyle
}

/**
 * 用户数据（不可用户手动修改）
 */
export type IWechatUserData = {
  //
}
