import { LinkParserMessageHandler } from "./message-handlers/link-parser"
import { NormalCommandsMessageHandler } from "./message-handlers/normal-commands"
import { SuperCommandsMessageHandler } from "./message-handlers/super-commands"

export const MessageHandlers = [
  LinkParserMessageHandler,
  NormalCommandsMessageHandler,
  SuperCommandsMessageHandler,
]
