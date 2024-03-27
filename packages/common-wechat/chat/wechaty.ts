import { downloadCardFromServer } from "@/utils/server-download-card"
import { FileBox } from "file-box"
import qrcodeTerminal from "qrcode-terminal"
import { WechatyBuilder } from "wechaty"
import { types } from "wechaty-puppet"

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
    if (!message.talker().name().toLowerCase().includes("mark")) return

    console.log(`<< message: `, message)
    // link
    if (message.type() === types.Message.Url) {
      if (text.includes("哔哩哔哩")) {
        console.log("-- parsing bilibili")
        const m = /<url>(.*?)<\/url>/.exec(text)
        const url = m?.[1]
        if (!url) return
        const { success, data } = await downloadCardFromServer(url)
        if (!success) return

        // const file = FileBox.fromBuffer(Buffer.from([]))
        // const file = FileBox.fromUrl(data.filePath)
        const file = FileBox.fromStream(data.stream, data.fileName)
        // console.log("-- sending file: ", file)
        await message.say(file)
        console.log("-- ✅ sent file")
      }
    }
  })
  .start()
