import { SEPARATOR_BOX } from "@cs-magic/common/const"
import { formatError } from "@cs-magic/common/utils/format-error"
import { formatQuery } from "@cs-magic/common/utils/format-query"
import { logger } from "@cs-magic/log/logger"
import omit from "lodash/omit"
import { type Message, types, type Wechaty } from "wechaty"
import {
  commandsSchema,
  type CommandType,
  ManagerType,
} from "../../schema/commands"
import { formatFooter } from "../../utils/format-footer"
import { formatTalkerFromMessage } from "../../utils/format-talker"
import { parseLimitedCommand } from "../../utils/parse-command"
import { parseText } from "../../utils/parse-message"
import { storageMessage } from "../../utils/storage-message"
import { BasePlugin } from "./plugins/base.plugin"
import { ChatterPlugin } from "./plugins/chatter.plugin"
import { ParserPlugin } from "./plugins/parser.plugin"
import { RoomPlugin } from "./plugins/room.plugin"
import { SystemPlugin } from "./plugins/system.plugin"
import { TaskPlugin } from "./plugins/task.plugin"

export const handleMessage = async (bot: Wechaty, message: Message) => {
  const tmm = {
    todo: new TaskPlugin(bot, message),
    chatter: new ChatterPlugin(bot, message),
    parser: new ParserPlugin(bot, message),
    system: new SystemPlugin(bot, message),
    base: new BasePlugin(bot, message),
    room: new RoomPlugin(bot, message),
  } satisfies Record<ManagerType, BasePlugin>

  try {
    logger.info(
      `[onMessage] ${await formatTalkerFromMessage(message)}: %o\n${SEPARATOR_BOX}\n${message.text()}\n${SEPARATOR_BOX}`,
      omit(message.payload, ["text"]),
    )

    if (message.text() === "test") {
      /**
       * quote to reply
       */
      // await message.say(
      //   await bot.Post.builder()
      //     .add("hello")
      //     .reply(await message.toPost())
      //     .build(),
      // )
      // await message.conversation().say("test", talker)
      // const post = await bot.Post.builder().add("quote reply").build()
      // await message.say(post)
      // await bot.publish(post)
      /**
       * reply with a message
       */
      void message.say(
        new bot.UrlLink({
          title:
            "自定义内容 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
          description:
            "自定义摘要 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
          url: "https://p01.cs-magic.cn",
          thumbnailUrl:
            "https://avatars.githubusercontent.com/u/33591398?s=80&v=4",
        }),
      )
    }

    await storageMessage(message)

    const text = parseText(message.text())
    const result = parseLimitedCommand<CommandType>(text, commandsSchema)
    // logger.debug("parsed command: %o", { text, result })

    if (result) {
      switch (result.command) {
        case "ding":
          return void bot.context.addSendTask(() => message.say("dong"))

        case "help":
          return await tmm.base.getHelp(true)

        case "status":
          return await tmm.base.getStatus(true)

        case "recall":
          return await tmm.base.recallQuotedMessage()

        case "love":
          return await message.say(
            "你有什么想和我说的吗？（我是你最乖的树洞，我们之间的对话不会告诉任何人哦）",
          )

        case "system":
          return await tmm.system.parse(result.args)

        case "todo":
          return await tmm.todo.parse(result.args)

        case "chatter":
          return await tmm.chatter.parse(result.args)

        case "parser":
          return await tmm.parser.parse(result.args)

        case "parse":
          return await tmm.parser.parseQuote()

        case "room":
          return await tmm.room.parse(result.args)
      }
    }

    // todo: here has type error
    // else if (text.startsWith("/")) await parseAsyncWithFriendlyErrorMessage(commandsSchema, text)
    else {
      // free handlers
      if (message.type() === types.Message.Image) {
        const image = await message.toFileBox()
      }
      if (message.type() === types.Message.Url)
        await new ParserPlugin(bot, message).parseSelf()
      else {
        await new ChatterPlugin(bot, message).safeReplyWithAI()
      }
    }
  } catch (e) {
    let s = formatError(e)

    // bug (not solved): https://github.com/wechaty/puppet-padlocal/issues/292
    // from wang, 2024-04-13 01:36:14
    if (s.includes("filterValue not found for filterKey: id"))
      s = `对不起，您的平台（例如 win 3.9.9.43）不支持 at 小助手，请更换平台再试`

    // !WARNING: 这是个 ANY EXCEPTION 机制，有可能导致无限循环，导致封号！！！
    // void botNotify(bot, await formatBotQuery(context, "哎呀出错啦", s))
    void bot.context.notify(
      message,
      formatQuery(`❌ ${s}`, {
        title: `System Notification`,
        footer: formatFooter(bot.context.data),
        // commandStyle: preference.display.style,
      }),
    )
  }
}
