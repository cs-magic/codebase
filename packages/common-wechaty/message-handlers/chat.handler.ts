import { type Message } from "wechaty"
import { z } from "zod"
import { getConvPreference } from "../utils/get-conv-preference"
import { parseCommand } from "../utils/parse-command"
import { BaseHandler } from "./base.handler"
import { chatCommands } from "./chat.commands"
import { ChatManager } from "./chat.manager"

export class ChatHandler extends BaseHandler {
  public async onMessage(message: Message) {
    const preference = await getConvPreference(message)
    const title = preference.lang === "zh" ? "AI 聊天室" : "AI Chat"
    const manager = new ChatManager(this.bot, title, message)

    const result = parseCommand<z.infer<typeof chatCommands>>(
      message.text(),
      chatCommands,
    )

    if (!result) return manager.safeReplyWithAI()

    switch (result.command) {
      case "enable-chat":
        return manager.enableChat()

      case "disable-chat":
        return manager.disableChat()

      case "new-topic":
        return manager.newTopic(result.args)

      case "check-topic":
        return manager.checkTopic(result.args)

      case "list-topics":
        return manager.listTopicsAction()
    }
  }
}
