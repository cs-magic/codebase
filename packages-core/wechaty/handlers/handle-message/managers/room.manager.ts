import { FileBox } from "file-box"
import { z } from "zod"
import { langTypeSchema } from "../../../../../packages-to-classify/i18n/schema"
import { backendTypeSchema } from "../../../../../packages-to-classify/llm/schema/llm.base"
import { llmModelTypeSchema } from "../../../../../packages-to-classify/llm/schema/llm.models"
import { FeatureMap } from "../../../schema/commands"
import { CommandStyle } from "schema/bot.preference"
import { parseLimitedCommand } from "../../../utils/parse-command"
import { BaseManager } from "./base.manager"

const commandTypeSchema = z.enum([
  "enable-announce",
  "disable-announce",
  "set-announce-n",
])
type CommandType = z.infer<typeof commandTypeSchema>
const i18n: FeatureMap<CommandType> = {
  en: {
    title: "Room Administration",
    description: "",
    commands: {
      "enable-announce": {
        type: "enable-announce",
      },
      "disable-announce": {
        type: "disable-announce",
      },
      "set-announce-n": {
        type: "set-announce-n",
      },
    },
  },
}

export class RoomManager extends BaseManager {
  public i18n = i18n
}
