import qrcodeTerminal from "qrcode-terminal"
import { WechatyBuilder } from "wechaty"
import { MessageHandlers } from "./config"

export const createWechatyBot = async ({ name }: { name?: string }) => {
  console.log("-- createBot: ", { name })

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了

    puppetOptions: {},
  })

  const handlers = MessageHandlers.map((H) => new H(bot))

  await bot
    .on("scan", (value, status) => {
      console.log(
        `Scan the following  QR Code to login: ${status}\n[or from web]: https://wechaty.js.org/qrcode/${encodeURIComponent(value)} `,
      )
      qrcodeTerminal.generate(value, { small: true })
    })
    .on("login", async (user) => {
      console.log(`User logged in: `, user)
    })
    .on("message", async (message) => {
      const room = message.room()
      const roomName = (await room?.topic()) ?? ""
      if (!/test/.exec(roomName)) return

      try {
        for (const handler of handlers) {
          const res = await handler.onMessage(message)
          if (res) return
        }
      } catch (e) {
        console.error(e instanceof Error ? e.message : e)
        await message.say(
          `哎呀出错啦！原因： ${e instanceof Error ? e.message : "未知"}`,
        )
      }
    })
    .start()

  return bot
}
