import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import type { PatMessagePayload } from "./sysmsg/message-pat";
import type { SysmsgTemplateMessagePayload } from "./sysmsg/message-sysmsgtemplate";
import type { TodoMessagePayload } from "./sysmsg/message-todo.js";
import type { RevokeMsgMessagePayload } from "./sysmsg/message-revokemsg";
type SysMsgType = "pat" | "sysmsgtemplate" | "roomtoolstips" | "revokemsg";
type SysMsgPayload = PatMessagePayload | SysmsgTemplateMessagePayload | TodoMessagePayload | RevokeMsgMessagePayload;
export interface SysmsgMessagePayload {
    type: SysMsgType;
    payload: SysMsgPayload;
}
export declare function parseSysmsgMessagePayload(message: PadLocal.Message.AsObject): Promise<SysmsgMessagePayload | null>;
export declare function parseSysmsgPatMessagePayload(message: PadLocal.Message.AsObject): Promise<PatMessagePayload | null>;
export declare function parseSysmsgSysmsgTemplateMessagePayload(message: PadLocal.Message.AsObject): Promise<SysmsgTemplateMessagePayload | null>;
export declare function parseSysmsgTodoMessagePayload(message: PadLocal.Message.AsObject): Promise<TodoMessagePayload | null>;
export declare function parseSysmsgRevokeMsgMessagePayload(message: PadLocal.Message.AsObject): Promise<RevokeMsgMessagePayload | null>;
export {};
