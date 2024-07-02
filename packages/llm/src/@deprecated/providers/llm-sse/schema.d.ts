import { ITransClient, ITransEvent, ITransChannel, ResponseFinalStatus } from "@cs-magic/common/sse/schema";
export interface ILLMManagerTraditional {
    onTriggerStarts: (trigger: ITransChannel) => Promise<void>;
    onTriggerEnds: (reason: ResponseFinalStatus) => Promise<void>;
    onEvent: (event: ITransEvent) => Promise<void>;
    onClientConnected: (client: ITransClient) => Promise<void>;
    onClientDisconnected: (clientId: string) => Promise<void>;
    trigger?: ITransChannel | null;
}
