import { Profile } from "next-auth";
export declare enum WechatScopeType {
    base = "snsapi_base",
    info = "snsapi_userinfo"
}
export type IWechatToken = {
    openid: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    unionid: string;
    is_snapshotuser: number;
};
export type IWechatRefreshedToken = Omit<IWechatToken, "unionid" | "is_snapshotuser">;
/**
 * prisma account create 的 时候 不能有 openid 等额外的自定义字段
 */
export type IWechatAdaptedToken = Omit<IWechatToken, "openid"> & {
    id: string;
};
export interface IWechatProfile extends Record<string, any> {
    openid: string;
    unionid: string;
    nickname: string;
    headimgurl: string;
    sex: number;
    province: string;
    city: string;
    country: string;
    privilege: string[];
}
export interface IWechatAdaptedProfile extends IWechatProfile, Profile {
}
