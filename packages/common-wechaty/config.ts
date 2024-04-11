import { ChatbotMessageHandler } from "./message-handlers/chatbot"
import { HeartbeatMessageHandler } from "./message-handlers/heartbeat"
import { LinkParserMessageHandler } from "./message-handlers/link-parser"
import { NormalCommandsMessageHandler } from "./message-handlers/normal-commands"
import { StorageMessageHandler } from "./message-handlers/storage"
import { SuperCommandsMessageHandler } from "./message-handlers/super-commands"

export const MessageHandlers = [
  StorageMessageHandler,
  HeartbeatMessageHandler,
  NormalCommandsMessageHandler,
  SuperCommandsMessageHandler,
  ChatbotMessageHandler,
  LinkParserMessageHandler,
]
