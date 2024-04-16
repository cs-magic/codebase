import { formatError } from "@cs-magic/common/utils/format-error"
import { parseAsyncWithFriendlyErrorMessage } from "@cs-magic/common/utils/parse-async-with-friendly-error-message"
import {
  TaskStatusSchema,
  type TaskStatusType,
} from "@cs-magic/prisma/prisma/generated/zod/inputTypeSchemas/TaskStatusSchema"
import { type Message, type Wechaty } from "wechaty"
import {
  inputLangTypeSchema,
  type LangType,
} from "../../../packages/common-i18n/schema"
import {
  type BackendType,
  backendTypeSchema,
} from "../../../packages/common-llm/schema/llm"
import {
  type LlmModelType,
  llmModelTypeSchema,
} from "../../../packages/common-llm/schema/providers"
import {
  commandsSchema,
  type CommandType,
  featureTypeSchema,
} from "../schema/commands"
import { getBotContextFromMessage } from "../utils/bot-context"
import { formatBotQuery } from "../utils/format-bot-query"
import { parseCommand } from "../utils/parse-command"
import { storageMessage } from "../utils/storage-message"
import { BaseManager } from "./managers/base.manager"
import { BasicManager } from "./managers/basic.manager"
import { ChatManager } from "./managers/chat.manager"
import { ParserManager } from "./managers/parser.manager"
import { TodoManager } from "./managers/todo.manager"

export const handleMessage = async (bot: Wechaty, message: Message) => {
  try {
    let manager
    const type = message.type()
    const text = message.text().trim().toLowerCase()

    await storageMessage(message)

    const result = parseCommand<CommandType>(text, commandsSchema)
    if (result) {
      const input = result.args

      switch (result.command) {
        case "ding":
          return message.say("dong")

        case "status":
          manager = new BaseManager(bot, message)
          return await manager.standardReply(
            (await manager.getTemplate()).status,
          )

        case "help":
          const featureType = await featureTypeSchema.parseAsync(
            input.trim().toLowerCase(),
          )
          switch (featureType) {
            case "":
              manager = new BaseManager(bot, message)
              return await manager.standardReply(
                (await manager.getTemplate()).help,
              )
            case "basic":
              return new BasicManager(bot, message).help()
            case "todo":
              return new TodoManager(bot, message).help()
            case "chatter":
              return new ChatManager(bot, message).help()
            case "parser":
              return new ParserManager(bot, message).help()
          }

        case "list-models":
          manager = new BasicManager(bot, message)
          return manager.standardReply(
            [
              ...llmModelTypeSchema.options.map((o, i) => `${i + 1}. ${o}`),
            ].join("\n"),
            ["set-model"],
          )

        case "set-model":
          manager = new BasicManager(bot, message)
          const model = await parseAsyncWithFriendlyErrorMessage<LlmModelType>(
            llmModelTypeSchema,
            result.args,
          )
          return manager.setModel(model)

        case "set-backend":
          manager = new BasicManager(bot, message)
          const backend = await parseAsyncWithFriendlyErrorMessage<BackendType>(
            backendTypeSchema,
            result.args,
          )
          return manager.setBackend(backend)

        case "set-lang":
          manager = new BasicManager(bot, message)
          const lang = await parseAsyncWithFriendlyErrorMessage<LangType>(
            inputLangTypeSchema,
            result.args,
          )
          return manager.setLang(lang)

        case "enable-parser":
          manager = new ParserManager(bot, message)
          await manager.enableParser()
          return

        case "disable-parser":
          manager = new ParserManager(bot, message)
          await manager.disableParser()
          return

        case "todo":
        case "list-todo":
          manager = new TodoManager(bot, message)
          return manager.listTodoAction()

        case "add-todo":
          manager = new TodoManager(bot, message)
          return manager.addTodo(input)

        case "update-todo":
          manager = new TodoManager(bot, message)
          const m = /^\s*(\d+)\s*(.*?)\s*$/.exec(input)
          if (!m) throw new Error("输入不合法")

          const status =
            await parseAsyncWithFriendlyErrorMessage<TaskStatusType>(
              TaskStatusSchema,
              m?.[2],
            )
          return manager.updateTodo(Number(m[1]), status)

        case "enable-chat":
          manager = new ChatManager(bot, message)
          return await manager.enableChat()

        case "disable-chat":
          manager = new ChatManager(bot, message)
          return await manager.disableChat()

        case "new-topic":
          manager = new ChatManager(bot, message)
          return manager.newTopic(result.args)

        case "check-topic":
          manager = new ChatManager(bot, message)
          return manager.checkTopic(result.args)

        case "list-topics":
          manager = new ChatManager(bot, message)
          return manager.listTopicsAction()
      }
    }

    // todo: here has type error
    // else if (text.startsWith("/")) await parseAsyncWithFriendlyErrorMessage(commandsSchema, text)
    else {
      // free handlers
      await new ParserManager(bot, message).safeParseCard()

      await new ChatManager(bot, message).safeReplyWithAI()
    }

    // handle ai chat or so
  } catch (e) {
    let s = formatError(e)
    const context = await getBotContextFromMessage(bot, message)

    // bug (not solved): https://github.com/wechaty/puppet-padlocal/issues/292
    // from wang, 2024-04-13 01:36:14
    if (s.includes("filterValue not found for filterKey: id")) {
      s = `对不起，您的平台（例如 win 3.9.9.43）不支持 at 小助手，请更换平台再试`
      await message.say(await formatBotQuery(context, "哎呀出错啦", s))
    }
    // !WARNING: 这是个 ANY EXCEPTION 机制，有可能导致无限循环，导致封号！！！
    // await message.say(await prettyBotQuery(context, "哎呀出错啦", s))
  }
}
