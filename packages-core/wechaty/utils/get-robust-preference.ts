import { parseJsonSafe } from "@cs-magic/common/utils/parse-json"
import omit from "lodash/omit"
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
  // migrate
  const preference = omit(parseJsonSafe<IWechatPreference>(row?.preference), [
    "chatterEnabled",
    "parserEnabled",
    "model",
    "lang",
    "backend",
  ])

  return {
    ...defaultWechatPreference,
    ...preference,
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
