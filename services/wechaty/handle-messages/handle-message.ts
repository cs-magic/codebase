import { formatError } from "@cs-magic/common/utils/format-error"
import { formatQuery } from "@cs-magic/common/utils/format-query"
import { logger } from "@cs-magic/log/logger"
import { type Message, type Wechaty } from "wechaty"
import { commandsSchema, type CommandType } from "../schema/commands"
import { CommandStyle } from "../schema/wechat-user"
import { getBotContext } from "../utils/bot-context"
import { botNotify } from "../utils/bot-notify"
import { formatFooter } from "../utils/format-footer"
import { formatTalker } from "../utils/format-talker"
import { getConvPreference } from "../utils/get-conv-preference"
import { parseLimitedCommand } from "../utils/parse-command"
import { storageMessage } from "../utils/storage-message"
import { BaseManager } from "./managers/base.manager"
import { ChatManager } from "./managers/chat.manager"
import { ParserManager } from "./managers/parser.manager"
import { SystemManager } from "./managers/system.manager"
import { TodoManager } from "./managers/todo.manager"

export const handleMessage = async (bot: Wechaty, message: Message) => {
  try {
    logger.info(
      `[onMessage] ${await formatTalker(message)}: ${JSON.stringify(message.payload)}`,
    )

    await storageMessage(message)

    const result = parseLimitedCommand<CommandType>(
      message.text().trim().toLowerCase(),
      commandsSchema,
    )
    // logger.debug(result)

    if (result) {
      switch (result.command) {
        case "ding":
          return void bot.sendQueue.addTask(() => message.say("dong"))

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
  } catch (e) {
    let s = formatError(e)

    // bug (not solved): https://github.com/wechaty/puppet-padlocal/issues/292
    // from wang, 2024-04-13 01:36:14
    if (s.includes("filterValue not found for filterKey: id"))
      s = `对不起，您的平台（例如 win 3.9.9.43）不支持 at 小助手，请更换平台再试`

    // !WARNING: 这是个 ANY EXCEPTION 机制，有可能导致无限循环，导致封号！！！
    const context = await getBotContext(bot, message)
    const preference = await getConvPreference(message)
    // void botNotify(bot, await formatBotQuery(context, "哎呀出错啦", s))
    void botNotify(
      bot,
      formatQuery(
        `ERR: ${s}`,
        preference.commandStyle === CommandStyle.standard
          ? {
              title: `System Notification`,
              footer: formatFooter(context),
            }
          : undefined,
      ),
    )
  }
}
