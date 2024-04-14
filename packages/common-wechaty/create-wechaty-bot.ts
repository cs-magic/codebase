import { config } from "@/config"
import qrcodeTerminal from "qrcode-terminal"
import { type Wechaty, WechatyBuilder } from "wechaty"
import { WechatyEventListeners } from "node_modules/wechaty/src/schemas/wechaty-events"
import { MessageQueue } from "./handle-messages/message-queue"
import { getBotWxid } from "./utils/bot-wxid"

export const createWechatyBot = ({
  name,
  onScan,
}: {
  name?: string
  onScan?: WechatyEventListeners["scan"]
}) => {
  console.log("-- init bot: ", { name })

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
  }) as Wechaty // 等会再更新其他扩展的信息

  const mq = new MessageQueue(bot, 10)

  bot
    .on("error", async (err) => {
      console.error("-- error")
      console.error(err)
    })
    .on("scan", (value, status) => {
      if (onScan) {
        onScan(value, status)
      } else {
        console.log(
          `Scan the following  QR Code to login: ${status}\n[or from web]: https://wechaty.js.org/qrcode/${encodeURIComponent(value)} `,
        )
        qrcodeTerminal.generate(value, { small: true })
      }
    })
    .on("login", async (user) => {
      console.log(`User logged in: `, user.payload)

      bot.wxid = getBotWxid(user)

      bot.staticContext = {
        version: config.version,
        startTime: Date.now(),
      }
    })
    .on("message", async (message) => {
      await mq.enqueueMessage(message)
    })
  // .start()

  return bot
}
