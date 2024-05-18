import type * as PUPPET from "wechaty-puppet"

import type { AppMessagePayload } from "./message"

export type GenericMessageParser<T = any> = (
  localMessage: T,
  ret: PUPPET.payloads.Message,
  context: MessageParserContext,
) => Promise<PUPPET.payloads.Message>

/**
 * Add customized message parser context info here
 */
export type MessageParserContext = {
  puppet: PUPPET.Puppet
  isRoomMessage: boolean
  appMessagePayload?: AppMessagePayload
}
