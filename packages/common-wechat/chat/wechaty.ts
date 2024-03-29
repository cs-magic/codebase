import { downloadCardFromServer } from "@/utils/server-download-card"
import { FileBox } from "file-box"
import qrcodeTerminal from "qrcode-terminal"
import { WechatyBuilder } from "wechaty"
import { types } from "wechaty-puppet"

export const parseUrlFromWechatUrlMessage = (text: string): string | null => {
  const m = /<url>(.*?)<\/url>/.exec(text)
  return m?.[1] ?? null
}

void WechatyBuilder.build({
  name: "mark0", // 加了名字后就可以自动存储了
})
  .on("scan", (value, status) => {
    console.log(
      `Scan the following  QR Code to login: ${status}\n[or from web]: https://wechaty.js.org/qrcode/${encodeURIComponent(value)} `,
    )
    qrcodeTerminal.generate(value, { small: true })
  })
  .on("login", (user) => console.log(`User logged in: `, user))
  .on("message", async (message) => {
    const text = message.text()
    // suppress other messages
    if (!/mark|小野|我的文件助手/.test(message.talker().name().toLowerCase()))
      return

    console.log(`<< message: `, message.payload)

    // link
    if (message.type() === types.Message.Url) {
      const url = parseUrlFromWechatUrlMessage(text)
      if (!url) return

      if (text.includes("哔哩哔哩")) {
        console.log("-- parsing bilibili")
        const { success, data } = await downloadCardFromServer(url)
        if (!success) return

        const file = FileBox.fromStream(data.stream, data.fileName)
        await message.say(file)
        console.log("-- ✅ sent file")
        return
      }
    }

    // await message.say("ok ~")
  })
  .start()
