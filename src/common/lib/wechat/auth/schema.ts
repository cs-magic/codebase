import { Profile } from "next-auth"

export enum WechatScopeType {
  base = "snsapi_base",
  info = "snsapi_userinfo",
}

export type IWechatToken = {
  openid: string
  access_token: string
  expires_in: number // 7200s
  refresh_token: string
  scope: string

  unionid: string
  is_snapshotuser: number
}

// refresh的时候少了两个
export type IWechatRefreshedToken = Omit<
  IWechatToken,
  "unionid" | "is_snapshotuser"
>

/**
 * prisma account create 的 时候 不能有 openid 等额外的自定义字段
 */
export type IWechatAdaptedToken = Omit<IWechatToken, "openid"> & {
  id: string
}

export interface IWechatProfile {
  // 用户的唯一标识
  openid: string
  // 只有在用户将公众号绑定到微信开放平台账号后，才会出现该字段。
  unionid: string
  nickname: string
  // 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
  headimgurl: string

  sex: number
  province: string
  city: string
  country: string
  privilege: string[]
}

export interface IWechatAdaptedProfile extends IWechatProfile, Profile {}
