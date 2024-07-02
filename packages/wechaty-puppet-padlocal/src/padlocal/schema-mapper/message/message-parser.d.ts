import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import type { GenericMessageParser } from "wechaty-puppet";
import type * as PUPPET from "wechaty-puppet";
export type MessageParser = GenericMessageParser<PadLocal.Message.AsObject>;
export declare function addMessageParser(parser: MessageParser): void;
export declare function executeMessageParsers(puppet: PUPPET.Puppet, padLocalMessage: PadLocal.Message.AsObject, ret: PUPPET.payloads.Message): Promise<PUPPET.payloads.Message>;
export declare const LOGPRE = "message-parser";
