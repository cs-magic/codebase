import { FileBox } from "file-box"
import { z } from "zod"
import { langTypeSchema } from "../../../../../packages-to-classify/i18n/schema"
import { backendTypeSchema } from "../../../../../packages-to-classify/llm/schema/llm.base"
import { llmModelTypeSchema } from "../../../../../packages-to-classify/llm/schema/llm.models"
import { FeatureMap } from "../../../schema/commands"
import { CommandStyle } from "@cs-magic/prisma/schema/wechat-user"
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

  async parse(input?: string) {
    if (!input) return this.help()

    const commands = this.i18n[await this.getLang()]?.commands
    if (!commands) return

    const parsed = parseLimitedCommand(
      input,
      z.enum(Object.keys(commands) as [string, ...string[]]),
    )
    if (parsed) {
      const commandKeyInInput = parsed.command
      const commandKeyInEnum = commands[commandKeyInInput]?.type
      const commandType = await commandTypeSchema.parseAsync(commandKeyInEnum)
      switch (commandType) {
        case "enable-announce":
          await this.updatePreferenceInDB(
            "onRoomJoin.sayAnnounce.enabled",
            true,
          )
          break

        case "disable-announce":
          await this.updatePreferenceInDB(
            "onRoomJoin.sayAnnounce.enabled",
            false,
          )
          break

        case "set-announce-n":
          await this.updatePreferenceInDB(
            "onRoomJoin.sayAnnounce.n",
            await z.number().int().min(1).parseAsync(Number(parsed.args)),
          )
          break
      }
    }
  }
}
