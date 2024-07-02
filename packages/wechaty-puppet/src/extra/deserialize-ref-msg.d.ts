import { AppMessageType } from "./message";
export type DeserializedRefMsgPayload = {
    id: string;
    content: string;
    type: AppMessageType;
} | string;
export declare const deserializeRefMsgPayload: (v: string) => DeserializedRefMsgPayload;
