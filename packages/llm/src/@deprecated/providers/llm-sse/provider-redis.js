import { logger } from "@cs-magic/log/logger";
import { redis } from "@cs-magic/common";
export class RedisLLMManager {
    triggerId;
    constructor(triggerId) {
        this.triggerId = triggerId;
    }
    async onTriggerStarts() {
        this.onEvent({ event: "init", data: {} });
    }
    //////////////////////////////
    // public
    //////////////////////////////
    async hasTrigger() {
        // logger.info("[redis] checking trigger: ", { triggerId })
        return !!(await redis.exists(`${this.triggerId}-events`));
    }
    /**
     * todo: redis get trigger()
     */
    async getTrigger() {
        const events = (await redis.lrange(`${this.triggerId}-events`, 0, -1)).map((e) => JSON.parse(e));
        const clients = (await redis.lrange(`${this.triggerId}-clients`, 0, -1)).map((e) => {
            const client = JSON.parse(e);
            logger.info({ client });
            return client;
        });
        logger.info("[redis] getting trigger: %o", {
            triggerId: this.triggerId,
            events,
            clients,
        });
        return {
            events,
            clients,
        };
    }
    async onTriggerEnds() {
        logger.info("[redis] clean trigger: %o", { triggerId: this.triggerId });
        await redis.del(`${this.triggerId}-events`);
        await redis.del(`${this.triggerId}-clients`);
    }
    /**
     * @param triggerId
     * @param client 可能不行！
     */
    async onClientConnected(client) {
        logger.info("[redis] adding client: %o", {
            triggerId: this.triggerId,
            client,
        });
        redis.lpush(`${this.triggerId}-clients`, JSON.stringify(client));
    }
    async onClientDisconnected(clientId) {
        logger.info("[redis] deleting client: %o", {
            triggerId: this.triggerId,
            clientId,
        });
        const index = await redis.lpos(this.triggerId, clientId);
        index === null ? null : await redis.lpop(this.triggerId, index);
    }
    async onEvent(event) {
        logger.info("[redis] pushing event to all clients: %o", {
            triggerId: this.triggerId,
            event,
        });
        await redis.lpush(`${this.triggerId}-events`, JSON.stringify(event));
        await Promise.all((await redis.keys(`${this.triggerId}-clients`)).map(async (client_) => {
            // todo: is it ok?
            const client = JSON.parse(client_);
            client.onEvent(event);
        }));
    }
    async listTriggers() {
        const triggerIds = await redis.keys("*-events");
        // logger.info("[redis] listed triggers: ", triggerIds)
        return triggerIds;
    }
}
