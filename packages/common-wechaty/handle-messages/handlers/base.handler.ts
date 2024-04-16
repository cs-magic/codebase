import { type Message, type Wechaty } from "wechaty"
import { BaseManager } from "./base.manager"

export class BaseHandler {
  public bot: Wechaty
  public name: string
  protected manager?: BaseManager

  constructor(bot: Wechaty, name: string) {
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
}
