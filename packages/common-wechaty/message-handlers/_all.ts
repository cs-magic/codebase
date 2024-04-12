import { z } from "zod"
import { LiteralUnionSchema } from "../../common-common/schema"
import { BasicCommandsMessageHandler, basicSchema } from "./basic-commands"
import { StorageMessageHandler } from "./storage"
import { TaskManagerMessageHandler, taskManagerSchema } from "./task-manager"
import { UniChatterMessageHandler, uniChatterSchema } from "./uni-chatter"
import { UniParserMessageHandler, uniParserSchema } from "./uni-parser"
import { ValidatorMessageHandler } from "./validator"

export const MessageHandlerMap = {
  commands: BasicCommandsMessageHandler,
  "uni-chatter": UniChatterMessageHandler,
  "uni-parser": UniParserMessageHandler,
  storage: StorageMessageHandler,
  validator: ValidatorMessageHandler,
  "task-manager": TaskManagerMessageHandler,
}
export const messageHandlerSchemas = [
  basicSchema,
  uniChatterSchema,
  uniParserSchema,
  taskManagerSchema,
]
export const messageHandlerSchema = z.union(
  // @ts-ignore
  messageHandlerSchemas.map((s) => s.options).flat(),
) as unknown as LiteralUnionSchema

export type CommandType =
  // z.infer<typeof messageHandlerSchema>
  | z.infer<typeof basicSchema>
  | z.infer<typeof uniChatterSchema>
  | z.infer<typeof uniParserSchema>
  | z.infer<typeof taskManagerSchema>
