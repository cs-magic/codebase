import { WritableStreamDefaultWriter } from "web-streams-polyfill/dist/types/ponyfill"
import { redis } from "../../../../packages/common-db"

import {
  IClient,
  ISSEEvent,
  ISseTrigger,
} from "../../../../packages/common-sse/schema"

// export const llmManager = staticCreate<Record<string, ISSERequest>>(() => ({}))

class LlmManager {
  private key: string

  constructor(key: string) {
    this.key = key
  }

  public async listTriggers() {
    return redis.keys("*-events")
  }

  public async hasTrigger(triggerId: string) {
    return redis.exists(`${triggerId}-events`)
  }

  public async getTrigger(triggerId: string): Promise<ISseTrigger> {
    const events_ = await redis.get(`${triggerId}-events`)
    const clients_ = await redis.get(`${triggerId}-clients`)

    return {
      events: events_ === null ? [] : (JSON.parse(events_) as ISSEEvent[]),
      clients: clients_ === null ? [] : (JSON.parse(clients_) as IClient[]),
    }
  }

  public async cleanTrigger(triggerId: string) {
    await redis.del(`${triggerId}-events`)
    await redis.del(`${triggerId}-clients`)
  }

  public async addEvent(triggerId: string, event: ISSEEvent) {
    return redis.lpush(`${triggerId}-events`, JSON.stringify(event))
  }

  /**
   * @param triggerId
   * @param client 可能不行！
   */
  public async addClient(triggerId: string, client: IClient) {
    return redis.lpush(`${triggerId}-clients`, JSON.stringify(client))
  }

  public async delClient(triggerId: string, clientId: string) {
    const index = await redis.lpos(triggerId, clientId)
    return index === null ? null : await redis.lpop(triggerId, index)
  }

  public async pushEventToClients(triggerId: string, event: ISSEEvent) {
    const clients_ = await redis.keys(`${triggerId}-clients`)
    return Promise.all(
      clients_.map(async (client_) => {
        // todo: is it ok?
        const client = JSON.parse(client_) as IClient
        return client.onEvent(event)
      }),
    )
  }
}

export const llmManager = new LlmManager("llm-manager")

export const llmEncoder = new TextEncoder()

export const llmWrite = async (
  writer: WritableStreamDefaultWriter,
  sseEvent: ISSEEvent,
) => {
  // 返回客户端不需要有 close 标志，直接 readystate=2 即可
  if (sseEvent.event === "close") return await writer.close()

  const { event, data } = sseEvent

  // 要额外加一个 \n，否则不符合格式规范
  await writer.write(
    llmEncoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
  )
}

export const llmInit = async (
  clientId: string,
  writer: WritableStreamDefaultWriter,
  triggerId: string,
) => {
  const trigger = await llmManager.getTrigger(triggerId)
  if (!trigger) return

  // 1. old (request.data 也在持续增加)
  await Promise.all(trigger.events.map(async (e) => await llmWrite(writer, e)))

  // 2. new
  await llmManager.addClient(triggerId, {
    id: clientId,
    onEvent: (e) => llmWrite(writer, e),
  })
}

export const redisGet = async <T>(key: string, s: T) => {
  return redis.set(key, JSON.stringify(s))
}
