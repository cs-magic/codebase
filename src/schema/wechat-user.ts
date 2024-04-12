export type LangType = "zh" | "en"

/**
 * 用户偏好（可用户手动修改）
 */
export type IWechatUserPreference = {
  language: LangType
  chatEnabled: boolean
  parserEnabled: boolean
}

/**
 * 用户数据（不可用户手动修改）
 */
export type IWechatUserData = {
  //
}
