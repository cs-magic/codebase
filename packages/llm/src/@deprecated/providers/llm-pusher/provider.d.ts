import { PusherServerId } from "@cs-magic/common/pusher/schema";
import { ITransEvent, ResponseFinalStatus, ResponseStatus } from "@cs-magic/common/sse/schema";
import { ILLMManagerPusher } from "./schema";
/**
 *
 * note:
 * - 因为server-action的机制， 所有state需要用redis等中心化管理
 */
export declare class PusherLLMManager implements ILLMManagerPusher {
    private pusher;
    private channel;
    constructor(channelId: string, pusherServerId: PusherServerId);
    get status(): any;
    setStatus(status: ResponseStatus): any;
    onTriggerStarts(): Promise<void>;
    onTriggerEnds(reason: ResponseFinalStatus): Promise<void>;
    onEvent(event: ITransEvent): Promise<void>;
    onClientConnected(clientId: string): Promise<void>;
    onClientDisconnected(clientId: string): Promise<void>;
    private push;
}
