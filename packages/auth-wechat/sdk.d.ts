import { IWechatProfile } from "./schema";
/**
 * 用于稳定地获取用户信息
 */
export declare class WechatAuth {
    private code;
    private token?;
    constructor(code: string);
    getUserInfo(): Promise<IWechatProfile>;
}
