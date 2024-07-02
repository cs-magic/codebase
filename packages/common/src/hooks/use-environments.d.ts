/**
 * 充分性：检测当前的环境
 * 必要性：有很多魔法代码
 */
export declare const useEnvironments: () => {
    isClient: boolean;
    isWechat: boolean;
    isMobile: boolean;
};
