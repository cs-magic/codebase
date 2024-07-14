import { parseJsonSafe } from "@cs-magic/common"
import merge from "lodash/merge.js"
import omit from "lodash/omit.js"

import {
  defaultWechatData,
  defaultWechatPreference,
  IWechatData,
  IWechatPreference,
} from "@cs-magic/swot-bot-core"

export const getRobustPreference = (
  row: {
    preference?: any
  } | null,
): IWechatPreference => {
  // migrate
  const rawPreference = omit(
    parseJsonSafe<IWechatPreference>(row?.preference),
    [
      "chatterEnabled",
      "parserEnabled",
      "model",
      "lang",
      "backend",
      "features.image",
    ],
  )

  // todo: merge 的最佳实践 【限制default schema】
  const preference = merge({ ...defaultWechatPreference }, rawPreference)
  // logger.debug(JSON.stringify({ rawPreference, preference }, null, 2))
  return preference
}

export const getRobustData = (
  row: {
    data?: any
  } | null,
): IWechatData => {
  return merge({ ...defaultWechatData }, parseJsonSafe<IWechatData>(row?.data))
}
