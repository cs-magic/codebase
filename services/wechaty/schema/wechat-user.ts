import { GenWxmpArticleCardFetchOptions } from "@cs-magic/p01-card/src/schema/card"
import { type LangType } from "../../../packages/i18n/schema"
import { type BackendType } from "../../../packages/llm/schema/llm.base"
import { LlmModelType } from "../../../packages/llm/schema/llm.models"

export enum CommandStyle {
  standard = "standard",
  // omit title/footer
  simple = "simple",
  // convert to image
  image = "image",
}

/**
 * 用户偏好（可用户手动修改）
 */
export type IWechatPreference = {
  lang: LangType
  model: LlmModelType
  backend: BackendType
  chatterEnabled: boolean
  chatTopic?: string
  parserEnabled: boolean
  todoFilter?: string
  maxOutputLines?: number
  commandStyle?: CommandStyle
  fetch?: GenWxmpArticleCardFetchOptions
}

/**
 * 用户数据（不可用户手动修改）
 */
export type IWechatData = {
  //
}
