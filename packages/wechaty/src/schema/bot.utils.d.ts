import type { payloads } from "wechaty";
import { IWechatPreference } from "./bot.preference";
export type IWechatBotScan = {
    value: string;
    status: number;
};
export type IUser = payloads.Contact;
export type IWechatBotTransfer = {
    type: "scan";
    data: IWechatBotScan;
} | {
    type: "login";
    data: IUser;
} | {
    type: "loggedIn";
    data: boolean;
} | {
    type: "preference";
    data: IWechatPreference;
} | {
    type: "contacts";
    data: payloads.Contact[];
};
export type LlmScenario = "chatter" | "parser";
