import { IWechatSDKToken } from "../schema";
/**
 * ref: https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
 */
export declare const getWechatToken: () => Promise<IWechatSDKToken>;
export declare const getWechatTicket: (access_token: string) => Promise<{
    ticket: string;
    expires_in: number;
    errcode: number;
    errmsg: string;
}>;
export declare const getWechatSignature: (ticket: string, url: string) => Promise<string>;
export interface ITemplate {
    template_id: string;
    data: Record<string, {
        value: string | number;
    }>;
}
export declare function sendWechatNotification(access_token: string, openid: string, template: ITemplate, url: string): Promise<any>;
export declare const getOrder: () => Promise<number>;
