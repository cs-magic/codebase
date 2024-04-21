import { IWechatUserPreference } from "../schema/wechat-user"

export const getRobustPreference = (row: {
  preference: any
}): IWechatUserPreference => {
  const preference = row.preference
  return {
    ...{
      lang: "en",
      model: "gpt-3.5-turbo",
      backend: "nodejs",
      chatEnabled: false,
      parserEnabled: false,
      fetch: {
        detail: {
          request: {
            backendType: "nodejs",
            approachType: "simulate",
          },
          llmResponse: {
            model: "gpt-3.5-turbo",
            enabled: true,
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
    },
    ...preference,
  }
}
