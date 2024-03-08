/**
 * @see: https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 */

import { env } from "@/env"

// note: app_id 是要暴露给前端的，但是secret不行，所以这里要分别导出
export const WECHAT_APP_SECRET = env.WECHAT_APP_SECRET
export const WECHAT_DATETIME_FORMAT = "YYYY-MM-DD hh:mm:ss" // 根据MDN，日期选择组件只能精确到分钟，否则舒昱的iPhone 15 safari上会报错
export const WECHAT_APP_ID = "wx0fca1662e5518990"
export const WECHAT_API_URL = "https://api.weixin.qq.com"
