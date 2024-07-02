import { IWechatAdaptedToken, IWechatProfile, IWechatRefreshedToken, IWechatToken } from "../schema";
/**
 * 这个函数是 unsafe 的，一旦出错，说明要重新从前端拿 code 了
 * @param code
 */
export declare const getWechatAuthToken: (code: string) => Promise<IWechatToken>;
export declare const adaptWechatAuthToken: (token: IWechatToken) => IWechatAdaptedToken;
export declare const refreshWechatAuthToken: (refresh_token: string) => Promise<IWechatRefreshedToken>;
export declare const getWechatUserProfile: (access_token: string, openid: string) => Promise<IWechatProfile>;
