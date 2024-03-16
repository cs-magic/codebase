// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"
import { prisma } from "../common-db"
import { WECHAT_PROVIDER_ID } from "./config"
import { getWechatAuthorizationUrl } from "./funcs/client"
import {
  adaptWechatAuthToken,
  getWechatAuthToken,
  getWechatUserProfile,
} from "./funcs/server"
import {
  IWechatAdaptedProfile,
  IWechatAdaptedToken,
  IWechatProfile,
} from "./schema"

/**
 * ref:
 * 1. https://github.com/nextauthjs/next-auth/issues/5937
 * 2. node_modules/next-auth/src/providers/facebook.ts
 */
export default function WechatProvider<P extends IWechatAdaptedProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: WECHAT_PROVIDER_ID,
    name: "wx-auth",
    type: "oauth", // fixed
    // necessary for OAUTH CALLBACK
    checks: ["state"],

    authorization: getWechatAuthorizationUrl(),

    token: {
      request: async ({ params: { code } }: { params: { code: string } }) => {
        const wechatToken = await getWechatAuthToken(code)
        return { tokens: adaptWechatAuthToken(wechatToken) }
      },
    },

    userinfo: {
      // 直接用 url 和 param 是不行的，access_token 等无法自动进去
      // todo: 调查微信与其他的OAuth平台到底有啥不同，需要这么繁琐
      request: async ({ tokens }: { tokens: IWechatAdaptedToken }) => {
        const { id, access_token } = tokens
        const userInfo = await getWechatUserProfile(access_token, id)
        console.log("[common-auth-wechat] userinfo callback: ", {
          tokens,
          userInfo,
        })
        return userInfo
      },
    },

    /**
     * 初始化会进 user 表
     * @param profile
     */
    profile: async (profile: IWechatProfile) => {
      const profileOut = {
        // 注意，要provider的资料
        id: profile.openid,

        // 更新 user 的昵称和照片
        name: profile.nickname,
        image: profile.headimgurl,

        // 更新额外的字段标识
        wxid: profile.openid,
        wxidVerified: new Date(),
      }
      console.log("[common-auth-wechat] profile callback: ", {
        profile,
        profileOut,
      })
      return profileOut
    },

    // style: { logo: "/facebook.svg", bg: "#006aff", text: "#fff" },
    options,
  }
}
