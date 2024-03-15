import { WECHAT_APP_ID, WECHAT_APP_SECRET } from "../../common-wechat/config"
import {
  IWechatAdaptedToken,
  IWechatProfile,
  IWechatRefreshedToken,
  IWechatToken,
} from "../schema"
import { fetchWechatApi } from "../../common-wechat/functions"

/**
 * 这个函数是 unsafe 的，一旦出错，说明要重新从前端拿 code 了
 * @param code
 */
export const getWechatAuthToken = async (code: string) => {
  return fetchWechatApi<IWechatToken>("get-token", `/sns/oauth2/access_token`, {
    appid: WECHAT_APP_ID,
    secret: WECHAT_APP_SECRET,
    code,
    grant_type: "authorization_code",
  })
}

export const adaptWechatAuthToken = (
  token: IWechatToken,
): IWechatAdaptedToken => {
  const { openid, ...other } = token
  return { id: openid, ...other }
}

export const refreshWechatAuthToken = async (refresh_token: string) => {
  return fetchWechatApi<IWechatRefreshedToken>(
    "refresh-token",
    `/sns/oauth2/refresh_token`,
    {
      appid: WECHAT_APP_ID,
      grant_type: "refresh_token",
      refresh_token,
    },
  )
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
