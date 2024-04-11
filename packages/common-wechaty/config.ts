import { HeartbeatMessageHandler } from "./message-handlers/heartbeat"
import { LinkParserMessageHandler } from "./message-handlers/link-parser"
import { NormalCommandsMessageHandler } from "./message-handlers/normal-commands"
import { SuperCommandsMessageHandler } from "./message-handlers/super-commands"

export const MessageHandlers = [
  HeartbeatMessageHandler,
  NormalCommandsMessageHandler,
  SuperCommandsMessageHandler,
  LinkParserMessageHandler,
]
