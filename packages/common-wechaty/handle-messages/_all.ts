import { z, type ZodEnum } from "zod"
import { basicCommands } from "./handlers/basic.commands"
import { BasicHandler } from "./handlers/basic.handler"
import { chatCommands } from "./handlers/chat.commands"
import { ChatHandler } from "./handlers/chat.handler"
import { parserCommands } from "./handlers/parser.commands"
import { ParserHandler } from "./handlers/parser.handler"
import { StorageHandler } from "./handlers/storage.handler"
import { todoCommands } from "./handlers/todo.commands"
import { TodoHandler } from "./handlers/todo.handler"
import { ValidatorHandler } from "./handlers/validator.handler"

export const MessageHandlerMap = {
  // we use MessageQueue to log instead of LogHandler now
  // log: LogHandler,
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
