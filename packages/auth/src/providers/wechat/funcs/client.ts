import { getEnv } from "@cs-magic/common"
import { WECHAT_AUTH_CALLBACK_URL } from "../config"
import { WechatScopeType } from "../schema"

const env = getEnv()

/**
 * 只有该函数可以在客户端调用，用于拉起用户微信授权弹窗
 */
export const getWechatAuthorizationUrl = (
  scope: WechatScopeType = WechatScopeType.info,
  userId?: string,
  forcePopup = true,
) => {
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${env.NEXT_PUBLIC_WECHAT_APP_ID}&redirect_uri=${encodeURIComponent(WECHAT_AUTH_CALLBACK_URL)}&response_type=code&scope=${scope}&state=${userId}&forcePopup=${forcePopup}#wechat_redirect`
}
