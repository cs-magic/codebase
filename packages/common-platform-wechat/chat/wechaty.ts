import { downloadCardAction } from "@/core/download-card.action"
import { isWechatArticleUrl } from "@/core/providers/wechat-article/utils"
import { FileBox } from "file-box"
import qrcodeTerminal from "qrcode-terminal"
import { WechatyBuilder } from "wechaty"
import { types } from "wechaty-puppet"
import { parseUrlFromWechatUrlMessage } from "./utils"

const name = process.argv[2] ?? "default"
console.log({ name })

void WechatyBuilder.build({
  name, // 加了名字后就可以自动存储了
})
  .on("scan", (value, status) => {
    console.log(
      `Scan the following  QR Code to login: ${status}\n[or from web]: https://wechaty.js.org/qrcode/${encodeURIComponent(value)} `,
    )
    qrcodeTerminal.generate(value, { small: true })
  })
  .on("login", (user) => console.log(`User logged in: `, user))
  .on("message", async (message) => {
    const sender = message.talker()
    const avatar = await sender.avatar()
    console.log(`<< message: `, message.payload)

    const text = message.text()
    const room = message.room()
    const roomName = room ? await room.topic() : ""

    if (/CS魔法社|文案|test/.test(roomName)) {
      // link
      if (message.type() === types.Message.Url) {
        const url = parseUrlFromWechatUrlMessage(text)
        console.log("-- url in message: ", url)
        if (!url) return

        if (isWechatArticleUrl(url) || text.includes("哔哩哔哩")) {
          const image = await avatar.toDataURL()
          console.log(`-- triggering...`)
          const { success, data } = await downloadCardAction(url, {
            id: sender.id,
            name: sender.name(),
            image,
          })
          console.log("-- success: ", success)
          if (!success) return

          const file = FileBox.fromStream(data.stream, data.fileName)
          await message.say(file)
          console.log("-- ✅ sent file")
          return
        }
      }
    }

    // await message.say("ok ~")
  })
  .start()
