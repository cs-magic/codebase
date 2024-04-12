import { ChatbotMessageHandler } from "./chatbot"
import { CommandsMessageHandler } from "./commands"
import { HeartbeatMessageHandler } from "./heartbeat"
import { LinkParserMessageHandler } from "./link-parser"
import { StorageMessageHandler } from "./storage"

export const MessageHandlerMap = {
  chatbot: ChatbotMessageHandler,
  commands: CommandsMessageHandler,
  heartbeat: HeartbeatMessageHandler,
  "link-parser": LinkParserMessageHandler,
  storage: StorageMessageHandler,
}
