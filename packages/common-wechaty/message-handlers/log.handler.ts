import { prettyString } from "packages/common-common/pretty-string"
import { Message, types } from "wechaty"
import { BaseHandler } from "./base.handler"

export class LogHandler extends BaseHandler {
  public async onMessage(message: Message) {
    // const data = {
    //   ...message.payload,
    //   text: prettyString(
    //     message.payload?.text ?? "",
    //     // 30
    //   ),
    // }
    console.log(
      `<< message: `,
      // JSON.stringify(data)
      // data,
      message,
      // message.payload,
    )

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
