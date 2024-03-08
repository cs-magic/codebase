import { remove } from "lodash"
import {
  IClient,
  ISseEvent,
  ISseTrigger,
} from "../../../../packages/common-sse/schema"
import { ILlmManager } from "./schema"

export class StaticLlmManager implements ILlmManager {
  static triggers: Record<string, ISseTrigger> = {}

  //////////////////////////////
  // server
  //////////////////////////////

  onTriggerStarts(triggerId: string): Promise<void> {
    StaticLlmManager.triggers[triggerId] = { events: [], clients: [] }
    return Promise.resolve(undefined)
  }

  onTriggerEnds(triggerId: string): Promise<void> {
    // !important
    this.onEvent(triggerId, { event: "close" })
    delete StaticLlmManager.triggers[triggerId]
    return Promise.resolve(undefined)
  }

  onEvent(triggerId: string, event: ISseEvent): Promise<void> {
    console.log("[sse] server --> client: ", event)
    StaticLlmManager.triggers[triggerId]?.clients.forEach((client) => {
      client.onEvent(event)
    })
    return Promise.resolve(undefined)
  }

  //////////////////////////////
  // client
  //////////////////////////////

  async onClientConnected(triggerId: string, client: IClient): Promise<void> {
    const trigger = await this.getTrigger(triggerId)
    if (!trigger) return

    await Promise.all(trigger.events.map(async (e) => client.onEvent(e)))
    trigger.clients.push(client)
    return Promise.resolve(undefined)
  }

  onClientDisconnected(triggerId: string, clientId: string): Promise<void> {
    remove(
      StaticLlmManager.triggers[triggerId]?.clients ?? [],
      (c) => c.id === clientId,
    )
    return Promise.resolve(undefined)
  }

  //////////////////////////////
  // general
  //////////////////////////////

  getTrigger(triggerId: string): Promise<ISseTrigger | null> {
    return Promise.resolve(StaticLlmManager.triggers[triggerId] ?? null)
  }

  hasTrigger(triggerId: string): Promise<boolean> {
    return Promise.resolve(triggerId in StaticLlmManager.triggers)
  }
}
