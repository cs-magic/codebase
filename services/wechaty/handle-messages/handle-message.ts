import { formatError } from "@cs-magic/common/utils/format-error"
import { type Message, type Wechaty } from "wechaty"
import { z } from "zod"
import {
  commandsSchema,
  type CommandType,
  featureTypeSchema,
} from "../schema/commands"
import { getBotContextFromMessage } from "../utils/bot-context"
import { formatBotQuery } from "../utils/format-bot-query"
import { parseLimitedCommand } from "../utils/parse-command"
import { storageMessage } from "../utils/storage-message"
import { BaseManager } from "./managers/base.manager"
import { ChatManager } from "./managers/chat.manager"
import { ParserManager } from "./managers/parser.manager"
import { SystemManager } from "./managers/system.manager"
import { TodoManager } from "./managers/todo.manager"

export const handleMessage = async (bot: Wechaty, message: Message) => {
  try {
    let manager
    const text = message.text().trim().toLowerCase()

    await storageMessage(message)

    const result = parseLimitedCommand<CommandType>(text, commandsSchema)
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
          const featureType = await z
            .enum([...featureTypeSchema.options, ""])
            .parseAsync(input.trim().toLowerCase())
          switch (featureType) {
            case "":
              manager = new BaseManager(bot, message)
              return await manager.standardReply(
                (await manager.getTemplate()).help,
              )
            case "system":
              return new SystemManager(bot, message).help()
            case "todo":
              return new TodoManager(bot, message).help()
            case "chatter":
              return new ChatManager(bot, message).help()
            case "parser":
              return new ParserManager(bot, message).help()
          }

        case "system":
          return new SystemManager(bot, message).parse(result.args)

        case "parser":
          return new ParserManager(bot, message).parse(result.args)

        case "todo":
          return new TodoManager(bot, message).parse(result.args)

        case "chatter":
          return new ChatManager(bot, message).parse(result.args)
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
