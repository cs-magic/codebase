import { logger } from "@cs-magic/log/logger"
import type * as PUPPET from "wechaty-puppet"
import type { AppMessagePayload } from "../../../../../wechaty-puppet/types/message"
import type { GenericMessageParser } from "../../../../../wechaty-puppet/types/message.parser"
import type { WebMessageRawPayload } from "../../../web-schemas.js"

/**
 * Add customized message parser context info here
 */
export type MessageParserContext = {
  puppet: PUPPET.Puppet
  isRoomMessage: boolean
  appMessagePayload?: AppMessagePayload
}

export type MessageParser = GenericMessageParser<WebMessageRawPayload>

const messageParserList: Array<MessageParser> = []

export function addMessageParser(parser: MessageParser) {
  messageParserList.push(parser)
}

export async function executeMessageParsers(
  puppet: PUPPET.Puppet,
  webMessageRawPayload: WebMessageRawPayload,
  ret: PUPPET.payloads.Message,
): Promise<PUPPET.payloads.Message> {
  const context: MessageParserContext = {
    isRoomMessage: false,
    puppet,
  }

  let i = 0
  for (const parser of messageParserList) {
    // @ts-ignore
    ++i
    logger.info(`parser[${i}/${messageParserList.length}]`)
    ret = await parser(webMessageRawPayload, ret, context)
  }

  return ret
}

export const LOGPRE = "message-parser"
