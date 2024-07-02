import { z } from "zod";
export interface IPusherServerConfig {
    host: string;
    port?: number;
    useTLS: boolean;
    cluster: string;
}
export type PusherConnectionState = "initialized" | "connecting" | "connected" | "unavailable" | "failed" | "disconnected";
export type PusherEventType = "pusher:ping" | "pusher:pong" | "onNotification" | "onUserMessage" | "state_change";
export type PusherEventData<T extends PusherEventType> = T extends "onNotification" ? {
    userId: string;
    content: string;
} : {
    fromUserId: string;
    channelId: string;
    content: string;
};
export declare const pusherServerIdSchema: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"aws">, z.ZodLiteral<"tencent_ws">, z.ZodLiteral<"tencent_wss">]>>;
export type PusherServerId = z.infer<typeof pusherServerIdSchema>;
