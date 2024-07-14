"use server"

import { pusherServerConfigs } from "../config.js"
import type {
  PusherEventData,
  PusherEventType,
  PusherServerId,
} from "../schema.js"
import { initPusherServer } from "./init.js"

export const pusherSend = async <T extends PusherEventType>(
  serverId: PusherServerId,
  channel: string,
  eventType: T,
  data: PusherEventData<T>,
) => {
  console.log("[socket-server] sending: ", { eventType, data })
  await initPusherServer(pusherServerConfigs[serverId]).trigger(
    channel,
    eventType,
    data,
  )
}
