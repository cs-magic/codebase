import { fetchWechatApi } from "@cs-magic/wechat/functions";
import { getEnv } from "@cs-magic/common";
const env = getEnv();
/**
 * 这个函数是 unsafe 的，一旦出错，说明要重新从前端拿 code 了
 * @param code
 */
export const getWechatAuthToken = async (code) => {
    if (!env.NEXT_PUBLIC_WECHAT_APP_ID || !env.WECHAT_APP_SECRET)
        throw new Error("invalid wechat env");
    return fetchWechatApi("get-token", `/sns/oauth2/access_token`, {
        appid: env.NEXT_PUBLIC_WECHAT_APP_ID,
        secret: env.WECHAT_APP_SECRET,
        code,
        grant_type: "authorization_code",
    });
};
export const adaptWechatAuthToken = (token) => {
    const { openid, ...other } = token;
    return { id: openid, ...other };
};
export const refreshWechatAuthToken = async (refresh_token) => {
    if (!env.NEXT_PUBLIC_WECHAT_APP_ID)
        throw new Error("no wechat app id in env");
    return fetchWechatApi("refresh-token", `/sns/oauth2/refresh_token`, {
        appid: env.NEXT_PUBLIC_WECHAT_APP_ID,
        grant_type: "refresh_token",
        refresh_token,
    });
};
export const getWechatUserProfile = async (access_token, openid) => {
    return fetchWechatApi("get-profile", `/sns/userinfo`, {
        access_token,
        openid,
        lang: "zh_CN",
    });
};
