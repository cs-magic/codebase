import { remove } from "lodash"
import {
  IClient,
  ISseEvent,
  ISseTrigger,
} from "../../../../packages/common-sse/schema"
import { ILlmManager } from "./schema"

export class StaticLlmManager implements ILlmManager {
  static triggers: Record<string, ISseTrigger> = {}

  private triggerId: string

  constructor(triggerId: string) {
    this.triggerId = triggerId
  }

  get triggers() {
    return Object.keys(StaticLlmManager.triggers)
  }

  //////////////////////////////
  // server
  //////////////////////////////

  get trigger() {
    return StaticLlmManager.triggers[this.triggerId] ?? null
  }

  async onTriggerStarts(): Promise<void> {
    this.print("onTriggerStarts(before)")
    StaticLlmManager.triggers[this.triggerId] = { events: [], clients: [] }
    this.print("onTriggerStarts(end)")
  }

  async onTriggerEnds(reason?: string): Promise<void> {
    this.print("onTriggerEnds(before)")
    // !important
    this.onEvent({ event: "close", data: reason })
    delete StaticLlmManager.triggers[this.triggerId]
    this.print("onTriggerEnds(end)")
    return Promise.resolve(undefined)
  }

  //////////////////////////////
  // client
  //////////////////////////////

  async onEvent(event: ISseEvent): Promise<void> {
    console.log("[sse] server --> client: ", {
      triggerId: this.triggerId,
      ...event,
    })
    StaticLlmManager.triggers[this.triggerId]?.clients.forEach((client) => {
      // how?
      client.onEvent(event)
    })
  }

  async onClientConnected(client: IClient): Promise<void> {
    this.print(`onClientConnected(id=${client.id})`)
    if (!this.trigger) {
      client.onEvent({
        event: "close",
        data: `trigger(id=${this.triggerId}) not found`,
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
    return this.triggerId in StaticLlmManager.triggers
  }

  private print(name: string) {
    console.log(`[sse] ${name}: `, {
      triggerId: this.triggerId,
      triggers: this.triggers,
    })
  }
}
