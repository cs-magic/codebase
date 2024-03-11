"use server"

import { PusherEventData, PusherEventType } from "../schema"
import { initPusherServer } from "./init"
import {
  pusherServerConfigs,
  PusherServerId,
} from "../../common-transport/config"

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
