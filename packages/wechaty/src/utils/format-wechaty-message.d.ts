import { type Message } from "wechaty";
export declare const formatWechatyMessage: (message: Message, n?: number) => {
    text: string;
} | {
    text: string;
    id: string;
    talkerId: string;
    filename?: string | undefined;
    timestamp: number;
    type: import("wechaty-puppet/types").Message;
    toId?: string | undefined;
    listenerId?: string | undefined;
    fromId?: string | undefined;
    mentionIdList?: string[] | undefined;
    roomId: string;
} | {
    text: string;
    id: string;
    talkerId: string;
    filename?: string | undefined;
    timestamp: number;
    type: import("wechaty-puppet/types").Message;
    fromId?: string | undefined;
    roomId?: string | undefined;
    toId?: string | undefined;
    listenerId: string;
};
