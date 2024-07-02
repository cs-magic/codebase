import { GenWxmpArticleCardFetchOptions } from "@cs-magic/wechat/schema/card";
import { type LangType } from "@cs-magic/common/i18n/schema";
import { LlmModelType } from "@cs-magic/llm/schema/llm.models";
export declare enum CommandStyle {
    standard = "standard",
    simple = "simple",
    image = "image"
}
/**
 * 用户偏好（可用户手动修改）
 */
export type IWechatPreference = {
    display: {
        lang: LangType;
        maxLines: number;
        style: CommandStyle;
    };
    on: {
        roomJoin: {
            sayAnnounce: {
                enabled: boolean;
                n: number;
            };
        };
        message: {
            image: {
                describe: {
                    enabled: boolean;
                };
            };
        };
    };
    features: {
        chatter: {
            enabled: boolean;
            model: LlmModelType;
        };
        parser: {
            enabled: boolean;
            options?: GenWxmpArticleCardFetchOptions;
        };
        todo: {
            enabled: boolean;
            filter?: string;
        };
    };
};
export declare const defaultWechatPreference: IWechatPreference;
/**
 * 用户数据（不可用户手动修改）
 */
export type IWechatData = {
    room: {
        newInvitees: string[];
        welcome: {
            sent: boolean;
        };
    };
    vipLevel: number;
    balance: number;
    plugin: {
        chatter: {
            turnOnReminded: boolean;
            called: number;
            success: number;
        };
        parser: {
            called: number;
            success: number;
        };
    };
};
export declare const defaultWechatData: IWechatData;
