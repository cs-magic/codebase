import { redis } from "../../../../packages/common-db"
import {
  IClient,
  ISseEvent,
  ISseTrigger,
} from "../../../../packages/common-sse/schema"
import { llmWrite } from "./manager"
import { ILlmManager } from "./schema"

export class RedisLlmManager implements ILlmManager {
  private key: string

  constructor(key: string) {
    this.key = key
  }

  private async listTriggers() {
    const triggerIds = await redis.keys("*-events")
    // console.log("[redis] listed triggers: ", triggerIds)
    return triggerIds
  }

  //////////////////////////////
  // public
  //////////////////////////////

  public async onTriggerStarts(triggerId: string) {
    this.onEvent(triggerId, { event: "onInit" })
  }

  public async hasTrigger(triggerId: string) {
    // console.log("[redis] checking trigger: ", { triggerId })
    return !!(await redis.exists(`${triggerId}-events`))
  }

  public async getTrigger(triggerId: string): Promise<ISseTrigger> {
    const events = (await redis.lrange(`${triggerId}-events`, 0, -1)).map((e) =>
      JSON.parse(e),
    ) as ISseEvent[]

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

  public async onTriggerEnds(triggerId: string) {
    console.log("[redis] clean trigger: ", { triggerId })
    await redis.del(`${triggerId}-events`)
    await redis.del(`${triggerId}-clients`)
  }

  /**
   * @param triggerId
   * @param client 可能不行！
   */
  public async onClientConnected(triggerId: string, client: IClient) {
    console.log("[redis] adding client: ", { triggerId, client })

    redis.lpush(`${triggerId}-clients`, JSON.stringify(client))
  }

  public async onClientDisconnected(triggerId: string, clientId: string) {
    console.log("[redis] deleting client: ", { triggerId, clientId })
    const index = await redis.lpos(triggerId, clientId)
    index === null ? null : await redis.lpop(triggerId, index)
  }

  public async onEvent(triggerId: string, event: ISseEvent) {
    console.log("[redis] pushing event to all clients: ", { triggerId, event })
    await redis.lpush(`${triggerId}-events`, JSON.stringify(event))

    await Promise.all(
      (await redis.keys(`${triggerId}-clients`)).map(async (client_) => {
        // todo: is it ok?
        const client = JSON.parse(client_) as IClient
        client.onEvent(event)
      }),
    )
  }
}
