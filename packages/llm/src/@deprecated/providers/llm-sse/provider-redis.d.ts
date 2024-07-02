import { ITransClient, ITransEvent } from "@cs-magic/common/sse/schema";
import { ILLMManagerTraditional } from "./schema";
export declare class RedisLLMManager implements ILLMManagerTraditional {
    private triggerId;
    constructor(triggerId: string);
    onTriggerStarts(): Promise<void>;
    hasTrigger(): Promise<boolean>;
    /**
     * todo: redis get trigger()
     */
    getTrigger(): Promise<{
        events: ITransEvent[];
        clients: any;
    }>;
    onTriggerEnds(): Promise<void>;
    /**
     * @param triggerId
     * @param client 可能不行！
     */
    onClientConnected(client: ITransClient): Promise<void>;
    onClientDisconnected(clientId: string): Promise<void>;
    onEvent(event: ITransEvent): Promise<void>;
    private listTriggers;
}
