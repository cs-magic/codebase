import { IWechatData, IWechatPreference } from "../schema/bot.preference";
export declare const getConvPreference: (message: {
    convId: string;
}) => Promise<IWechatPreference>;
export declare const getConvData: (message: {
    convId: string;
}) => Promise<IWechatData>;
