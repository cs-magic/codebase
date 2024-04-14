import { z, ZodEnum } from "zod"
import { parseAsyncWithFriendlyErrorMessage } from "../utils/validate-input"
import { basicCommands } from "./basic.commands"
import { BasicHandler } from "./basic.handler"
import { chatCommands } from "./chat.commands"
import { ChatHandler } from "./chat.handler"
import { LogHandler } from "./log.handler"
import { parserCommands } from "./parser.commands"
import { ParserHandler } from "./parser.handler"
import { StorageHandler } from "./storage.handler"
import { todoCommands } from "./todo.commands"
import { TodoHandler } from "./todo.handler"
import { ValidatorHandler } from "./validator.handler"

export const MessageHandlerMap = {
  log: LogHandler,
  storage: StorageHandler,
  validator: ValidatorHandler,
  commands: BasicHandler,
  chat: ChatHandler,
  parser: ParserHandler,
  todo: TodoHandler,
}
export const messageHandlerSchemas = [
  basicCommands,
  chatCommands,
  parserCommands,
  todoCommands,
]
export const messageHandlerSchema = z.enum(
  // @ts-ignore
  messageHandlerSchemas.map((s) => s.options).flat(),
) as unknown as ZodEnum<[string, ...string[]]>

export type CommandType = z.infer<typeof messageHandlerSchema>

// void parseAsyncWithFriendlyErrorMessage(messageHandlerSchema, "ding")
// void parseAsyncWithFriendlyErrorMessage(messageHandlerSchema, "ding2")
