import { MessageInterface } from "wechaty/impls"
import {
  parseCommands,
  SuperCommand,
  superCommands,
} from "../../../common-common/parse-commands"
import { BaseMessageHandler } from "./_base"

export class SuperCommandsMessageHandler extends BaseMessageHandler {
  public async onMessage(message: MessageInterface) {
    const { command, args } = parseCommands<SuperCommand>(
      message.text(),
      superCommands,
    )

    if (!command) return

    switch (command) {
      case "set-llm-model":
        // how to communicate with other plugins
        console.log("todo")
    }

    return true
  }
}
