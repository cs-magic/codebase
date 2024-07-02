import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import type { GenericMessageParser, MessageParserContext } from "wechaty-puppet";
import type * as PUPPET from "wechaty-puppet";

export type MessageParser = GenericMessageParser<PadLocal.Message.AsObject>;

const messageParserList: Array<MessageParser> = [];

export function addMessageParser(parser: MessageParser) {
  messageParserList.push(parser);
}

export async function executeMessageParsers(
  puppet: PUPPET.Puppet,
  padLocalMessage: PadLocal.Message.AsObject,
  ret: PUPPET.payloads.Message
): Promise<PUPPET.payloads.Message> {
  const context: MessageParserContext = {
    isRoomMessage: false,
    puppet,
  };

  for (const parser of messageParserList) {
    ret = await parser(padLocalMessage, ret, context);
  }

  return ret;
}

export const LOGPRE = "message-parser";
