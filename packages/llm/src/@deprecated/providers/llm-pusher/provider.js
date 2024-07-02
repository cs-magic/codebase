import { redis } from "@cs-magic/common";
import { pusherServerConfigs } from "@cs-magic/common/pusher/config";
import { initPusherServer } from "@cs-magic/common/pusher/server/init";
/**
 *
 * note:
 * - 因为server-action的机制， 所有state需要用redis等中心化管理
 */
export class PusherLLMManager {
    pusher;
    channel;
    constructor(channelId, pusherServerId) {
        this.channel = channelId;
        this.pusher = initPusherServer(pusherServerConfigs[pusherServerId]);
    }
    //////////////////////////////
    // state
    //////////////////////////////
    get status() {
        return redis.get(this.channel);
    }
    setStatus(status) {
        return redis.set(this.channel, status);
    }
    //////////////////////////////
    // server
    //////////////////////////////
    async onTriggerStarts() {
        await this.setStatus("responding");
        await this.push({ event: "init", data: {} });
    }
    async onTriggerEnds(reason) {
        await this.setStatus(reason);
        await this.push({ event: "close", data: { reason } });
    }
    async onEvent(event) {
        await this.push(event);
    }
    //////////////////////////////
    // client
    //////////////////////////////
    async onClientConnected(clientId) {
        await this.push({ event: "onClientConnected", data: { id: clientId } });
    }
    async onClientDisconnected(clientId) {
        await this.push({
            event: "onClientDisconnected",
            data: { id: clientId },
        });
    }
    //////////////////////////////
    // general
    //////////////////////////////
    async push(event) {
        // event.data = { time: Date.now(), ...event.data }
        console.log(`[PUSHER] >> ${this.channel}: `, event);
        await this.pusher.trigger(this.channel, event.event, event.data);
    }
}
