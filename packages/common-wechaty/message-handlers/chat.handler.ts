import { type Message } from "wechaty"
import { z } from "zod"
import { parseCommand } from "../utils/parse-command"
import { BaseHandler } from "./base.handler"
import { chatCommands } from "./chat.commands"
import { ChatManager } from "./chat.manager"

export class ChatHandler extends BaseHandler {
  public async onMessage(message: Message) {
    const topicManager = new ChatManager("AI 聊天室", message, this.bot.wxid)

    const result = parseCommand<z.infer<typeof chatCommands>>(
      message.text(),
      chatCommands,
    )

    if (!result) return topicManager.safeReplyWithAI()

    switch (result.command) {
      case "enable-ai-chat":
        return topicManager.enableChat()

      case "disable-ai-chat":
        return topicManager.disableChat()

      case "new-topic":
        return topicManager.newTopic(result.args)

      case "check-topic":
        return topicManager.checkTopic(result.args)

      case "list-topics":
        return topicManager.listTopicsAction()
    }
  }
}
