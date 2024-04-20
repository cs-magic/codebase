import { FileBox } from "file-box"
import { z } from "zod"
import {
  type LangType,
  langTypeSchema,
} from "../../../../packages/i18n/schema"
import { type BackendType } from "../../../../packages/llm/schema/llm"
import {
  type LlmModelType,
  llmModelTypeSchema,
} from "../../../../packages/llm/schema/providers"
import { FeatureMap } from "../../schema/commands"
import { CommandStyle } from "../../schema/wechat-user"
import { getConvPreference } from "../../utils/get-conv-preference"
import { getConvTable } from "../../utils/get-conv-table"
import { parseLimitedCommand } from "../../utils/parse-command"
import { BaseManager } from "./base.manager"

const commandTypeSchema = z.enum([
  "list-models",
  "set-model",
  // "set-backend",
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
          const model = await llmModelTypeSchema.parseAsync(parsed.args)
          await this.setModel(model)
          break

        case "set-lang":
          const lang = await langTypeSchema.parseAsync(parsed.args)
          await this.setLang(lang)
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

        case "set-max-output-lines":
          await this.setMaxOutputLines(
            await z.number().int().min(1).parseAsync(Number(parsed.args)),
          )
          break

        case "set-command-style":
          await this.setCommandStyle(
            await z.nativeEnum(CommandStyle).parseAsync(parsed.args),
          )
          break
      }
    }
  }

  async setCommandStyle(commandStyle: CommandStyle) {
    const preference = await getConvPreference({
      convId: this.convId,
      isRoom: this.isRoom,
    })
    await getConvTable(this.isRoom).update({
      where: {
        id: this.convId,
      },
      data: {
        preference: {
          ...preference,
          commandStyle,
        },
      },
    })
    await this.getStatus(true)
  }

  async setMaxOutputLines(maxOutputLines?: number) {
    const preference = await this.getConvPreference()
    await getConvTable(this.isRoom).update({
      where: {
        id: this.convId,
      },
      data: {
        preference: {
          ...preference,
          maxOutputLines,
        },
      },
    })
    await this.getStatus(true)
  }

  async listModels() {
    return this.standardReply(
      [...llmModelTypeSchema.options.map((o, i) => `${i + 1}. ${o}`)].join(
        "\n",
      ),
      ["system set-model"],
    )
  }

  async setModel(value: LlmModelType) {
    const preference = await this.getConvPreference()
    await getConvTable(this.isRoom).update({
      where: {
        id: this.convId,
      },
      data: {
        preference: {
          ...preference,
          model: value,
        },
      },
    })
    await this.getStatus(true)
    // await this.standardReply(`模型更新成功：${preference.model} --> ${value}`, [
    //   "system list-models",
    // ])
  }

  async setBackend(value: BackendType) {
    const preference = await this.getConvPreference()
    await getConvTable(this.isRoom).update({
      where: {
        id: this.convId,
      },
      data: {
        preference: {
          ...preference,
          backend: value,
        },
      },
    })
    await this.getStatus(true)
    // await this.standardReply(
    //   `后端更新成功：${preference.backend} --> ${value}`,
    //   ["system list-backends"],
    // )
  }

  async setLang(value: LangType) {
    const preference = await this.getConvPreference()
    await getConvTable(this.isRoom).update({
      where: {
        id: this.convId,
      },
      data: {
        preference: {
          ...preference,
          lang: value,
        },
      },
    })
    await this.getStatus(true)
    // await this.standardReply(`语言更新成功：${preference.lang} --> ${value}`, [
    //   "system list-langs",
    // ])
  }
}
