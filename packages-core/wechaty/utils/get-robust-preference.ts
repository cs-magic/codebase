import { parseJsonSafe } from "@cs-magic/common/utils/parse-json-safe"
import { IWechatPreference } from "../schema/wechat-user"

export const defaultPreference: IWechatPreference = {
  lang: "en",
  chatterEnabled: false,
  parserEnabled: false,
  fetch: {
    detail: {
      request: {
        backendType: "nodejs",
        approach: {
          type: "simulate",
          headless: true,
        },
      },
      summary: {
        enabled: false,
        model: "gpt-3.5-turbo",
        withImage: false,
      },
    },
    stat: {
      enabled: false,
    },
    comments: {
      enabled: false,
    },
    withCache: true,
  },
}

export const getRobustPreference = (
  row: {
    preference?: any
  } | null,
): IWechatPreference => {
  return {
    ...defaultPreference,
    ...parseJsonSafe<IWechatPreference>(row?.preference),
  }
}
