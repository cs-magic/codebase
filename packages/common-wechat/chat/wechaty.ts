import { WechatyBuilder } from "wechaty"
import { types } from "wechaty-puppet"
import { fetchBilibiliDetail } from "../../common-bilibili/actions-client"
import { getBvidFromb23tv } from "../../common-bilibili/utils"

const wechaty = WechatyBuilder.build({
  name: "mark0", // 加了名字后就可以自动存储了
})

void wechaty
  .on("scan", (qrcode, status) =>
    console.log(
      `Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`,
    ),
  )
  .on("login", (user) => console.log(`User logged in: `, user))
  .on("message", async (message) => {
    const text = message.text()
    // suppress other messages
    if (!message.talker().name().toLowerCase().includes("mark")) return

    console.log(`<< message: `, message)
    // link
    if (message.type() === types.Message.Url) {
      if (text.includes("哔哩哔哩")) {
        const m = /<url>(.*?)<\/url>/.exec(text)
        const url = m?.[1]
        if (url) {
          const { success, data: bvid } = await getBvidFromb23tv(url)
          if (success && bvid) {
            const detail = await fetchBilibiliDetail(bvid)
            console.log({ detail })
          }
        }
      }
    }
  })
  .start()
