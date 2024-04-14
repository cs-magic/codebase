import { type Message, type Wechaty } from "wechaty"

export class BaseHandler {
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
   * ## V2: 非异常无阻塞串行
   * ## V1: 有阻塞串行
   *  - true: finished
   *  - false: continue to the next handler
   */
  public async onMessage(message: Message): Promise<any> {
    throw new Error("not implemented.")
  }

  /**
   * triggered by `/help [name]`
   */
  public help(): Promise<any> {
    throw new Error(" not implemented.")
  }
}
