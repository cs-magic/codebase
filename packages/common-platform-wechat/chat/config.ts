import { LinkParserMessageHandler } from "./message-handlers/link-parser.mh"
import { NormalCommandsMessageHandler } from "./message-handlers/normal-commands.mh"

export const MessageHandlers = [
  NormalCommandsMessageHandler,
  LinkParserMessageHandler,
]
