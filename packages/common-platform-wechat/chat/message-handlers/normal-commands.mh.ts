import { MessageInterface } from "wechaty/impls"
import {
  NormalCommand,
  normalCommands,
  parseCommands,
} from "../../../common-common/parse-commands"
import { BaseMessageHandler } from "./_base.mh"

export class NormalCommandsMessageHandler extends BaseMessageHandler {
  public async onMessage(message: MessageInterface) {
    const { command, args } = parseCommands<NormalCommand>(
      message.text(),
      normalCommands,
    )

    // 回复自己需要
    // web端会直接抛error，pad端会ignore
    const listener = message.listener()

    if (!command) return

    switch (command) {
      case "ding":
        await message.say("dong")
        break

      case "help":
        await message.say("todo")
        break

      case "status":
        await message.say("todo")
        break
    }

    return true
  }
}
