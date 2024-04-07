import { LinkParserMessageHandler } from "./message-handlers/link-parser.mh"
import { NormalCommandsMessageHandler } from "./message-handlers/normal-commands.mh"
import { SuperCommandsMessageHandler } from "./message-handlers/super-commands.mh"

export const MessageHandlers = [
  LinkParserMessageHandler,
  NormalCommandsMessageHandler,
  SuperCommandsMessageHandler,
]
