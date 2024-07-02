import { ITransChannel, ITransClient, ITransEvent, ResponseFinalStatus } from "@cs-magic/common/sse/schema";
import { ILLMManagerTraditional } from "./schema";
export declare class StaticLLMManager implements ILLMManagerTraditional {
    static triggers: Record<string, ITransChannel>;
    private triggerId;
    constructor(triggerId: string);
    get triggers(): string[];
    get trigger(): any;
    onTriggerStarts(): Promise<void>;
    onTriggerEnds(reason: ResponseFinalStatus): Promise<void>;
    onEvent(event: ITransEvent): Promise<void>;
    onClientConnected(client: ITransClient): Promise<void>;
    onClientDisconnected(clientId: string): Promise<void>;
    hasTrigger(): Promise<boolean>;
    private print;
}
