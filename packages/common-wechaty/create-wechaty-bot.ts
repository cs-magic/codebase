import qrcodeTerminal from "qrcode-terminal"
import { Wechaty, WechatyBuilder } from "wechaty"
import { prettyError } from "../common-common/pretty-error"
import { sleep } from "../common-datetime/utils"
import { MessageHandlers } from "./config"
import { loadBotContext } from "./schema"

export const createWechatyBot = async ({ name }: { name?: string }) => {
  console.log("-- create bot: ", { name })
  const bot: Wechaty = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
  })
  console.log("-- loading context")
  bot.context = await loadBotContext()

  console.log("-- registering handlers")
  const handlers = MessageHandlers.map((H) => {
    const h = new H(bot)
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
      console.log("<< message: ", {
        message: message.payload,
        sender: message.talker().payload,
        room: message.room()?.payload,
      })

      try {
        for (const handler of handlers) {
          const res = await handler.onMessage(message)
          // if handled, then prevent going through the following ones
          if (res) return
        }
      } catch (e) {
        const s = prettyError(e)
        // await message.say(`哎呀出错啦！原因： ${s}`)
      }

      await sleep(3e3)
    })
    .start()

  return bot
}
