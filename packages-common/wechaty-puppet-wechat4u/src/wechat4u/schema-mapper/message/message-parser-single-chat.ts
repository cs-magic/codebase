import type { MessageParserContext } from "wechaty-puppet"
import type * as PUPPET from "wechaty-puppet"
import type { WebMessageRawPayload } from "../../../web-schemas"
import type { MessageParser } from "./message-parser"

export const singleChatParser: MessageParser = async (
  webMessageRawPayload: WebMessageRawPayload,
  ret: PUPPET.payloads.Message,
  context: MessageParserContext,
) => {
  if (!context.isRoomMessage) {
    ret.talkerId = webMessageRawPayload.FromUserName
    ret.listenerId = webMessageRawPayload.ToUserName
  }

  return ret
}
