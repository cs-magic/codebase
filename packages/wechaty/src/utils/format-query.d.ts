import { CommandStyle } from "../schema/bot.preference";
/**
 * 可用于微信的回复
 *
 */
export declare const formatQuery: (content: string, options?: {
    title?: string;
    footer?: string;
    tips?: string;
    commandStyle?: CommandStyle;
}) => string;
