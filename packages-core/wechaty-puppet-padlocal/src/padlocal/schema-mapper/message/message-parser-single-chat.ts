import type * as PUPPET from "wechaty-puppet";
import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import type { MessageParserContext } from "../../../../../wechaty-puppet/src/extra/message.parser";
import type { MessageParser } from "./message-parser";

// @ts-ignore
export const singleChatParser: MessageParser = async (
  padLocalMessage: PadLocal.Message.AsObject,
  ret: PUPPET.payloads.Message,
  context: MessageParserContext
) => {
  if (!context.isRoomMessage) {
    ret.talkerId = padLocalMessage.fromusername;
    ret.listenerId = padLocalMessage.tousername;
  }

  return ret;
};
