import type { GenericMessageParser } from "wechaty-puppet";
import type * as PUPPET from "wechaty-puppet";
import type { WebMessageRawPayload } from "../../../web-schemas.js";
export type MessageParser = GenericMessageParser<WebMessageRawPayload>;
export declare function addMessageParser(parser: MessageParser): void;
export declare function executeMessageParsers(puppet: PUPPET.Puppet, webMessageRawPayload: WebMessageRawPayload, ret: PUPPET.payloads.Message): Promise<PUPPET.payloads.Message>;
export declare const LOGPRE = "message-parser";
