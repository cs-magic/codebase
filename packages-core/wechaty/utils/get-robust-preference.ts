import { parseJsonSafe } from "@cs-magic/common/utils/parse-json-safe"
import {
  defaultWechatData,
  defaultWechatPreference,
  IWechatData,
  IWechatPreference,
} from "../schema/bot.preference"

export const getRobustPreference = (
  row: {
    preference?: any
  } | null,
): IWechatPreference => {
  return {
    ...defaultWechatPreference,
    ...parseJsonSafe<IWechatPreference>(row?.preference),
  }
}

export const getRobustData = (
  row: {
    data?: any
  } | null,
): IWechatData => {
  return {
    ...defaultWechatData,
    ...parseJsonSafe<IWechatData>(row?.data),
  }
}
