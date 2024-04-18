import { formatError } from "@cs-magic/common/utils/format-error"
import { type Message, type Wechaty } from "wechaty"
import { commandsSchema, type CommandType } from "../schema/commands"
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
    // console.log(await getQuote(message))

    // serialize first
    await storageMessage(message)

    const result = parseLimitedCommand<CommandType>(
      message.text().trim().toLowerCase(),
      commandsSchema,
    )
    // logger.debug(result)

    if (result) {
      switch (result.command) {
        case "ding":
          return bot.sendQueue.addTask(() => message.say("dong"))

        case "help":
          return await new BaseManager(bot, message).getHelp(true)

        case "love":
          return await message.say(
            "你有什么想和我说的吗？（我是你最乖的树洞，我们之间的对话不会告诉任何人哦）",
          )

        case "status":
          return await new BaseManager(bot, message).getStatus(true)

        case "system":
          return await new SystemManager(bot, message).parse(result.args)

        case "parser":
          return await new ParserManager(bot, message).parse(result.args)

        case "todo":
          return await new TodoManager(bot, message).parse(result.args)

        case "chatter":
          return await new ChatManager(bot, message).parse(result.args)
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
    // console.log("-- error happened")
    let s = formatError(e)
    // console.log(`-- error: ${s}`)
    const context = await getBotContextFromMessage(bot, message)
    // console.log(`-- context: ${JSON.stringify(context)}`)

    // bug (not solved): https://github.com/wechaty/puppet-padlocal/issues/292
    // from wang, 2024-04-13 01:36:14
    if (s.includes("filterValue not found for filterKey: id")) {
      s = `对不起，您的平台（例如 win 3.9.9.43）不支持 at 小助手，请更换平台再试`
      await bot.sendQueue.addTask(async () =>
        message.say(await formatBotQuery(context, "哎呀出错啦", s)),
      )
    }
    // !WARNING: 这是个 ANY EXCEPTION 机制，有可能导致无限循环，导致封号！！！
    // await message.say(await prettyBotQuery(context, "哎呀出错啦", s))

    // console.log(`-- finished handling messages`)
  }
}
