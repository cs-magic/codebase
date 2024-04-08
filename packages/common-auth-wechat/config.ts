import { env } from "@/env"

export const WECHAT_AUTH_DOC_URL =
  "https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html"

export const WECHAT_PROVIDER_ID = "wechat"

// 微信的回调地址，必须是绝对地址，因为是从微信服务器回调回来
// export const WX_REDIRECT_URL = env.NEXT_PUBLIC_APP_URL + "/wechat-auth"
// 根据 oauth 逻辑图，这里我们对接 oauth 的官方回调路由
export const WECHAT_AUTH_CALLBACK_URL = `${env.NEXT_PUBLIC_APP_URL}/api/auth/callback/${WECHAT_PROVIDER_ID}`
