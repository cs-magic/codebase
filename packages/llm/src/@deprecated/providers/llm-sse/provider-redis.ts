import { logger, type ITransClient, type ITransEvent } from "@cs-magic/common"
import { redis } from "@cs-magic/common/server"

import type { ILLMManagerTraditional } from "./schema.js"

export class RedisLLMManager implements ILLMManagerTraditional {
  private triggerId: string

  constructor(triggerId: string) {
    this.triggerId = triggerId
  }

  public async onTriggerStarts() {
    this.onEvent({ event: "init", data: {} })
  }

  //////////////////////////////
  // public
  //////////////////////////////

  public async hasTrigger() {
    // logger.info("[redis] checking trigger: ", { triggerId })
    return !!(await redis.exists(`${this.triggerId}-events`))
  }

  /**
   * todo: redis get trigger()
   */
  public async getTrigger() {
    const events = (await redis.lrange(`${this.triggerId}-events`, 0, -1)).map(
      (e) => JSON.parse(e),
    ) as ITransEvent[]

    const clients = (
      await redis.lrange(`${this.triggerId}-clients`, 0, -1)
    ).map((e) => {
      const client = JSON.parse(e) as ITransClient
      logger.info({ client })
      return client
    })

    logger.info("[redis] getting trigger: %o", {
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
    logger.info("[redis] clean trigger: %o", { triggerId: this.triggerId })
    await redis.del(`${this.triggerId}-events`)
    await redis.del(`${this.triggerId}-clients`)
  }

  /**
   * @param triggerId
   * @param client 可能不行！
   */
  public async onClientConnected(client: ITransClient) {
    logger.info("[redis] adding client: %o", {
      triggerId: this.triggerId,
      client,
    })

    redis.lpush(`${this.triggerId}-clients`, JSON.stringify(client))
  }

  public async onClientDisconnected(clientId: string) {
    logger.info("[redis] deleting client: %o", {
      triggerId: this.triggerId,
      clientId,
    })
    const index = await redis.lpos(this.triggerId, clientId)
    index === null ? null : await redis.lpop(this.triggerId, index)
  }

  public async onEvent(event: ITransEvent) {
    logger.info("[redis] pushing event to all clients: %o", {
      triggerId: this.triggerId,
      event,
    })
    await redis.lpush(`${this.triggerId}-events`, JSON.stringify(event))

    await Promise.all(
      (await redis.keys(`${this.triggerId}-clients`)).map(async (client_) => {
        // todo: is it ok?
        const client = JSON.parse(client_) as ITransClient
        client.onEvent(event)
      }),
    )
  }

  private async listTriggers() {
    const triggerIds = await redis.keys("*-events")
    // logger.info("[redis] listed triggers: ", triggerIds)
    return triggerIds
  }
}
