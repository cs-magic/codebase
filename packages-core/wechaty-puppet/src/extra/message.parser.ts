import type { Puppet, payloads } from "../mods/mod"
import type { AppMessagePayload } from "./message"

/**
 * Add customized message parser context info here
 */
export type MessageParserContext = {
  puppet: Puppet
  isRoomMessage: boolean
  appMessagePayload?: AppMessagePayload
}

export type GenericMessageParser<T = any> = (
  localMessage: T,
  ret: payloads.Message,
  context: MessageParserContext,
) => Promise<payloads.Message>
