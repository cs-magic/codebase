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

  public async addTrigger(triggerId: string) {
    return this.addEvent(triggerId, { event: "onInit" })
  }

  public async listTriggers() {
    const triggerIds = await redis.keys("*-events")
    // console.log("[redis] listed triggers: ", triggerIds)
    return triggerIds
  }

  public async hasTrigger(triggerId: string) {
    // console.log("[redis] checking trigger: ", { triggerId })
    return redis.exists(`${triggerId}-events`)
  }

  public async getTrigger(triggerId: string): Promise<ISseTrigger> {
    const events = (await redis.lrange(`${triggerId}-events`, 0, -1)).map((e) =>
      JSON.parse(e),
    ) as ISSEEvent[]

    const clients = (await redis.lrange(`${triggerId}-clients`, 0, -1)).map(
      (e) => {
        const client = JSON.parse(e) as IClient
        console.log({ client })
        return client
      },
    )

    console.log("[redis] getting trigger: ", { triggerId, events, clients })

    return {
      events,
      clients,
    }
  }

  public async cleanTrigger(triggerId: string) {
    console.log("[redis] clean trigger: ", { triggerId })
    await redis.del(`${triggerId}-events`)
    await redis.del(`${triggerId}-clients`)
  }

  /**
   * @param triggerId
   * @param client 可能不行！
   */
  public async addClient(triggerId: string, client: IClient) {
    console.log("[redis] adding client: ", { triggerId, client })

    return redis.lpush(`${triggerId}-clients`, JSON.stringify(client))
  }

  public async delClient(triggerId: string, clientId: string) {
    console.log("[redis] deleting client: ", { triggerId, clientId })
    const index = await redis.lpos(triggerId, clientId)
    return index === null ? null : await redis.lpop(triggerId, index)
  }

  private async addEvent(triggerId: string, event: ISSEEvent) {
    // console.log("[redis] adding event: ", { triggerId, event })
    return redis.lpush(`${triggerId}-events`, JSON.stringify(event))
  }

  public async pushEventToClients(triggerId: string, event: ISSEEvent) {
    console.log("[redis] pushing event to all clients: ", { triggerId, event })

    this.addEvent(triggerId, event)

    return Promise.all(
      (await redis.keys(`${triggerId}-clients`)).map(async (client_) => {
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

  // 要额外加一个 \n，否则不符合格式规范
  await writer.write(
    llmEncoder.encode(
      `event: ${sseEvent.event}\ndata: ${JSON.stringify(sseEvent?.data ?? "")}\n\n`,
    ),
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
