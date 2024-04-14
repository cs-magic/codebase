import { Message } from "wechaty"
import { prettyMessage } from "../../utils/pretty-message"
import { BaseHandler } from "./base.handler"

export class LogHandler extends BaseHandler {
  public async onMessage(message: Message) {
    const s = prettyMessage(message)
    console.log(`-- onMessage: ${s}`)

    // console.log("-- mention text: ", await message.mentionText())

    // try {
    //   const post = await message.toPost()
    //   console.log("-- post: ", post)
    //
    //   const parent = await post.parent()
    //   console.log("-- parent: ", parent)
    // } catch (e) {
    //   console.error(e)
    // }
  }
}
