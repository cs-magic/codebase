import { IProviderSendSms } from "../schema";
/**
 * 发送验证码的时候，要创建Account以存储AccessToken，并在后续验证的时候实现登录
 *
 * 发送的时候，可能是有session的（微信登录后再SMS），所以会基于这个确定要不要新建或绑定用户
 *
 * @param phone
 * @param expireSeconds
 * @param sendApproach
 * @param userId
 */
export declare const $sendSms: (phone: string, expireSeconds: number, sendApproach: IProviderSendSms, userId?: string) => Promise<boolean>;
