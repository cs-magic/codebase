import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
export interface EmojiMessagePayload {
    type: number;
    len: number;
    md5: string;
    cdnurl: string;
    width: number;
    height: number;
    gameext?: string;
}
export declare function parseEmotionMessagePayload(message: PadLocal.Message.AsObject): Promise<EmojiMessagePayload>;
export declare function generateEmotionPayload(emojiMessagePayload: EmojiMessagePayload): string;
