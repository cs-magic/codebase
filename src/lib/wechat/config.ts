/**
 * @see: https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 */

import { env } from "@/env"

// note: app_id 是要暴露给前端的，但是secret不行，所以这里要分别导出
export const WECHAT_APP_SECRET = env.WECHAT_APP_SECRET
