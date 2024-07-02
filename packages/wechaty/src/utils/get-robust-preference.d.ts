import { IWechatData, IWechatPreference } from "../schema/bot.preference";
export declare const getRobustPreference: (row: {
    preference?: any;
} | null) => IWechatPreference;
export declare const getRobustData: (row: {
    data?: any;
} | null) => IWechatData;
