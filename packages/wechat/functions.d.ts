/**
 * wrapper 微信的各个 auth 接口
 * @param name
 * @param path
 * @param params
 */
export declare const fetchWechatApi: <T>(name: string, path: string, params: Record<string, string>) => Promise<T>;
