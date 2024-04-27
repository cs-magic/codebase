import { FileBox } from "file-box"
import { z } from "zod"
import { backendTypeSchema } from "../../../../../packages-to-classify/llm/schema/llm.base"
import { llmModelTypeSchema } from "../../../../../packages-to-classify/llm/schema/llm.models"
import { CommandStyle } from "../../../schema/bot.preference"
import { FeatureMap } from "../../../schema/commands"
import { parseLimitedCommand } from "../../../utils/parse-command"
import { BaseManager } from "./base.manager"

const commandTypeSchema = z.enum([
  "list-models",
  "set-model",
  "set-backend",
  // "list-langs",
  // "set-lang",
  "set-avatar",
  "set-max-output-lines",
  "set-command-style",
])
type CommandType = z.infer<typeof commandTypeSchema>
const i18n: FeatureMap<CommandType> = {
  en: {
    title: "Operating System",
    description: "There are some administrative commands",
    commands: {
      "list-models": {
        type: "list-models",
        description: "list supported LLM models",
      },
      "set-model": {
        type: "set-model",
        description: "switch to another LLM model",
      },
      // "list-langs": {
      //   type: "list-langs",
      //   description: "list supported languages",
      // },
      // "set-lang": {
      //   type: "set-lang",
      //   description: "switch to another language",
      // },
      "set-avatar": {
        type: "set-avatar",
      },
      "set-max-output-lines": {
        type: "set-max-output-lines",
      },
      "set-command-style": {
        type: "set-command-style",
      },
      "set-backend": {
        type: "set-backend",
      },
    },
  },
}

export class SystemManager extends BaseManager {
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
        case "list-models":
          await this.listModels()
          break

        case "set-model":
          await this.updatePreferenceInDB(
            "fetch.detail.summary.model",
            await llmModelTypeSchema.parseAsync(parsed.args),
            "已更新 ~",
          )
          break

        // case "set-lang":
        //   await this.updatePreferenceInDB(
        //     "lang",
        //     await langTypeSchema.parseAsync(parsed.args),
        //   )
        //   break

        case "set-avatar":
          const avatarUrl = await z
            .string()
            .min(1)
            .startsWith("http")
            .parseAsync(parsed.args)
          console.log({ avatarUrl })
          await this.bot.currentUser.avatar(FileBox.fromUrl(avatarUrl))
          console.log("-- done set avatar")
          break

        case "set-backend":
          await this.updatePreferenceInDB(
            "fetch.detail.request.backendType",
            await backendTypeSchema.parseAsync(parsed.args),
            "已更新 ~",
          )
          break

        case "set-max-output-lines":
          await this.updatePreferenceInDB(
            "display.maxLines",
            await z.number().int().min(1).parseAsync(Number(parsed.args)),
            "已更新 ~",
          )
          break

        case "set-command-style":
          await this.updatePreferenceInDB(
            "display.style",
            await z.nativeEnum(CommandStyle).parseAsync(parsed.args),
            "已更新 ~",
          )
          break
      }
    }
  }

  async listModels() {
    return this.standardReply(
      [...llmModelTypeSchema.options.map((o, i) => `${i + 1}. ${o}`)].join(
        "\n",
      ),
      ["system set-model"],
    )
  }
}
