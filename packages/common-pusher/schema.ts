import { z } from "zod"

export interface IPusherServerConfig {
  host: string
  port?: number
  useTLS: boolean
  cluster: string
}

export type PusherConnectionState =
  | "initialized"
  | "connecting"
  | "connected"
  | "unavailable"
  | "failed"
  | "disconnected"

export type PusherEventType =
  // connection
  | "pusher:ping"
  | "pusher:pong"

  // business
  | "onNotification"
  | "onUserMessage"
  | "state_change"

export type PusherEventData<T extends PusherEventType> =
  T extends "onNotification"
    ? {
        userId: string
        content: string
      }
    : {
        fromUserId: string
        channelId: string
        content: string
      }

export const pusherServerIdSchema = z
  .union([z.literal("aws"), z.literal("tencent_ws"), z.literal("tencent_wss")])
  .default("tencent_wss")

export type PusherServerId = z.infer<typeof pusherServerIdSchema>
