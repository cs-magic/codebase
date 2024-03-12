import { remove } from "lodash"
import {
  ITransClient,
  ITransEvent,
  ITransChannel,
} from "../../../common-sse/schema"
import { ResponseFinalStatus } from "@/schema/sse"
import { ILLMManagerTraditional } from "./schema"

export class StaticLLMManager implements ILLMManagerTraditional {
  static triggers: Record<string, ITransChannel> = {}

  private triggerId: string

  constructor(triggerId: string) {
    this.triggerId = triggerId
  }

  get triggers() {
    return Object.keys(StaticLLMManager.triggers)
  }

  //////////////////////////////
  // server
  //////////////////////////////

  get trigger() {
    return StaticLLMManager.triggers[this.triggerId] ?? null
  }

  async onTriggerStarts(): Promise<void> {
    this.print("onTriggerStarts(before)")
    StaticLLMManager.triggers[this.triggerId] = { events: [], clients: [] }
    this.print("onTriggerStarts(end)")
  }

  async onTriggerEnds(reason: ResponseFinalStatus) {
    this.print("onTriggerEnds(before)")
    // !important
    this.onEvent({ event: "close", data: { reason } })
    delete StaticLLMManager.triggers[this.triggerId]
    this.print("onTriggerEnds(end)")
  }

  //////////////////////////////
  // client
  //////////////////////////////

  async onEvent(event: ITransEvent): Promise<void> {
    console.log("[LLM] >> ", {
      triggerId: this.triggerId,
      ...event,
    })
    StaticLLMManager.triggers[this.triggerId]?.clients.forEach((client) => {
      // how?
      client.onEvent(event)
    })
  }

  async onClientConnected(client: ITransClient): Promise<void> {
    this.print(`onClientConnected(id=${client.id})`)
    if (!this.trigger) {
      client.onEvent({
        event: "close",
        data: { reason: "not-found" },
      })
      return
    }

    await Promise.all(this.trigger.events.map(async (e) => client.onEvent(e)))
    this.trigger.clients.push(client)
  }

  //////////////////////////////
  // general
  //////////////////////////////

  onClientDisconnected(clientId: string): Promise<void> {
    this.print(`onClientDisconnected(id=${clientId})`)
    remove(this.trigger?.clients ?? [], (c) => c.id === clientId)
    return Promise.resolve(undefined)
  }

  async hasTrigger(): Promise<boolean> {
    //   console.log("hasTrigger: ", {
    //     triggerId,
    //     triggers: this.triggers,
    //   })
    return this.triggerId in StaticLLMManager.triggers
  }

  private print(name: string) {
    console.log(`[sse] ${name}: `, {
      triggerId: this.triggerId,
      triggers: this.triggers,
    })
  }
}
