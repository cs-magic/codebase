/**
 * config
 */

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
