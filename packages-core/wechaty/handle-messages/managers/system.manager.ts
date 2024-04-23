import { FileBox } from "file-box"
import { z } from "zod"
import { langTypeSchema } from "../../../../packages-to-classify/i18n/schema"
import { backendTypeSchema } from "../../../../packages-to-classify/llm/schema/llm.base"
import { llmModelTypeSchema } from "../../../../packages-to-classify/llm/schema/llm.models"
import { FeatureMap } from "../../schema/commands"
import { CommandStyle } from "../../schema/wechat-user"
import { parseLimitedCommand } from "../../utils/parse-command"
import { BaseManager } from "./base.manager"

const commandTypeSchema = z.enum([
  "list-models",
  "set-model",
  "set-backend",
  "list-langs",
  "set-lang",
  "set-avatar",
  "set-max-output-lines",
  "set-command-style",
])
type CommandType = z.infer<typeof commandTypeSchema>
const i18n: FeatureMap<CommandType> = {
  zh: {
    title: "操作系统",
    description: "这里是一些特权命令",
    commands: {
      查询模型: {
        type: "list-models",
        description: "查询支持的大模型列表",
      },
      设置模型: {
        type: "set-model",
        description: "设置选用另一款大语言模型",
      },
      查询语言: {
        type: "list-langs",
        description: "查询支持的语言列表",
      },
      设置语言: {
        type: "set-lang",
        description: "设置选用另一种系统语言",
      },
      设置头像: {
        type: "set-avatar",
        description: "",
      },
      设置最大输出行数: {
        type: "set-max-output-lines",
        description: "",
      },
    },
  },
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
      "list-langs": {
        type: "list-langs",
        description: "list supported languages",
      },
      "set-lang": {
        type: "set-lang",
        description: "switch to another language",
      },
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

    const commands = this.i18n[await this.getLang()].commands
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
          )
          break

        case "set-lang":
          await this.updatePreferenceInDB(
            "lang",
            await langTypeSchema.parseAsync(parsed.args),
          )
          break

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
          )
          break

        case "set-max-output-lines":
          await this.updatePreferenceInDB(
            "maxOutputLines",
            await z.number().int().min(1).parseAsync(Number(parsed.args)),
          )
          break

        case "set-command-style":
          await this.updatePreferenceInDB(
            "commandStyle",
            await z.nativeEnum(CommandStyle).parseAsync(parsed.args),
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
