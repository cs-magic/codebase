import { logger } from "@cs-magic/log/logger"
import * as PUPPET from "wechaty-puppet"
import { AppMessageType } from "../types/message"
import type {
  GenericMessageParser,
  MessageParserContext,
} from "../types/message.parser"

import { serializeRefMsgPayload } from "./serialize"

export const referMsgParser: GenericMessageParser = async <T>(
  localMessage: T,
  ret: PUPPET.payloads.Message,
  context: MessageParserContext,
) => {
  logger.debug(`[refer] <-- ret: %o, localMessage: %o`, ret, localMessage)

  if (
    !context.appMessagePayload ||
    context.appMessagePayload.type !== AppMessageType.ReferMsg
  ) {
    return ret
  }

  const appPayload = context.appMessagePayload

  const referMessagePayload = appPayload.refermsg

  // todo: use extra type of PUPPET.types.Message, mark@2024-04-19 10:21:24
  ret.type = PUPPET.types.Message.Text

  // todo: possible undefined
  ret.text = !referMessagePayload
    ? appPayload.title
    : `「${referMessagePayload.displayname}：${serializeRefMsgPayload(
        referMessagePayload,
      )}」\n- - - - - - - - - - - - - - -\n${appPayload.title}`

  logger.debug(`[refer] --> ret: %o`, ret)

  return ret
}
