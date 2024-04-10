import { Message, Wechaty } from "wechaty"

export class BaseMessageHandler<T = object> {
  public bot: Wechaty
  public context: T

  constructor(bot: Wechaty, context: T) {
    this.bot = bot
    this.context = context
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
    // 回复自己需要
    // web端会直接抛error，pad端会ignore
    // const listener = message.listener()

    throw new Error("onMessage not implemented.")
  }
}
