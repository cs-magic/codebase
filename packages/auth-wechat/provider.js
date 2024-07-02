import { logger } from "@cs-magic/log/logger";
import { WECHAT_PROVIDER_ID } from "./config";
import { getWechatAuthorizationUrl } from "./funcs/client";
import { adaptWechatAuthToken, getWechatAuthToken, getWechatUserProfile, } from "./funcs/server";
/**
 * todo: type hint on callbacks
 * ref:
 * 1. https://github.com/nextauthjs/next-auth/issues/5937
 * 2. node_modules/next-auth/src/providers/facebook.ts
 */
export default function WechatProvider(options) {
    // @ts-ignore
    return {
        id: WECHAT_PROVIDER_ID,
        name: "wx-auth",
        type: "oauth", // fixed
        // necessary for OAUTH CALLBACK
        checks: ["state"],
        authorization: getWechatAuthorizationUrl(),
        token: {
            request: async ({ params: { code } }) => {
                if (!code)
                    throw new Error("missing code");
                const wechatToken = await getWechatAuthToken(code);
                return { tokens: adaptWechatAuthToken(wechatToken) };
            },
        },
        userinfo: {
            // 直接用 url 和 param 是不行的，access_token 等无法自动进去
            // todo: 调查微信与其他的OAuth平台到底有啥不同，需要这么繁琐
            // @ts-ignore
            request: async ({ tokens }) => {
                const { id, access_token } = tokens;
                if (!id || !access_token)
                    throw new Error("missing id | access_token");
                const userInfo = await getWechatUserProfile(access_token, id);
                logger.info("[common-auth-wechat] userinfo callback: %o", {
                    tokens,
                    userInfo,
                });
                return userInfo;
            },
        },
        /**
         * 初始化会进 user 表
         * @param profile
         */
        // @ts-ignore
        profile: async (profile) => {
            const profileOut = {
                // 注意，要provider的资料
                id: profile.openid,
                // 更新 user 的昵称和照片
                name: profile.nickname,
                image: profile.headimgurl,
                // 更新额外的字段标识
                wxid: profile.openid,
                wxidVerified: new Date(),
            };
            logger.info("[common-auth-wechat] profile callback: %o", {
                profile,
                profileOut,
            });
            return profileOut;
        },
        // @ts-ignore
        // style: { logo: "/facebook.svg", bg: "#006aff", text: "#fff" },
        options,
    };
}
