import { z } from "zod"
import { FeatureMap } from "../../../../../swot-bot-core/src/schema/commands.js"
import { BasePlugin } from "./base.plugin.js"

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

export class RoomPlugin extends BasePlugin {
  public i18n = i18n
}
