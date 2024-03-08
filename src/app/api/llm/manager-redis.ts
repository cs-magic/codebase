import { redis } from "../../../../packages/common-db"
import {
  IClient,
  ISseEvent,
  ISseTrigger,
} from "../../../../packages/common-sse/schema"
import { llmWrite } from "./manager"
import { ILlmManager } from "./schema"

export class RedisLlmManager implements ILlmManager {
  private triggerId: string

  constructor(triggerId: string) {
    this.triggerId = triggerId
  }

  private async listTriggers() {
    const triggerIds = await redis.keys("*-events")
    // console.log("[redis] listed triggers: ", triggerIds)
    return triggerIds
  }

  //////////////////////////////
  // public
  //////////////////////////////

  public async onTriggerStarts() {
    this.onEvent({ event: "init" })
  }

  public async hasTrigger() {
    // console.log("[redis] checking trigger: ", { triggerId })
    return !!(await redis.exists(`${this.triggerId}-events`))
  }

  /**
   * todo: redis get trigger()
   */
  public async getTrigger() {
    const events = (await redis.lrange(`${this.triggerId}-events`, 0, -1)).map(
      (e) => JSON.parse(e),
    ) as ISseEvent[]

    const clients = (
      await redis.lrange(`${this.triggerId}-clients`, 0, -1)
    ).map((e) => {
      const client = JSON.parse(e) as IClient
      console.log({ client })
      return client
    })

    console.log("[redis] getting trigger: ", {
      triggerId: this.triggerId,
      events,
      clients,
    })

    return {
      events,
      clients,
    }
  }

  public async onTriggerEnds() {
    console.log("[redis] clean trigger: ", { triggerId: this.triggerId })
    await redis.del(`${this.triggerId}-events`)
    await redis.del(`${this.triggerId}-clients`)
  }

  /**
   * @param triggerId
   * @param client 可能不行！
   */
  public async onClientConnected(client: IClient) {
    console.log("[redis] adding client: ", {
      triggerId: this.triggerId,
      client,
    })

    redis.lpush(`${this.triggerId}-clients`, JSON.stringify(client))
  }

  public async onClientDisconnected(clientId: string) {
    console.log("[redis] deleting client: ", {
      triggerId: this.triggerId,
      clientId,
    })
    const index = await redis.lpos(this.triggerId, clientId)
    index === null ? null : await redis.lpop(this.triggerId, index)
  }

  public async onEvent(event: ISseEvent) {
    console.log("[redis] pushing event to all clients: ", {
      triggerId: this.triggerId,
      event,
    })
    await redis.lpush(`${this.triggerId}-events`, JSON.stringify(event))

    await Promise.all(
      (await redis.keys(`${this.triggerId}-clients`)).map(async (client_) => {
        // todo: is it ok?
        const client = JSON.parse(client_) as IClient
        client.onEvent(event)
      }),
    )
  }
}
