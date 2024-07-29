import { env } from "../../../env/index.js"

export const WECHAT_AUTH_DOC_URL =
  "https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html"

export const WECHAT_PROVIDER_ID = "wechat"

// 微信的回调地址，必须是绝对地址，因为是从微信服务器回调回来
// export const WX_REDIRECT_URL = env?.NEXT_PUBLIC_APP_URL + "/wechat-auth"
// 根据 oauth 逻辑图，这里我们对接 oauth 的官方回调路由
export const WECHAT_AUTH_CALLBACK_URL = `${env?.NEXT_PUBLIC_APP_URL}/api/auth/callback/${WECHAT_PROVIDER_ID}`
/**
 * @see: https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 */

// note: app_id 是要暴露给前端的，但是secret不行，所以这里要分别导出
export const WECHAT_DATETIME_FORMAT = "YYYY-MM-DD hh:mm:ss" // 根据MDN，日期选择组件只能精确到分钟，否则舒昱的iPhone 15 safari上会报错
export const WECHAT_API_URL = "https://api.weixin.qq.com"
