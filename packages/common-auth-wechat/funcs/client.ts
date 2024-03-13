import { WechatScopeType } from "../schema"
import { WECHAT_AUTH_CALLBACK_URL } from "../config"

import { WECHAT_APP_ID } from "../../common-wechat/config"

/**
 * 只有该函数可以在客户端调用，用于拉起用户微信授权弹窗
 */
export const getWechatAuthorizationUrl = (
  scope: WechatScopeType = WechatScopeType.info,
  userId?: string,
  forcePopup = true,
) => {
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WECHAT_APP_ID}&redirect_uri=${encodeURIComponent(WECHAT_AUTH_CALLBACK_URL)}&response_type=code&scope=${scope}&state=${userId}&forcePopup=${forcePopup}#wechat_redirect`
  // console.log("[wechat-auth] get-authorization-url: ", url)
  return url
}
