import { z } from "zod"
import { LiteralUnionSchema } from "../../common-common/schema"
import { basicCommands } from "./basic.commands"
import { BasicHandler } from "./basic.handler"
import { chatCommands } from "./chat.commands"
import { LogHandler } from "./log.handler"
import { parserCommands } from "./parser.commands"
import { ParserHandler } from "./parser.handler"
import { StorageHandler } from "./storage.handler"
import { TodoHandler } from "./todo.handler"
import { ChatHandler } from "./chat.handler"
import { todoCommands } from "./todo.commands"
import { ValidatorMessageHandler } from "./validator"

export const MessageHandlerMap = {
  log: LogHandler,
  storage: StorageHandler,
  validator: ValidatorMessageHandler,
  commands: BasicHandler,
  "uni-chatter": ChatHandler,
  "uni-parser": ParserHandler,
  "task-manager": TodoHandler,
}
export const messageHandlerSchemas = [
  basicCommands,
  chatCommands,
  parserCommands,
  todoCommands,
]
export const messageHandlerSchema = z.union(
  // @ts-ignore
  messageHandlerSchemas.map((s) => s.options).flat(),
) as unknown as LiteralUnionSchema

export type CommandType =
  // z.infer<typeof messageHandlerSchema>
  | z.infer<typeof basicCommands>
  | z.infer<typeof chatCommands>
  | z.infer<typeof parserCommands>
  | z.infer<typeof todoCommands>
