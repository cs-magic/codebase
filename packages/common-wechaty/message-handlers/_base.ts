import { Message, Wechaty } from "wechaty"

export class BaseMessageHandler {
  public bot: Wechaty

  constructor(bot: Wechaty) {
    this.bot = bot
  }

  /**
   *
   * @param message
   *
   * @return
   *  - true: finished
   *  - false: continue to the next handler
   */
  public async onMessage(message: Message): Promise<boolean | void> {
    throw new Error("onMessage not implemented.")
  }
}
