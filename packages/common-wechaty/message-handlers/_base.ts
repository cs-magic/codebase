import { type Message, type Wechaty } from "wechaty"

export class BaseMessageHandler {
  public bot: Wechaty
  public name: string

  constructor(name: string, bot: Wechaty) {
    this.name = name
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
    // 回复自己需要
    // web端会直接抛error，pad端会ignore
    // const listener = message.listener()

    throw new Error("onMessage not implemented.")
  }
}
