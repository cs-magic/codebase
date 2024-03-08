import Pusher from "pusher"
import { pusherServerConfigs } from "../../../../../../packages/common-puser/config"
import { initPusherServer } from "../../../../../../packages/common-puser/server/init"
import { ISseEvent } from "../../../../../../packages/common-sse/schema"
import {
  getTriggerIdFromSseRequest,
  ISseRequest,
} from "../../../../../schema/sse"

import { ILlmManagerPusher } from "./schema"

export class PusherLlmManager implements ILlmManagerPusher {
  private pusher: Pusher
  private channel: string

  constructor(request: ISseRequest) {
    this.channel = getTriggerIdFromSseRequest(request)
    this.pusher = initPusherServer(pusherServerConfigs[request.pusherServerId])
  }

  //////////////////////////////
  // server
  //////////////////////////////
  async onTriggerStarts() {
    this.push({ event: "init", data: { time: Date.now() } })
  }

  async onTriggerEnds(reason?: string) {
    this.push({ event: "close", data: reason })
  }

  async onEvent(event: ISseEvent) {
    this.push(event)
  }

  //////////////////////////////
  // client
  //////////////////////////////

  async onClientConnected(clientId: string) {
    this.push({ event: "onClientConnected", data: { id: clientId } })
  }

  async onClientDisconnected(clientId: string) {
    this.push({ event: "onClientDisconnected", data: { id: clientId } })
  }

  //////////////////////////////
  // general
  //////////////////////////////

  private async push(event: ISseEvent) {
    console.log(`[${Date.now()}] server --> client: `, event)
    this.pusher.trigger(this.channel, event.event, event.data)
  }
}
