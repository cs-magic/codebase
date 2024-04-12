import { BasicCommandsMessageHandler } from "./basic-commands"
import { UniChatterMessageHandler } from "./uni-chatter"
import { HeartbeatMessageHandler } from "./heartbeat"
import { UniParserMessageHandler } from "./uni-parser"
import { StorageMessageHandler } from "./storage"
import { ValidatorMessageHandler } from "./validator"

export const MessageHandlerMap = {
  commands: BasicCommandsMessageHandler,
  heartbeat: HeartbeatMessageHandler,
  "uni-chatter": UniChatterMessageHandler,
  "uni-parser": UniParserMessageHandler,
  storage: StorageMessageHandler,
  validator: ValidatorMessageHandler,
}
