import { GEN_CARD_INPUT_PLACEHOLDER } from "@/config/card"
import { env } from "@/env"
import { chromium } from "playwright"
import { WechatyBuilder } from "wechaty"
import { types } from "wechaty-puppet"
import { fetchBvidFromb23tv } from "../../common-bilibili/actions"
import { fetchBilibiliDetail } from "../../common-bilibili/actions-client"

const wechaty = WechatyBuilder.build({
  name: "mark0", // 加了名字后就可以自动存储了
})

const browser = await chromium.launch() // Or 'firefox' or 'webkit'.

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
          const page = await browser.newPage()
          await page.goto(`${env.NEXT_PUBLIC_APP_URL}/card/gen`)
          await page.getByPlaceholder(GEN_CARD_INPUT_PLACEHOLDER).fill(url)
          await page.getByRole("button", { name: /generate/i }).click()

          await browser.close()
        }
      }
    }
  })
  .start()
