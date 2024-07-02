export type IWechatError = {
    errcode: number;
    errmsg: string;
};
export type IWechatRes<T extends object> = T | IWechatError;
export declare const isWechatError: <T extends object>(res: IWechatRes<T>) => res is IWechatError;
export type IWechatSDKToken = {
    access_token: string;
    expires_in: number;
};
