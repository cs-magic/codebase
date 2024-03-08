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
    delete StaticLlmManager.triggers[triggerId]
    return Promise.resolve(undefined)
  }

  onEvent(triggerId: string, event: ISseEvent): Promise<void> {
    StaticLlmManager.triggers[triggerId]?.clients.forEach((client) => {
      client.onEvent(event)
    })
    return Promise.resolve(undefined)
  }

  //////////////////////////////
  // client
  //////////////////////////////

  onClientConnected(triggerId: string, client: IClient): Promise<void> {
    StaticLlmManager.triggers[triggerId]?.clients.push(client)
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
