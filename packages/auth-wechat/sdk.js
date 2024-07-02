import { getWechatAuthToken, getWechatUserProfile, refreshWechatAuthToken, } from "./funcs/server";
/**
 * 用于稳定地获取用户信息
 */
export class WechatAuth {
    code;
    token;
    constructor(code) {
        this.code = code;
    }
    async getUserInfo() {
        if (!this.token)
            // init token
            this.token = await getWechatAuthToken(this.code);
        try {
            return getWechatUserProfile(this.token.access_token, this.token.openid);
        }
        catch (e) {
            // refresh token
            this.token = await refreshWechatAuthToken(this.token.refresh_token);
            return this.getUserInfo(); // again since the token refreshed
        }
    }
}
