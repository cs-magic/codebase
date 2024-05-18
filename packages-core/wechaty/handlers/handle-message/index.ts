import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { safeCallLLM } from "@cs-magic/llm"
import { logger } from "@cs-magic/log/logger"
import omit from "lodash/omit"
import { type Message, types, type Wechaty } from "wechaty"
import {
  commandsSchema,
  type CommandType,
  ManagerType,
} from "../../schema/commands"
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
  } satisfies Partial<Record<ManagerType, BasePlugin>>

  // message.toImage()

  const sendLink = () => {
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

  const base = tmm.base

  const type = message.type()
  const text = message.text()

  logger.info(
    [
      `[onMessage ${types.Message[type]}]: %o`,
      await formatTalkerFromMessage(message),
      SEPARATOR_LINE,
      text,
    ].join("\n"),
    omit(message.payload, ["text", "type"]),
  )

  await storageMessage(message)

  switch (type) {
    case types.Message.Url:
      await new ParserPlugin(bot, message).parseSelf()
      return

    case types.Message.Video:
      logger.debug("== Video ==")
      return

    case types.Message.Image:
      {
        logger.debug("== Image ==")
        // todo: preference seems not work
        const preference = await base.getConvPreference()
        const enabled = preference.on.message.image.describe.enabled
        logger.debug({ enabled })
        if (!enabled) return

        const action = async () => {
          const image = await message.toFileBox()
          const result = await safeCallLLM({
            model: "gpt-4o",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "描述一下这张图里的内容",
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: await image.toDataURL(),
                    },
                  },
                ],
              },
            ],
          })
          const content = result.response?.choices[0]?.message.content
          if (content) await base.reply(content)
        }
        // void action()
      }
      return

    case types.Message.Text: {
      const text = parseText(message.text())
      const result = parseLimitedCommand<CommandType>(text, commandsSchema)
      // logger.debug("parsed command: %o", { text, result })

      if (result) {
        switch (result.command) {
          case "ding":
            return void bot.context?.addSendTask(() => message.say("dong"))

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
            return // await tmm.chatter.parse(result.args)

          case "parser":
            return await tmm.parser.parse(result.args)

          case "parse":
            return await tmm.parser.parseQuote()

          case "room":
            return // await tmm.room.parse(result.args)

          case "test-create-image-from-id": {
            return await tmm.parser.parseQuotedImage()
          }

          case "quote-reply": {
            return await tmm.parser.quoteReply()
          }
        }
      } else {
        await new ChatterPlugin(bot, message).safeReplyWithAI()
      }
    }
  }
}
