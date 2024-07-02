/**
 * 只有该函数可以在客户端调用，用于拉起用户微信授权弹窗
 */
export declare const getWechatAuthorizationUrl: (scope?: WechatScopeType, userId?: string, forcePopup?: boolean) => string;
