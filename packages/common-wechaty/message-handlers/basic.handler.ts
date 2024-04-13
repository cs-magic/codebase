import { LangType } from "@/schema/wechat-user"
import { Message } from "wechaty"
import { z } from "zod"
import {
  BackendType,
  backendTypeSchema,
  langTypeSchema,
} from "../../common-llm/schema/llm"
import {
  LlmModelType,
  llmModelTypeSchema,
} from "../../common-llm/schema/providers"
import { renderBotTemplate } from "../utils/bot-template"
import { parseCommand } from "../utils/parse-command"
import { validateInput } from "../utils/validate-input"
import { BaseHandler } from "./base.handler"
import { basicCommands } from "./basic.commands"
import { BasicManager } from "./basic.manager"

export class BasicHandler extends BaseHandler {
  public async onMessage(message: Message) {
    const manager = new BasicManager("基本信息", message, this.bot.wxid)

    const result = parseCommand<z.infer<typeof basicCommands>>(
      message.text(),
      basicCommands,
    )
    if (!result) return

    const template = await renderBotTemplate(message)

    switch (result.command) {
      case "ding":
        await message.say("dong")
        return

      case "":
      case "help":
      case "帮助":
        return manager.standardReply(template.help)

      case "status":
      case "状态":
        return manager.standardReply(template.status)

      case "list-models":
      case "查询模型列表":
        return manager.standardReply(
          [
            ...llmModelTypeSchema.options.map((o, i) => `${i + 1}. ${o.value}`),
          ].join("\n"),
          ["set-model"],
        )

      case "set-model":
      case "设置模型":
        const model = await validateInput<LlmModelType>(
          llmModelTypeSchema,
          result.args,
        )
        return manager.setModel(model)

      case "set-backend":
      case "设置后端":
        const backend = await validateInput<BackendType>(
          backendTypeSchema,
          result.args,
        )
        return manager.setBackend(backend)

      case "set-lang":
      case "设置语言":
        const lang = await validateInput<LangType>(langTypeSchema, result.args)
        return manager.setLang(lang)
    }
  }
}
