import Pusher from "pusher"
import { redis } from "../../../../../../packages/common-db"
import { pusherServerConfigs } from "../../../../../../packages/common-puser/config"
import { initPusherServer } from "../../../../../../packages/common-puser/server/init"
import { ISseEvent } from "../../../../../../packages/common-sse/schema"
import {
  getTriggerIdFromSseRequest,
  ILLMRequest,
  ResponseFinalStatus,
  ResponseStatus,
} from "../../../../../schema/sse"

import { ILlmManagerPusher } from "./schema"

/**
 *
 * note:
 * - 因为server-action的机制， 所有state需要用redis等中心化管理
 */
export class PusherLlmManager implements ILlmManagerPusher {
  private pusher: Pusher
  private channel: string

  constructor(request: ILLMRequest) {
    this.channel = getTriggerIdFromSseRequest(request)
    this.pusher = initPusherServer(
      pusherServerConfigs[request.pusherServerId ?? "tencent_wss"],
    )
  }

  //////////////////////////////
  // state
  //////////////////////////////
  public get status() {
    return redis.get(this.channel)
  }

  public setStatus(status: ResponseStatus) {
    return redis.set(this.channel, status)
  }

  //////////////////////////////
  // server
  //////////////////////////////
  async onTriggerStarts() {
    this.push({ event: "init", data: {} })
    this.setStatus("responding")
  }

  async onTriggerEnds(reason: ResponseFinalStatus) {
    this.push({ event: "close", data: { reason } })
    this.setStatus(reason)
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
    this.push({
      event: "onClientDisconnected",
      data: { id: clientId },
    })
  }

  //////////////////////////////
  // general
  //////////////////////////////

  private async push(event: ISseEvent) {
    event.data = { time: Date.now(), ...event.data }
    console.log(`[PUSHER] >> `, event)
    this.pusher.trigger(this.channel, event.event, event)
  }
}
