import { type WritableStreamDefaultWriter } from "web-streams-polyfill/dist/types/ponyfill";
import { ITransEvent } from "@cs-magic/common/sse/schema";
export declare const llmEncoder: TextEncoder;
export declare const llmWrite: (writer: WritableStreamDefaultWriter, sseEvent: ITransEvent) => Promise<void>;
