import { WECHAT_API_URL } from "@cs-magic/wechat"
import { api } from "../../../api/index.js"
import { env } from "../../../env/index.js"
import { WECHAT_AUTH_CALLBACK_URL } from "./config.js"
import {
  isWechatError,
  IWechatAdaptedToken,
  IWechatProfile,
  IWechatRefreshedToken,
  IWechatToken,
  WechatScopeType,
} from "./schema.js"

/**
 * 只有该函数可以在客户端调用，用于拉起用户微信授权弹窗
 */
export const getWechatAuthorizationUrl = (
  scope: WechatScopeType = WechatScopeType.info,
  userId?: string,
  forcePopup = true,
) => {
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${env?.NEXT_PUBLIC_WECHAT_APP_ID}&redirect_uri=${encodeURIComponent(WECHAT_AUTH_CALLBACK_URL)}&response_type=code&scope=${scope}&state=${userId}&forcePopup=${forcePopup}#wechat_redirect`
}
/**
 * wrapper 微信的各个 auth 接口
 * @param name
 * @param path
 * @param params
 */
export const fetchWechatApi = async <T>(
  name: string,
  path: string,
  params: Record<string, string>,
) => {
  const { data } = await api.get(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `${WECHAT_API_URL}${path}?${new URLSearchParams(params)}`,
  )
  console.log(`[wechat-api] fetched ${name}: `, data)
  if (isWechatError(data)) throw data.errmsg
  return data as T
}
/**
 * 这个函数是 unsafe 的，一旦出错，说明要重新从前端拿 code 了
 * @param code
 */
export const getWechatAuthToken = async (code: string) => {
  if (!env?.NEXT_PUBLIC_WECHAT_APP_ID || !env?.WECHAT_APP_SECRET)
    throw new Error("invalid wechat env")

  return fetchWechatApi<IWechatToken>("get-token", `/sns/oauth2/access_token`, {
    appid: env?.NEXT_PUBLIC_WECHAT_APP_ID,
    secret: env?.WECHAT_APP_SECRET,
    code,
    grant_type: "authorization_code",
  })
}
export const refreshWechatAuthToken = async (refresh_token: string) => {
  if (!env?.NEXT_PUBLIC_WECHAT_APP_ID)
    throw new Error("no wechat app id in env")

  return fetchWechatApi<IWechatRefreshedToken>(
    "refresh-token",
    `/sns/oauth2/refresh_token`,
    {
      appid: env?.NEXT_PUBLIC_WECHAT_APP_ID,
      grant_type: "refresh_token",
      refresh_token,
    },
  )
}
export const adaptWechatAuthToken = (
  token: IWechatToken,
): IWechatAdaptedToken => {
  const { openid, ...other } = token
  return { id: openid, ...other }
}
export const getWechatUserProfile = async (
  access_token: string,
  openid: string,
) => {
  return fetchWechatApi<IWechatProfile>("get-profile", `/sns/userinfo`, {
    access_token,
    openid,
    lang: "zh_CN",
  })
}
