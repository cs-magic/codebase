import type { payloads, Puppet } from "../mods/mod.js"
import type { AppMessagePayload } from "./message.js"

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
