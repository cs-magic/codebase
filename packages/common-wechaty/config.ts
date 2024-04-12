import { ChatbotMessageHandler } from "./message-handlers/chatbot"
import { HeartbeatMessageHandler } from "./message-handlers/heartbeat"
import { LinkParserMessageHandler } from "./message-handlers/link-parser"
import { CommandsMessageHandler } from "./message-handlers/commands"
import { StorageMessageHandler } from "./message-handlers/storage"

export const MessageHandlers = [
  StorageMessageHandler,
  HeartbeatMessageHandler,
  CommandsMessageHandler,
  ChatbotMessageHandler,
  LinkParserMessageHandler,
]
