import qrcodeTerminal from "qrcode-terminal"
import { WechatyBuilder } from "wechaty"
import { prettyError } from "../common-common/pretty-error"
import { MessageHandlers } from "./config"
import { botContext } from "./schema"

export const createWechatyBot = async ({ name }: { name?: string }) => {
  console.log("-- createBot: ", { name })
  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
    puppetOptions: {},
  })

  console.log("-- registering handlers")
  const handlers = MessageHandlers.map((H) => {
    const h = new H(bot, botContext)
    console.log(`-- registering handler(name=${h.name})`)
    return h
  })

  await bot
    .on("scan", (value, status) => {
      console.log(
        `Scan the following  QR Code to login: ${status}\n[or from web]: https://wechaty.js.org/qrcode/${encodeURIComponent(value)} `,
      )
      qrcodeTerminal.generate(value, { small: true })
    })
    .on("login", async (user) => {
      console.log(`User logged in: `, user.payload)
    })
    .on("message", async (message) => {
      const sender = message.talker()
      console.log("<< message: ", {
        ...message.payload,
        user: { name: sender.name(), avatar: sender.payload?.avatar },
      })

      try {
        for (const handler of handlers) {
          const res = await handler.onMessage(message)
          // if handled, then prevent going through the following ones
          if (res) return
        }
      } catch (e) {
        const s = prettyError(e)
        await message.say(`哎呀出错啦！原因： ${s}`)
      }
    })
    .start()

  return bot
}
