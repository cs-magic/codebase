import { prettyString } from "packages/common-common/pretty-string"
import { Message } from "wechaty"
import { BaseHandler } from "./base.handler"

export class LogHandler extends BaseHandler {
  public async onMessage(message: Message) {
    const data = {
      ...message.payload,
      text: prettyString(message.payload?.text ?? "", 30),
    }
    console.log(`<< message: ${JSON.stringify(data)}`)
  }
}
