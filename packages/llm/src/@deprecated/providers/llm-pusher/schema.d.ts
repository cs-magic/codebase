import { ITransChannel, ITransEvent, ResponseFinalStatus } from "@cs-magic/common/sse/schema";
export interface ILLMManagerPusher {
    onTriggerStarts: (trigger: ITransChannel) => Promise<void>;
    onTriggerEnds: (reason: ResponseFinalStatus) => Promise<void>;
    onEvent: (event: ITransEvent) => Promise<void>;
    onClientConnected: (clientId: string) => void;
    onClientDisconnected: (clientId: string) => void;
}
